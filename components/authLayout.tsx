import React, { ReactNode } from 'react';
import Head from 'next/head';
import styled from 'styled-components';

type Props = {
    children?: ReactNode
    title?: string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  margin: 5rem 0;
  height: auto;
  width: 100vw;
  color: #ded9d1;
  font-size: 2rem;

  @media (max-width: 360px) {
    font-size: 1.6rem;
  }

  h1 {
    margin: 1rem 0;
    font-family: Volkhov;
    font-weight: 400;
  }
`;

const AuthLayout = ({ children, title = 'beanbook' }: Props) => (
    <Container>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
         <h1>beanbook</h1>
        </header>
        {children}
    </Container>
)

export default AuthLayout