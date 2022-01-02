import type { AppProps } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { beanTheme } from '../styles/theme';
import '../styles/global.css'
import { motion } from 'framer-motion';
import { SessionProvider } from "next-auth/react"
import { ApolloProvider } from "@apollo/client";
import { useApollo } from '../lib/client';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.medium};
  }
`

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {

  const apolloClient = useApollo(pageProps);
  
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={beanTheme}>
          <GlobalStyle />
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: 0,
              },
              animate: {
                opacity: 1,
              },
            }}
            transition={{ duration: .7 }}
          > 
            <Component {...pageProps} isVisible/>  
          </motion.div>
        </ThemeProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default MyApp
