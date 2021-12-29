import type { NextPage } from 'next';
import Layout from '../components/layout';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'
import styled from 'styled-components';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

const Container = styled.div`
  background-color: ${props => props.theme.colors.darkest};
`;

const Entry: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get('token')) {
      router.push('/login')
    }
  })

  return (
    <Layout>
      <Head>
        <title>about</title>
      </Head>
      <Container>
        <h1>user-submitted coffee tasting details</h1>
        <Link href="/">
            <a>Back to home</a>
        </Link>
      </Container>
    </Layout>
  )

  return (
    <Layout>
      <Head>
        <title>about</title>
      </Head>
      <Container>
        <h1>user-submitted coffee tasting details</h1>
        <Link href="/">
            <a>Back to home</a>
        </Link>
      </Container>
    </Layout>
  )
}

export default Entry;