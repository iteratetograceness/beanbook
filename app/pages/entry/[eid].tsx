import Layout from '../../components/layout';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { initializeApollo, addApolloState } from '../../lib/client';
import { gql, useQuery } from "@apollo/client";

const Container = styled.div`
  background-color: ${props => props.theme.colors.darkest};
`;

const token = Cookies.get('token')
const GET_ENTRY = gql`
  query GetEntry($id: ID!) {
    getEntry(id: $id) {
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

const Entry = ({ entry }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/login')
    }
  })

  // const { loading, error, data } = useQuery(GET_ENTRY, {
  //   variables: {
  //     id: router.query.id
  //   }
  // });

  console.log(entry)

  return (
    <Layout>
      <Head>
        <title>{ router.query.id }</title>
      </Head>
      <Container>
        <h1>{ router.query.id }</h1>
        <Link href="/">
            <a>Back to home</a>
        </Link>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  const apolloClient = initializeApollo()
  const { id } = context.query
  const variables = { id }

  const res = await apolloClient.query({
    query: GET_ENTRY,
    variables
  });

  return addApolloState(apolloClient, {
    props: {
      entry: res.data.getEntry
    },
  });
}

export default Entry;