import React, { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from './navbar';
import Footer from './footer';
import styled from 'styled-components';
import Error from "../pages/_error";
import { useSession } from "next-auth/react";

const Container = styled.div`
    display flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100%;
    max-width: 100%;
    min-height: 100vh;
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'beanbook' }: Props) => {
    const { status } = useSession()

    if (status == "authenticated") {
        return (
        <Container>
            <Head>
                <title>{title}</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <header>
            <NavBar />
            </header>
            <Main>
                {children}
            </Main>
            <Footer/>
        </Container>
        ) 
    } else {
        return (
            <Error />
        )
    }
}


export default Layout