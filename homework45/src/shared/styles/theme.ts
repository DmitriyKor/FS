//import baseStyled from 'styled-components';

export const mainTheme = {
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

export type Theme = typeof mainTheme;
//export const styled = baseStyled as ThemedStyledInterface<Theme>;
