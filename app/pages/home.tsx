import Layout from "../components/layout";
import HomePage from "../components/homepage";
import { GetServerSidePropsContext } from "next";
import { CoffeeCardType } from '../lib/types/entries';
import { GET_RECENT_ENTRIES } from '../lib/queries';
import { getSession } from 'next-auth/react';
import { GQLClient } from "../lib/graphqlClient";

const Home = ({ userid, firstname, recentEntries }: { userid: string | undefined, firstname: string | undefined, recentEntries: CoffeeCardType[] }) => {
  
  return (
    <Layout>
      <HomePage name={firstname || 'there'} entries={recentEntries} />
    </Layout>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  context.res.setHeader(
    'Cache-Control',
    'public, s-maxage=1800, stale-while-revalidate=5'
  )

  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      notFound: true
    }
  }

  const userid = session?.user?.user_id

  const { getRecentEntries } = await GQLClient(GET_RECENT_ENTRIES, { userid: session?.user.user_id })

  return {
    props: {
      userid,
      firstname: session?.user.firstname,
      recentEntries: getRecentEntries
    }
  };

}

export default Home