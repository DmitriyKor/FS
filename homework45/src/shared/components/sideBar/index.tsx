import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import WalletIcon from '@mui/icons-material/Wallet';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import HomeIcon from '@mui/icons-material/Home';

import { SideBarNav, StyledSideBar } from './index.styles';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Toolbar } from '@mui/material';
import { StyledRouterNavLink } from '../../styles/styles';
import { DrawerState } from '../../../store/drawer';

const SIDEBAR_MENU = [
    { icon: <HomeIcon />, text: "Home", link: "/" },
    { icon: <WalletIcon />, text: "Wallet", link: "/wallet" },
    { icon: <RealEstateAgentIcon />, text: "Housekeeping", link: "*" },
    { icon: <AddReactionIcon />, text: "Wishes", link: "*" },
    { icon: <AssignmentTurnedInIcon />, text: "Necessities", link: "*" }
]

export const SideBar: React.FC = () => {

    const drawer = useSelector(state => state.drawer);
    const location = useLocation();
    const user = useSelector(state => state.user);
    
    return user.data? 
     (
        <StyledSideBar displayMode={drawer}>
            <List sx={{ p: 0 }}>
                {SIDEBAR_MENU.map((item) => {
                    return (
                        <ListItemButton key={item.text} component={StyledRouterNavLink} to={item.link}
                            sx={location.pathname == item.link ? { background: 'gray' } : null}
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