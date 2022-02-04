import styled from "styled-components";
import { FunctionComponent, useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from "../lib/yupSchemas";
import { signIn } from "next-auth/react"
import Button from './button';
import Link from 'next/link';
import { LoginResponseObject } from "../lib/types/next-auth";

const schema = loginSchema;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  
  p {
    font-size: .8rem;
    color: black;
    margin-top: 0;
    margin-bottom: .6rem;
    font-family: 'Inconsolata', monospace;
  }

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

const LoginForm: FunctionComponent = () => {

  const [ loading, setLoading ] = useState<boolean>(false)

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  
  const handleLogin = async (data: any) => {
    setLoading(true)
    const res: LoginResponseObject | undefined = await signIn('credentials', { redirect: false, password: data.password, username: data.username })
    
    if (res) {
      if (res['ok']) router.push('/home')
      else alert(res['error'] || 'Login failed. Please try again.')
    } 
  };

  return (
    <Container onSubmit={handleSubmit(handleLogin)}> 
      <Label>username</Label>
      <input 
        type='text'
        {...register('username')}
      />
      <p>{ errors.username?.message }</p>
      <Label>password</Label>
      <input 
        type='password' 
        {...register('password')}
      />
      <p>{ errors.password?.message }</p>
      <p>{ loading ? 'Loading...' : '' }</p>
      <div className='button-container'>
        {/* login button */}
        <Button 
          variant='primary' 
          inverse='false'
          whileHover={{ scale: 1.1 }}
          type='submit'
        >login</Button>
        <Link href="/signup" passHref>
            <Button 
              variant='secondary' 
              inverse='false'
              whileHover={{ scale: 1.1 }}
            >signup</Button>
        </Link>
      </div>
    </Container>
  )
}

export default LoginForm;