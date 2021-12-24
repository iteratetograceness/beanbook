import styled from "styled-components";
import { FunctionComponent } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { loginSchema } from "../lib/yupSchemas";
import { useAuth } from '../lib/auth'
import Button from './button';
import Link from 'next/link';

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
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const { signIn } = useAuth()

  const handleLogin = async (data: any) => {
    await signIn(data);
    router.push('/home');
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