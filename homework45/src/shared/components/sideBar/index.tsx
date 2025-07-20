import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import WalletIcon from '@mui/icons-material/Wallet';
import RealEstateAgentIcon from '@mui/icons-material/RealEstateAgent';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import { SideBarNav, StyledSideBar } from './index.styles';
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, Toolbar } from '@mui/material';
import { StyledRouterLink } from '../../styles/styles';
import { DrawerState } from '../../../store/drawer';

const SIDEBAR_MENU = [
    { icon: <WalletIcon />, text: "Wallet", link: "/wallet" },
    { icon: <RealEstateAgentIcon />, text: "Housekeeping", link: "/wallet" },
    { icon: <AddReactionIcon />, text: "Wishes", link: "/wallet" },
    { icon: <AssignmentTurnedInIcon />, text: "Necessities", link: "/wallet" }
]

export const SideBar: React.FC = () => {

    const drawer = useSelector(state => state.drawer);

    return (
        <StyledSideBar displayMode={drawer}>
            <List sx={{ m: 1 }}>
                {SIDEBAR_MENU.map((item) => {
                    return (
                        <StyledRouterLink to={item.link}>
                            <ListItem sx={{ m: 1 }} key={item.text} disablePadding>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                {drawer==DrawerState.extended && <ListItemText primary={item.text} />}
                            </ListItem>
                        </StyledRouterLink>
                    )
                })
                }
            </List>
        </StyledSideBar>
    )
}