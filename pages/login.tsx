import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Head from 'next/head';
import LoginForm from '../components/loginform';

const Login: NextPage = () => {
  return (
    <AuthLayout>
      <Head>
        <title>login</title>
      </Head>
      <LoginForm/>
    </AuthLayout>
  )
}

export default Login;