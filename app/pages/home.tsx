import Layout from "../components/layout";
import HomePage from "../components/homepage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Home = () => {
  const { data: session } = useSession()

  const [name, setName] = useState('')

  useEffect(() => {
    if (session) setName(session.user.firstname || ' there!') 
  }, [name, setName])

  return (
    <Layout>
      <HomePage name={name} />
    </Layout>
  )
}

export default Home