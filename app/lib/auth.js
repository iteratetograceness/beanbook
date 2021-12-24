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
  const [userName, setUserName] = useState('');

  const isSignedIn = () => {
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

    if (result?.data?.login?.token) {
      setAuthToken(result.data.login.token);
      setUserName(username);
    }
  }

  const signOut = () => {
    setAuthToken('unverified')
  }

  const getUserName = async () => {
    const client = createApolloClient()
    const query = gql`
      query getUser($username: String!) {
        getUser(username: $username) {
          firstname
        }
      }
    `;

    const result = await client.query({
      query,
      variables: { username: userName },
    })

    console.log('Inside getUser:', result)

    if (result?.data?.getUser?.firstname) {
      return result.data.getUser.firstname
    }
  }

  return {
    isSignedIn,
    signIn,
    signOut,
    createApolloClient,
    getUserName
  }
}