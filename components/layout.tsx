import React, { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from '../components/navbar';

type Props = {
    children?: ReactNode
    title?: string
}

const Layout = ({ children, title = 'beanbook' }: Props) => (
    <div>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
         <NavBar />
         <h1>hey</h1>
        </header>
        {children}
        <footer>
            <hr />
            {/* <span>footer</span> */}
        </footer>
    </div>
)

export default Layout