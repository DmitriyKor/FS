import styled from 'styled-components';

export const PanelStyle = styled.div` 
    padding: ${props => props.theme.panel.padding};
    margin: 0;
    border: 1px solid ${props => props.theme.panel.borderColor};
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.panel.backgroundColor};
    box-shadow: 1px 1px 1px 0px rgba(0,0,0,0.2);
    border-radius: ${props => props.theme.panel.borderRadius};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`
export const PanelToolBarStyle = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    h4 {
        margin: 0;
        padding: 0;
    }
`
export const PanelToolBarButtonStyle = styled.button`
`