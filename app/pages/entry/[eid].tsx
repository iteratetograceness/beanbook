import Head from 'next/head';
import { useRouter } from 'next/router'
import { GetServerSidePropsContext, NextApiRequest } from 'next'
import styled from 'styled-components';
import Loading from '../../components/loading';
import Layout from '../../components/layout';
import { initializeApollo, addApolloState } from '../../lib/client';
import { useQuery } from "@apollo/client";
import { GET_ENTRY } from '../../lib/queries';
import { DefaultEntry } from '../../lib/reducers/entryReducer';

const Container = styled.div`
  background-color: ${props => props.theme.colors.darkest};
`;

const Entry = () => {

  const router = useRouter()

  const { loading, error, data } = useQuery(GET_ENTRY, {
    variables: {
      id: router.query.id
    }
  });

  // TODO: Custom error modal/toast
  if (error) router.push('/404')

  const entry = data?.getEntry || DefaultEntry;

  if (loading) return <Loading />;
  else {
    return (
    <Layout>
      <Head>
        <title></title>
      </Head>
      <Container>
        <h1>{ entry.origin_name }</h1>
      </Container>
    </Layout>
  )
  }
  
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {

  const apolloClient = initializeApollo()
  const { id } = context.query
  const variables = { id }

  await apolloClient.query({
    query: GET_ENTRY,
    variables
  })
    .catch(err => {
      return {
        notFound: true,
      }
    })

  return addApolloState(apolloClient, {
    props: {}
  });
}

export default Entry;