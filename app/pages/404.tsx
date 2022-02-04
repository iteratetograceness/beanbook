import React from 'react'
import styled from 'styled-components'
import { AlertFilled } from '@ant-design/icons';
import Button from '../components/button';
import { useSession } from 'next-auth/react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;

  h1 {
    color: ${props => props.theme.colors.light};
    height:
  }
`;

function Custom404() {
  const session = useSession();

  return (
    <Container>
      <AlertFilled style={{ fontSize: '50px', color: '#9c483a' }}/>
      <h1>404 - Page Not Found</h1>
      <Button inverse='true' variant='secondary' onClick={() => {
        if (session.status === 'authenticated') window.location.href = '/home'
        else window.location.href = '/login';
      }}>go back</Button>
    </Container>
  )
}

export default Custom404
