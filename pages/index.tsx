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
  width: 100vw;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${props => props.theme.colors.light};
`;

const Main: NextPage = () => {

  return (
    <div>
      <Head>
        <title>beanbook</title>
      </Head>

      <Container>
        {/* <Title>#maintenance</Title>
        <h3>beanbook will be back soooon</h3> */}
        <AnimatedLetters title={['b', 'e', 'a', 'n', 'b', 'o', 'o', 'k']}/>
      </Container>
    </div>
  )
}

export default Main;
