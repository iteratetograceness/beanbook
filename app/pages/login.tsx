import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Head from 'next/head';
import LoginForm from '../components/loginform';
import styled from 'styled-components';

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