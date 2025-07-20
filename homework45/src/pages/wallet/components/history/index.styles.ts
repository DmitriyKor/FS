import styled from 'styled-components';

export const HistoryLayout = styled.div`
    grid-area: history;   
`

export const HistoryListStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    margin: 10px;
    span: 10px;
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
