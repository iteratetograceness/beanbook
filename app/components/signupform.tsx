import styled from "styled-components";
import { FunctionComponent, useState } from "react";
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { signUp } from "../lib/auth-helpers"
import { registerSchema } from "../lib/yupSchemas";
import Button from './button';
import Link from 'next/link';

const schema = registerSchema;

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

const SignUpForm: FunctionComponent = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const handleRegister = async (data: any) => {
    setLoading(true);
    data = {
      ...data,
      username: data.username.toLowerCase()
    }
    const res = await signUp(data);
    if (res === 'success') {
      router.push('/login');
    } else {
      // TODO: replace with custom popup modal
      alert(res.message);
    }
  };

  return (
    <Container onSubmit={handleSubmit(handleRegister)}> 
      <Label>first name</Label>
      <input 
        type='text'
        {...register('firstname')}
      />
      <p>{ errors.firstname?.message }</p>
      <Label>last name</Label>
      <input 
        type='text' 
        {...register('lastname')}
      />
      <p>{ errors.lastname?.message }</p>
      <Label>email</Label>
      <input 
        type='text' 
        {...register('email')}
      />
      <p>{ errors.email?.message }</p>
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
      <Label>confirm password</Label>
      <input 
        type='password' 
        {...register('confirmPassword')}
      />
      <p>{ errors.confirmPassword?.message }</p>
      <p>{ loading ? 'Loading...' : '' }</p>
      <div className='button-container'>
        {/* login button */}
        <Button 
          variant='primary' 
          inverse='false'
          whileHover={{ scale: 1.1 }}
          type='submit'
        >register</Button>
        <Link href="/login" passHref>
            <Button 
              variant='secondary' 
              inverse='false'
              whileHover={{ scale: 1.1 }}
            >go back</Button>
        </Link>
      </div>
    </Container>
  )
}

export default SignUpForm;