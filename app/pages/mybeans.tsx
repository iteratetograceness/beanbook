import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Layout from "../components/layout";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from "styled-components";
import Grid from "../components/grid";
import SearchBar from "../components/search";
import { GET_ENTRIES } from "../lib/queries";
import { useQuery } from "@apollo/client";
import { initializeApollo } from "../lib/client";
import { useRouter } from "next/router";
import Loading from "../components/loading";
import { useState, useEffect } from "react";
import { CoffeeCardType } from "../lib/types/entries";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 4rem);
  margin: 0 2rem;
`;

const Panel = styled.div`
  background-color: ${props => props.theme.colors.light};
  width: calc(100vw - 8rem);
  padding: 2rem;
  border-radius: 0 1rem 1rem 1rem;
`;

const MyBeans = ({ user_id }: { user_id: any }) => {

  const router = useRouter();

  const { loading, error, data } = useQuery(GET_ENTRIES, {
    variables: { userid: user_id },
  });
  
  const [ entries, setEntries ] = useState<CoffeeCardType[]>([]);

  useEffect(() => {
    if(loading === false && data){
      const unorderedEntries: CoffeeCardType[] = [...data.getEntries];
      const sortedEntries: CoffeeCardType[] = unorderedEntries.sort((a: CoffeeCardType, b: CoffeeCardType) => Number(b.created_on) - Number(a.created_on));
      setEntries(sortedEntries);
    }
  }, [loading, data])

  if (error) router.push('/404')

  if (loading) return <Loading />;
  else {
    return (
    <Layout>
      <Container>
        <SearchBar/>
        <Tabs>
          <TabList>
            <Tab>all entries</Tab>
            <Tab>my favorites</Tab>
          </TabList>

          <TabPanel>
            <Panel>
              <Grid type='all' entries={entries} />
            </Panel>
          </TabPanel>
          <TabPanel>
            <Panel>
              <Grid type='fav' entries={entries} />
            </Panel>
          </TabPanel>
        </Tabs>
      </Container>
      
    </Layout>
    )
  }
  
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req })
  const userid = session?.user?.user_id
  const variables = { userid }

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_ENTRIES,
    variables
  })
    .catch(err => {
      return {
        notFound: true,
      }
    })

  return {
    props: {
      user_id: session?.user.user_id,
    }
  };
}

export default MyBeans
