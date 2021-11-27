import type { AppProps } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { beanTheme } from '../styles/theme';
import '../styles/global.css'
import { motion } from 'framer-motion';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.medium};
  }
`

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
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
  );
}

export default MyApp
