import 'styled-components/native';


declare module 'styled-components/native' {
  export interface DefaultTheme {
    borderRadius: string;
    flex: number;
    padding: string;
    padding-top: string;
    background-color: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
};