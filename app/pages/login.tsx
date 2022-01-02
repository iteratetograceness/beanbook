import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Head from 'next/head';
import LoginForm from '../components/loginform';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { useEffect } from 'react';

const FixedAuthLayout = styled(AuthLayout)`
  height: 100vh;
`;

const Login: NextPage = () => {

  const router = useRouter()
  const { status } = useSession()

  if (status === "authenticated") router.push('/home')

  useEffect(() => {
    router.prefetch('/home')
  }, [])

  return (
    <FixedAuthLayout>
      <Head>
        <title>login</title>
      </Head>
      <LoginForm/>
    </FixedAuthLayout>
  )
}

export default Login;