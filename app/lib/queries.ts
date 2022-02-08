import { gql } from 'graphql-request'

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user_id
    firstname
    authorized
    message 
  }
}`;

export const SIGNUP = gql`
  mutation SignUp($user_id: ID!, $firstname: String!, $lastname: String!, $username: String!, $password: String!, $email: String!) {
    signup(id: $user_id, firstname: $firstname, lastname: $lastname, username: $username, password: $password, email: $email) {
      validation
      message
    }
  }
`;

export const ADD_ENTRY = gql`
mutation Mutation($entry: EntryInput) {
  addEntry(entry: $entry) {
    id
    validation
    message
  }
}
`;

export const GET_ENTRY = gql`
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
      id
      origin_name
      favorited
      price
      roaster
      producer
      roast_date
      variety
      process
      rating
      notes
      brew_method
      taste_tags
      created_on
    }
  }
`

export const GET_ENTRIES = gql`
  query GetEntries($userid: ID!) {
    getEntries(userid: $userid) {
      origin_name
      favorited
      rating
      created_on
      id
    }
  }
`

export const UPDATE_ENTRY = gql`
  mutation UpdateEntry($entry: UpdateEntryInput) {
    updateEntry(entry: $entry) {
      validation
      message
    }
  }
`;

export const GET_SEARCH = gql`
  query GetSearch($userid: ID!, $query: String!, $filters: [String]) {
    getSearch(userid: $userid, query: $query, filters: $filters) {
      origin_name
      favorited
      rating
      created_on
      id
    }
  }
`;

export const GET_RECENT_ENTRIES = gql`
  query GetRecentEntries($userid: ID!) {
    getRecentEntries(userid: $userid) {
      origin_name
      favorited
      rating
      created_on
      id
    }
  }
`;

export const DELETE_ENTRY = gql`
  mutation DeleteEntry($entryID: ID!) {
    deleteEntry(entryID: $entryID) {
      validation
    }
  }
`;