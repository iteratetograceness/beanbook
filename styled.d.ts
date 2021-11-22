// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      darkest: string;
      darkish: string;
      dark: string;
      medium: string;
      light: string;
    };
  }
}