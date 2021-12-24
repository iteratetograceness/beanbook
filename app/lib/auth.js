import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <AuthContext.Provider value={auth}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

function useProvideAuth() {
  const [authToken, setAuthToken] = useState('unverified');

  const isSignedIn = () => {
    console.log('Inside isSignedIn: ', authToken)
    if (authToken !== 'unverified') {
      return true
    } else {
      return false
    }
  }

  const getAuthHeaders = () => {
    if (authToken === 'unverified') return null

    return {
      authorization: `Bearer ${authToken}`,
    }
  }

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'http://localhost:3000/api/graphql',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }

  const signIn = async ({ username, password }) => {
    const client = createApolloClient()
    const LoginMutation = gql`
      mutation signin($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `;

    const result = await client.mutate({
      mutation: LoginMutation,
      variables: { username, password },
    })

    console.log('Inside signIn:', result)

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
    }
  }

  const signOut = () => {
    setAuthToken('unverified')
  }

  return {
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
  }
}