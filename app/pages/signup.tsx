import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Head from 'next/head';
import SignUpForm from '../components/signupform'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/loading';

const Signup: NextPage = () => {

  const router = useRouter();

  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(!loading)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [loading, router.events])

  if (loading) return <Loading/>

  return (
    <AuthLayout>
      <Head>
        <title>sign up</title>
      </Head>
      <SignUpForm/>
    </AuthLayout>
  )
}

export default Signup;