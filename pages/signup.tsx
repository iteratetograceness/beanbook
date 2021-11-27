import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Button from '../components/button';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import { useState } from 'react';

const FormContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  width: 100vw;
  height: 100vh;

`;

const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  width: 70vw;
  

  input {
    height: 3rem;
    border-radius: 1rem;
    border: none;
    margin-bottom: 1rem;
    min-width: 250px;
    font-size: 1.2rem;
    padding: 0 1rem;
    color: grey;
  }

  input:focus {
    outline: none;
  }

  a {
    background-color: #f5f5f5;
  }

  .button-container {
    display: flex;
    width: 250px;
    justify-content: space-between;
    margin: 1rem 0;
  }
`;

const Label = styled.label`
  font-size: 1.5rem;
  font-family: Inconsolata;
  margin-bottom: 1rem;
`;

const Signup: NextPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthLayout>
      <Head>
        <title>login</title>
      </Head>
      <FormContainer>
        <Container>
          <Label>first name</Label>
          <input />
          <Label>last name</Label>
          <input />
          <Label>email</Label>
          <input />
          <Label>username</Label>
          <input />
        </Container>
        <Container>
          <Label>password</Label>
          <input type='password' />
          <Label>confirm password</Label>
          <input type='password' />
          <div className='button-container'>
            {/* login button */}
            {/* <Button 
              variant='primary' 
              inverse={false}
              whileHover={{ scale: 1.1 }}
            >register</Button>
            <Link href="/login" passHref>
                <Button 
                  variant='secondary' 
                  inverse={false}
                  whileHover={{ scale: 1.1 }}
                >go back</Button>
            </Link> */}
          </div>
        </Container>
      </FormContainer>
    </AuthLayout>
  )
}

export default Signup;