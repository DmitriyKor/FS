import styled from 'styled-components';

export const HistoryLayout = styled.div`
    grid-area: history;
`
export const HistoryListStyle = styled.div`
    display: flex;
    font-size: 10px;
    flex-direction: column;
    height: 100%;
    padding: 0;
    margin: 0;
    gap: 10px;
    overflow-y: scroll;
`
export const HistoryLoaderStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    height: 40px;
    margin: 0;
    border: 2px solid black;
    width: calc(100% - 10px);
`


export const HistoryItemStyle = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin: 0;
    border: 1px solid ${props => props.theme.panel.borderColor};
    background-color: ${props => props.theme.historyItem.backgroundColor};
    font-size: 10px;
      width: calc(100% - 5px);
    box-sizing: border-box;
`
