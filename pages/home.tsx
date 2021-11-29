import { useAuth } from "../lib/auth";
import Layout from "../components/layout";
import AuthLayout from "../components/authLayout";
import Link from "next/link";
import Button from "../components/button";

const Home = () => {
  const { isSignedIn } = useAuth();

  return (
    <>
      {!isSignedIn() && 
      <AuthLayout>
        <p>um...you're not logged in</p>
        <Link href='/login' passHref>
          <Button 
            inverse='false' 
            variant='secondary'
            whileHover={{ scale: 1.1 }}
          >go back</Button>
        </Link>
      </AuthLayout>
      }
      {isSignedIn() && 
      <Layout>
        <h1>Welcome to the home page</h1>
      </Layout>
      }
    </>
  )
}

export default Home