import { NavLink } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    :root {
        font-family: Roboto, sans-serif;
        line-height: 1.5;
        font-weight: 400;
    }  

    *, *::before, *::after {
        box-sizing: border-box;
    }
    
    body {
        margin: 0;
        padding: 0;
    }

    p {
        padding: 0;
        margin: 0;
    }
`;

export const LoginLayout = styled.div`
    display: flex;
`
export const LoginFormStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;   
    width : 100%;
    box-sizing: border-box;
    background-color: ${props => props.theme.backgroundColor}
`
export const LoginFormElementsStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    min-width: 400px;
`

export const StyledRouterNavLink = styled(NavLink)`
    color: black;
    text-decoration: none;
`
export const PageLayout = styled.div`
    width: 100%;
    min-height: 100vh;   
    box-sizing: border-box;
    background-color: ${props => props.theme.backgroundColor}
`
export const PageInternalLayout = styled.div`
    display: flex;
    width: 100%;
    min-height: calc(100vh - 48px); 
`
export const PageMainArea = styled.div`
    width: 100%;
    min-height: 100%;
    color: black;
    padding: 10px;
`