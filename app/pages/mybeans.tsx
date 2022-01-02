import { getSession, useSession } from "next-auth/react";
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 4rem);
  margin: 0 2rem;
`;

const Panel = styled.div`
  background-color: ${props => props.theme.colors.light};
  width: 100%;
  padding: 2rem;
  border-radius: 0 1rem 1rem 1rem;
`;

const MyBeans = ({ session }: { session: any }) => {

  const router = useRouter();
  
  console.log('component', session)

  const { loading, error, data } = useQuery(GET_ENTRIES, {
    variables: {
      userid: session?.user.user_id
    }
  });

  //console.log(data)

  //if (error) router.push('/404')

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
              <h1>all entries</h1>
              <Grid type='all'/>
            </Panel>
          </TabPanel>
          <TabPanel>
            <Panel>
              <h1>fav entries</h1>
              <Grid type='fav'/>
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
  console.log('server', session)
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
