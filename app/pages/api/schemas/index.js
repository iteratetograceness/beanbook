import  {  gql  }  from  "apollo-server-micro"; 

export const typeDefs = gql`
  type User {
      id: ID!
      firstname: String!
      lastname: String!
      username: String!
      password: String!
      email: String! 
  }

  type Entry {
    id: ID!
    userid: ID!
    favorited: Boolean!
    origin_name: String!
    price: Float!
    roaster: String!
    producer: String!
    roast_date: String!
    variety: String!
    process: String!
    rating: Int!
    notes: String!
    brew_method: [String]
    taste_tags: [String]
    created_on: String!
  }

  type AuthToken {
    token: String!
  }

  type Validation {
    validation: Boolean!
    message: String
  }

  type Query {
      getUsers: [User]
      getUser(username: String!): User!
      
  }
  
  type Mutation {
    signup(id: ID!, firstname: String!, lastname: String!, username: String!, password: String!, email: String!): Validation
    login(username: String!, password: String!): AuthToken
  }`
;