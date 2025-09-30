import styled from 'styled-components';

export const HistoryLayout = styled.div`
    grid-area: history;   
    height: 90%;
`

export const HistoryListStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    box-sizing: border-box;
    margin: 0px;
    padding: 0;
    span: 10px;
    overflow: auto;
`

export const HistoryItemStyle = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.theme.panel.borderColor};
    background-color: ${props => props.theme.panel.backgroundColor};
    box-sizing: border-box;
    width: 100%;
    padding: 5px;
    div {
        h5 {
            margin: 0;
            padding: 0;
        }
        display: flex;
        justify-content: space-between;
    }
`
