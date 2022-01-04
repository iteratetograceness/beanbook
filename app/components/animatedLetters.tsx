// Taken from https://www.notion.so/Animate-Banner-Letters-Header-de1ee79fe874493481cc70739a2491a6

import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Link from 'next/link'; 
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import Loading from "./loading";

const Letter = styled(motion.span)`
  font-size: 5rem;
  color: #ded9d1;
  font-family: Volkhov;

  @media (max-width: 500px) {
    font-size: 3.4rem;
  }
`;

const Button = styled(motion.button)`
  font-size: 1rem;
  font-family: Inconsolata;
  background-color: #433f3c;
  color: #ded9d1;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
`;

const Container = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const containerAni = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const letterAni = {
  hidden: { 
    opacity: 0,
    y: 100 
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
    },
  },
};

const buttonAni = {
  hidden: { 
    opacity: 0,
    y: 800 
  },
  show: {
    opacity: 1,
    y: 80,
    transition: {
      delay: 1.2,
      ease: [0.6, 0.01, -0.05, 0.95],
      duration: 1,
      type: "spring",
      stiffness: 50
    },
  }
};

type AnimatedLettersProps = {
  title: Array<string>;
}

const AnimatedLetters = ({ title }: AnimatedLettersProps) => {

  const titleArr = title;

  const router = useRouter();
  const { status } = useSession()
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(!loading)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  useEffect(() => {
    router.prefetch('/home')
  }, [router])

  if (loading) return <Loading/>

  else return (
    <>
      <Container
        variants={containerAni}
        initial="hidden"
        animate="show"
      >
        {
          titleArr.map((letter, i) => (
            <Letter key={i} variants={letterAni}>
              {letter}
            </Letter>
          ))
        }
      </Container>
      <Container
        variants={containerAni}
        initial="hidden"
        animate="show"
      > 
        <Link href={status === "authenticated" ? '/home' : '/login'} passHref>
          <Button 
            key='b1' 
            whileHover={
              {
                backgroundColor: '#ded9d1',
                color: '#433f3c',
                transition: { duration: .5 },
              }
            }
            variants={buttonAni}
          >enter</Button>
        </Link>
      </Container>
    </>
  )

};

export default AnimatedLetters;