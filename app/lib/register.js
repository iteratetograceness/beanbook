import {
  ApolloClient,
  HttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
import { v1 as uuid } from 'uuid';

export default async function registerUser(data) {
  const client = new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:3000/api/graphql'
    }),
    cache: new InMemoryCache()
  });

  const mutation = gql`
    mutation signup($id: ID!, $firstName: String!, $lastName: String!, $username: String!, $password: String!, $email: String!, $avatar_url: String) {
      signup(id: $id, firstName: $firstName, lastName: $lastName, username: $username, password: $password, email: $email, avatar_url: $avatar_url) 
    }
  `;

  const result = await client.mutate({
    mutation,
    variables: { ...data, id: uuid().toString() }
  });

  return result;
}