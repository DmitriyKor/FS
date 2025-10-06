import styled from 'styled-components';

export const HistoryLayout = styled.div`
    grid-area: history;
`
export const HistoryListStyle = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0;
    margin: 0;
    gap: 10px;
    overflow-y: auto;
`

export const HistoryItemStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 0;
    border: 1px solid ${props => props.theme.panel.borderColor};
    background-color: ${props => props.theme.historyItem.backgroundColor};
    font-size: 10px;
    width: 100%;
    box-sizing: border-box;
`
