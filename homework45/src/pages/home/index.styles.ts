import styled from 'styled-components';

export const HomeLayout = styled.div`
    display: flex;
    min-height: 100vh;   
    box-sizing: border-box;
    background-color: ${props => props.theme.backgroundColor}
`

export const HomeAreaStyle = styled.div`
    width: 100%;
`

export const HomeGridLayout = styled.section`
    width: 100%; 
    color: black;
    display: grid;
    box-sizing: border-box;
    grid-gap: 10px;
    padding: 10px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
    "account addhistory addhistory addhistory history"
    "categories categories categories categories history";
`
export const GridItemAccount = styled.div`

`