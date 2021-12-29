import { useAuth } from "../lib/auth";
import Layout from "../components/layout";
import AuthLayout from "../components/authLayout";
import Link from "next/link";
import Button from "../components/button";
import HomePage from "../components/homepage";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'

const Home = () => {

  const [name, setName] = useState('')

  useEffect(() => {
    const auth_token = Cookies.get('token');
    const decoded: any = jwt.decode(auth_token as any);
    setName(decoded.firstname)
  }, [name, setName])

  if (name) {
    return (
      <Layout>
        <HomePage name={name} />
      </Layout>
    )
  } else {
    return (
      <AuthLayout>
        <p>{"um...you aren't not logged in"}</p>
        <Link href='/login' passHref>
          <Button 
            inverse='false' 
            variant='secondary'
            whileHover={{ scale: 1.1 }}
          >go back</Button>
        </Link>
      </AuthLayout>
    )
  }
}

export default Home