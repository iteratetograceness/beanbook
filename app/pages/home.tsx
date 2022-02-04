import Layout from "../components/layout";
import HomePage from "../components/homepage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { CoffeeCardType } from '../lib/types/entries';
import { GET_RECENT_ENTRIES } from '../lib/queries';
import { getSession } from 'next-auth/react';
import { initializeApollo } from '../lib/client';
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loading from "../components/loading";

const Home = ({ userid, firstname }: { userid: string | undefined, firstname: string | undefined }) => {

  const router = useRouter();
  
  const { data: session } = useSession()
  // console.log(session)

  const { loading, error, data } = useQuery(GET_RECENT_ENTRIES, {
    variables: { userid }
  });
  
  const recentlyAdded: CoffeeCardType[] = data?.getRecentEntries;

  const [name, setName] = useState('')

  useEffect(() => {
    if (session) setName(session.user.firstname.toLowerCase() || ' there!') 
  }, [session, name, setName])

  if (error) router.push('/404')

  if (loading) return <Loading />;
  else {
    return (
      <Layout>
        <HomePage name={name} entries={recentlyAdded} />
      </Layout>
    )
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {

  const session = await getSession({ req: context.req })

  if (!session) {
    return {
      notFound: true
    }
  }

  const userid = session?.user?.user_id

  return {
    props: {
      userid: session?.user.user_id,
      firstname: session?.user.firstname
    }
  };

}

export default Home