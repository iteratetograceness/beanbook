import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Button from './button';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/router';

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 6fr 1fr 1fr 1fr 1fr;
  margin: 2em 1.5em;
  
  a {
    font-family: Volkhov;
    text-decoration: none;
    color: #ded9d1;
  }

  .logo {
    font-size: 2em;
  }

  .right-nav {
    font-family: Inconsolata;
    justify-self: center;
    align-self: center;
    margin-right: 1em;
  }

  .right-nav:hover {
    text-decoration: underline;
    text-underline-offset: 7px;
    text-decoration-thickness: 3px;
  }

  p.right-nav {
    margin-right: 0;
  }

  p.right-nav:hover {
    text-decoration: none;
  }

  button {
    margin-left: .5rem;
  }
`;

const NavBar: FunctionComponent = () => {
  const { isSignedIn, signOut } = useAuth()
  const router = useRouter();
  console.log(isSignedIn());

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  }

  return (
  <Nav>
    <Link href="/">
      <a className='logo'>beanbook</a>
    </Link>

    <Link href="/">
      <a className='right-nav'>add bean</a>
    </Link>

    <Link href="/">
      <a className='right-nav'>my beans</a>
    </Link>

    <Link href="/" >
      <a className='right-nav'>my profile</a>
    </Link>

    {isSignedIn() && 
    <Button 
      inverse='false'
      variant='primary' 
      onClick={handleSignOut} 
      whileHover={{ scale: 1.1 }}
    >
      <p className='right-nav'>logout</p>
    </Button>}
  </Nav>
)}

export default NavBar;