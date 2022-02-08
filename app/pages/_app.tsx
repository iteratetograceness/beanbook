import type { AppProps } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { beanTheme } from '../styles/theme';
import '../styles/global.css'
import { motion } from 'framer-motion';
import { SessionProvider } from "next-auth/react"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.medium};
  }
`

function MyApp({ Component, pageProps: { session, ...pageProps }, router }: AppProps) {

  
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
        <ThemeProvider theme={beanTheme}>
          <GlobalStyle />
          <motion.div
            key={router.route}
            initial="initial"
            animate="animate"
            variants={{
              initial: {
                opacity: .8,
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
    </SessionProvider>
  );
}

export default MyApp
