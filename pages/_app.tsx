import type { AppProps } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { beanTheme } from '../styles/theme';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.colors.medium};
  }
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={beanTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp
