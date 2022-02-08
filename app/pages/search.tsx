import React from 'react'
import Grid from '../components/grid'
import { GQLClient } from '../lib/graphqlClient';
import { GET_SEARCH } from "../lib/queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from '../components/loading';
import Layout from '../components/layout';
import Title from '../components/title';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 4rem);
  margin: 0 -2rem;
`;

const TitleContainer = styled.div`
  display: flex;
  margin-left: 2rem;
`;

const GridContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SearchResults({ results }: { results: any }) {

  return (
    <Layout>
      <Container>
        <TitleContainer>
          <Title name='search results' icon={<SearchOutlined style={{ marginRight: '4px' }}/>}/>
        </TitleContainer>
        <GridContainer>
        { !results.length 
          ? <p> No results found.</p> 
          : <Grid type='all' entries={results}/> }
        </GridContainer>
      </Container>
    </Layout>
  )
}

export default SearchResults

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  console.log(ctx.query)

  const session = await getSession({ req: ctx.req })

  if (!session) {
    return {
      notFound: true
    }
  }

  const userid = session?.user?.user_id

  const variables = {
    userid,
    query: ctx.query.query,
    filters: ctx.query.filter,
  }

  const { getSearch } = await GQLClient(GET_SEARCH, variables);

  return {
    props: {
      results: getSearch
    }
  }
}