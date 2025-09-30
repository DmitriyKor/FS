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
    font-size: 12px;
    flex-direction: column;
    border: 1px solid ${props => props.theme.panel.borderColor};
    height: 100%;
    background-color: ${props => props.theme.panel.backgroundColor};
    box-shadow: 3px 3px 5px 0px rgba(0,0,0,0.1);
    border-radius: ${props => props.theme.panel.borderRadius};
    box-sizing: border-box;
    width: calc((100% / 5) - 10px);
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
export const CategoryItemToolbar = styled.div`
    display: flex;
    font-size: 10px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
`
export const CategoryItemToolbarText = styled.div`
    display: flex;
    flex: 1 1 auto;
    margin-right: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
export const CategoryItemToolbarIcons = styled.div`
  display: flex;
  gap: 8px;              
  flex-shrink: 0;    
`

export const CategoryItemToolbarIcon = styled.div`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`


