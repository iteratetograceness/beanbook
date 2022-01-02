import { getSession } from "next-auth/react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Layout from "../components/layout";

const MyBeans = ({ entries }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

  return (
    <Layout>
      <h1> MY BEANS PAGE </h1>
    </Layout>
  )
}

export async function getServerSideProps (context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req })
  const userid = session?.user?.user_id

  // TODO: Get User Entries from DB

  return {
    props: {
      entries: "entries"
    }
  };
}

export default MyBeans
