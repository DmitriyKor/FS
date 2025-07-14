import styled from 'styled-components';

export const LoginLayout = styled.div`
    display: flex;
`

export const LoginFormStyle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;   
    box-sizing: border-box;
    background-color: ${props => props.theme.backgroundColor}
`