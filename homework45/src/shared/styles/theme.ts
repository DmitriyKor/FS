//import type { ThemedBaseStyledInterface } from '@mui/styled-engine-sc';
//import baseStyled from 'styled-components';

interface ICustomTheme {
  backgroundColor: string;
  gap: string;
  sideBar: {
    selectedLinkColor: string;
  },
  panel: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    borderRadius: string;
    padding: string;
  },
}

export const mainTheme : ICustomTheme = {
  backgroundColor: '#FFFFFF',
  gap: '10px',
  sideBar: {
    selectedLinkColor: '#c4c3c2AA',
  },
  panel: {
    backgroundColor: '#f8f9f9',
    borderColor: 'lightgray',
    textColor: '#521C0D',
    borderRadius: '8px',
    padding: '10px',
  },
};


declare module 'styled-components' {
  export interface DefaultTheme extends ICustomTheme {}
}

export type Theme = ICustomTheme;
//export const styled = baseStyled as ThemedBaseStyledInterface<Theme>;
