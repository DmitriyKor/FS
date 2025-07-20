import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

export const LoginStack = styled(Stack)`
`
export const StyledRouterLink = styled(Link)`
  color: black;
  text-decoration: none;
  &:active {
    background-color: blue;
  }
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
`