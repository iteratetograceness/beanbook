import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Head from 'next/head';
import LoginForm from '../components/loginform';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import Loading from '../components/loading';

const FixedAuthLayout = styled(AuthLayout)`
  height: 100vh;
`;

const Login: NextPage = () => {

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