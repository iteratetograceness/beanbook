import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import SignUpForm from '../components/signupform';

const Signup: NextPage = () => {

  const router = useRouter()

  useEffect(() => {
    if (Cookies.get('token')) {
      router.push('/home')
    }
  })

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