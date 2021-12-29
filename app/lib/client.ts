import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import merge from 'deepmerge'
import { onError } from '@apollo/link-error'
import { IncomingHttpHeaders } from 'http'
import isEqual from 'lodash/isEqual'
import fetch from 'isomorphic-unfetch'
import { createUploadLink } from 'apollo-upload-client'
import type { AppProps } from 'next/app'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {

  const enhancedFetch = async (url: RequestInfo, init: RequestInit) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        'Access-Control-Allow-Origin': '*',
        Cookie: headers?.cookie ?? '',
      },
    }).then((response) => response)
  }

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
          graphQLErrors.forEach(({ message, locations, path }) =>
            console.log(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
          )
        if (networkError)
          console.log(
            `[Network error]: ${networkError}. Backend is unreachable.`
          )
      }),
      createUploadLink({
        uri: '/api/graphql',
        fetchOptions: {
          mode: 'cors',
        },
        credentials: 'include',
        fetch: enhancedFetch,
      }),
    ]),
    cache: new InMemoryCache(),
  })
}

type InitialState = NormalizedCacheObject | undefined

interface IInitializeApollo {
  headers?: IncomingHttpHeaders | null
  initialState?: InitialState | null
}

export const initializeApollo = (
  { headers, initialState }: IInitializeApollo = {
    headers: null,
    initialState: null,
  }
) => {
  const _apolloClient = apolloClient ?? createApolloClient(headers)

  if (initialState) {
    const existingCache = _apolloClient.extract()

    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    _apolloClient.cache.restore(data)
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export const addApolloState = (
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: AppProps['pageProps']
) => {
  if (pageProps?.props) {
    pageProps.props['__APOLLO_STATE__'] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps['__APOLLO_STATE__']
  const store = useMemo(() => initializeApollo({ initialState: state }), [
    state,
  ])
  return store
}