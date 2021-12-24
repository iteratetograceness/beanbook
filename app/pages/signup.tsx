import type { NextPage } from 'next';
import AuthLayout from './../components/authLayout';
import Button from '../components/button';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import { useState } from 'react';
import SignUpForm from '../components/signupform';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

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
  return (
    <AuthLayout>
      <Head>
        <title>login</title>
      </Head>
      <SignUpForm/>
    </AuthLayout>
  )
}

export default Signup;