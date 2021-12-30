import { useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client';
import { v1 as uuid } from 'uuid';
import Cookies from 'js-cookie'

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

  const isSignedIn = () => {
    // if (typeof window !== 'undefined') {

    //   const item = localStorage.getItem('auth_token')
    //   if (item) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }

    const token = Cookies.get('token')
    if (token) return true
    else return false
  }

  const getAuthHeaders = () => {
    const token = Cookies.get('token')
    return {
      authorization: `Bearer ${token}`
    }
  }

  const createApolloClient = () => {

    const link = new HttpLink({
      uri: '/api/graphql',
      credentials: 'include',
      headers: getAuthHeaders(),
    })

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    })
  }

  const signIn = async ({ username, password }) => {
    
    const client = createApolloClient()
    const mutation = gql`
      mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token 
        }
      }
    `;

    const result = await client.mutate({
      mutation,
      variables: { username, password },
    })

    if (result?.data?.login?.token !== 'invalid') {
      const token = result.data.login.token
      Cookies.set('token', token, { expires: 7 })
    } else {
      return { error: 'Invalid username/password' }
    }
  }

  const signOut = () => {
    Cookies.remove('token')
  }

  const signUp = async (data) => {

    const client = createApolloClient()
    const mutation = gql`
    mutation Mutation($signupId: ID!, $firstname: String!, $lastname: String!, $username: String!, $password: String!, $email: String!) {
      signup(id: $signupId, firstname: $firstname, lastname: $lastname, username: $username, password: $password, email: $email) {
        validation
        message
      }
    }
    `;

    const result = await client.mutate({
      mutation,
      variables: { ...data, signupId: uuid().toString() },
    })

    if (result?.data?.signup?.validation) {
      return 'success'
    } else {
      return result.data.signup.message
    }

  }

  return {
    isSignedIn,
    signIn,
    signOut,
    getAuthHeaders,
    createApolloClient,
    signUp
  }
}