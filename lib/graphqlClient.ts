import { GraphQLClient } from 'graphql-request'

export const GQLClient = async (query: any, variables?: {[key:string]:any}) => { 

  const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_SITE}api/graphql`)


  const headers = {

  }

  const data = await client.request(query, variables, headers)
  return data

}

const requestHeaders = {
  authorization: 'Bearer MY_TOKEN'
}

