import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";
import Layout from "../components/layout";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from "styled-components";
import Grid from "../components/grid";
import SearchBar from "../components/search";
import { GET_ENTRIES } from "../lib/queries";
import { CoffeeCardType } from "../lib/types/entries";
import { GQLClient } from "../lib/graphqlClient";

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

const MyBeans = ({ user_id, entries }: { user_id: any, entries: CoffeeCardType[] }) => {

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

export async function getServerSideProps (context: GetServerSidePropsContext) {

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=5'
  )

  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      notFound: true,
    }
  }

  const userid = session?.user?.user_id

  const { getEntries } = await GQLClient(GET_ENTRIES, { userid })

  return {
    props: {
      user_id: session?.user.user_id,
      entries: getEntries
    }
  };
}

export default MyBeans
