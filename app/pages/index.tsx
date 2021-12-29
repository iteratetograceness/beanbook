import type { NextPage } from 'next';
import Head from 'next/head';
import AnimatedLetters from '../components/animatedLetters';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Main: NextPage = () => {

  return (
    <div>
      <Head>
        <title>beanbook</title>
        <meta name="description" content="your favorite coffee app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <AnimatedLetters title='beanbook'/>
      </Container>
    </div>
  )
}

export default Main;
