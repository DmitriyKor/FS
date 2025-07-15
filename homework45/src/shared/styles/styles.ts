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
  text-decoration: none;
  &:focus, &:visited, &:link, &:active {
    text-decoration: none;
  }
`