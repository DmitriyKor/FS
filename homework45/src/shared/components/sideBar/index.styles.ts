import styled from 'styled-components';
import { DrawerState } from '../../../store/drawer';

export const StyledSideBar = styled.div<{displayMode : DrawerState}>`
    background-color: lightgray;
    color: black;
    width: ${p => (p.displayMode == DrawerState.extended? 280 : 
        p.displayMode == DrawerState.narrow? 60 : 0
    )}px;
    display: ${p => (p.displayMode == DrawerState.extended || p.displayMode == DrawerState.narrow? 'unset' : 'none')};
    min-height: 100%;
`
export const SideBarNav = styled.nav`    
    color: black;
    ul {  
        list-style-type: none;
        li {
            text-decoration: none;
        }
    }
`
