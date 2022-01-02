import React from 'react'
import Grid from '../components/grid'
import { useQuery } from '@apollo/client';
import { GET_SEARCH } from "../lib/queries";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from '../components/loading';
import Layout from '../components/layout';
import Title from '../components/title';
import { SearchOutlined } from '@ant-design/icons';
import styled from 'styled-components';

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

function SearchResults() {

  const router = useRouter();
  const { query } = router;
  const { data: session } = useSession()

  const variables = {
    userid: session?.user.user_id,
    query: query.query,
    filters: query.filter,
  }
  
  const { loading, error, data } = useQuery(GET_SEARCH, {
    variables
  });
  
  if (error) router.push('/404')

  if (loading) return <Loading/>
  else {
    return (
      <Layout>
        <Container>
          <TitleContainer>
            <Title name='search results' icon={<SearchOutlined style={{ marginRight: '4px' }}/>}/>
          </TitleContainer>
          <GridContainer>
            <Grid type='all' entries={data.getSearch}/>
          </GridContainer>
        </Container>
      </Layout>
    )
  }
}

export default SearchResults