import { GraphQLClient } from 'graphql-request'

export const useGQLClient = async (query: any, variables: {[key:string]:any}) => { 

  const client = new GraphQLClient('/api/graphql')
  const headers = {

  }

  const data = await client.request(query, variables, headers)
  return data

}

const requestHeaders = {
  authorization: 'Bearer MY_TOKEN'
}

