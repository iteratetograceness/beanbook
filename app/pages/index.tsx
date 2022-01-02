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
      </Head>

      <Container>
        <AnimatedLetters title={['b', 'e', 'a', 'n', 'b', 'o', 'o', 'k']}/>
      </Container>
    </div>
  )
}

export default Main;
