import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, ApolloLink, concat } from '@apollo/client';
import { relayStylePagination } from "@apollo/client/utilities";
import merge from 'deepmerge';
import isEqual from 'lodash/isEqual';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createApolloClient() {

  const httpLink = new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_SITE}api/graphql`,
    // uri: 'http://localhost:3000/api/graphql',
  })

  const authMiddleware = new ApolloLink((operation, forward) => {

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        //credentials: 'include'
      }
    }));
  
    return forward(operation);
  })  

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: relayStylePagination(),
          },
        },
      },
    }),
  })
}

export function initializeApollo(initialState: NormalizedCacheObject | null = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    const existingCache = _apolloClient.extract();

    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    _apolloClient.cache.restore(data);
  }

  if (typeof window === 'undefined') return _apolloClient;

  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = useMemo(() => initializeApollo(), []);
  return store;
}