import type { NextPage } from 'next';
import Layout from '../../components/layout';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colors.darkest};
`;

const Entry: NextPage = () => {
  const router = useRouter()
  const { pid } = router.query

  return (
    <Layout>
      <Head>
        <title>about { pid }</title>
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