import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components'
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Toolbar } from '@mui/material';

import { StyledSideBar } from './index.styles';
import { StyledRouterNavLink } from '../../styles/styles';
import { DrawerState } from '../../../store/drawer';
import {SIDEBAR_MENU} from './const';

export const SideBar: React.FC = () => {

    const drawer = useSelector(state => state.drawer);
    const location = useLocation();
    const user = useSelector(state => state.user);
    const theme = useTheme();
    
    return user.data? 
     (
        <StyledSideBar $displayMode={drawer}>
            <List sx={{ p: 0 }}>
                {SIDEBAR_MENU.map((item) => {
                    return (
                        <ListItemButton key={item.text} component={StyledRouterNavLink} to={item.link}
                            sx={location.pathname == item.link ? { background: theme.sideBar.selectedLinkColor } : null}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            {drawer == DrawerState.extended && <ListItemText primary={item.text} />}
                        </ListItemButton>
                    )
                })
                }
            </List>
        </StyledSideBar>
    ):
    <></>
}