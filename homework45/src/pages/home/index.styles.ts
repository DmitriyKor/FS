import styled from 'styled-components';

export const HomeLayout = styled.div`
    display: flex;
    min-height: 100vh;   
`
export const HomeGridLayout = styled.section`
    width: 80%; 
    color: black;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
    "account addhistory addhistory addhistory history"
    "categories categories categories categories history";
`
export const GridItemAccount = styled.div`

`