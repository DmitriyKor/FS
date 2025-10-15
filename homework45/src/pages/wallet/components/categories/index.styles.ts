import styled from 'styled-components';

export const CategoriesLayout = styled.div`
    grid-area: categories;   
`
export const CategoriesListStyle = styled.div`
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    height: 100%;
    margin: 10px;
    gap: 10px;
`
export const CategoryItemStyle = styled.div`
    display: flex;
    flex-shrink: 0; 
    font-size: 12px;
    flex-direction: column;
    border: 1px solid ${props => props.theme.panel.borderColor};
    height: 100%;
    background-color: ${props => props.theme.panel.backgroundColor};
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.1);
    border-radius: ${props => props.theme.panel.borderRadius};
    box-sizing: border-box;
    width: 15%;
    padding: 10px;
    h4 { 
        font-size: 14px;
        margin:0;
        padding:0;
    }
    h5 {
        margin: 0 0 10px 0;
        padding: 0;
    }
    
    p {
        font-size: 10px;
    }
`



