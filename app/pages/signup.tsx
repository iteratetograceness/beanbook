import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Head from 'next/head';
import SignUpForm from '../components/signupform'

const Signup: NextPage = () => {

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