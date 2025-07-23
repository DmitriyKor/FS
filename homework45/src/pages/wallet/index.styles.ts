import styled from 'styled-components';

export const WalletGridLayout = styled.section`
    width: 100%; 
    height: 100%;
    color: black;
    display: grid;
    box-sizing: border-box;
    grid-gap: 10px;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 
    "account addhistory addhistory addhistory history"
    "categories categories categories categories history";
`
export const GridItemAccount = styled.div`

`