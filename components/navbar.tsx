import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Nav = styled.nav`
  display: grid;
  grid-template-columns: 6fr 1fr 1fr 1fr;
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
    justify-self: end;
    align-self: center;
  }

  .right-nav:hover {
    text-decoration: underline;
    text-underline-offset: 7px;
    text-decoration-thickness: 3px;
  }
`;

const NavBar: FunctionComponent = () => (
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
  </Nav>
)

export default NavBar;