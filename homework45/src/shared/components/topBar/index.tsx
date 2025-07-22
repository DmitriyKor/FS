import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

import { AccountCircle, Login } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import type { IUser } from '../../store/user';
import { ProfileContainer, TopBarStyle } from "./index.styles";
import { displayDrawer, DrawerState } from "../../../store/drawer";


export const TopBar = () => {

    const user: IUser = useSelector(state => state.user);
    const dispatch = useDispatch();
    const drawerState = useSelector(state=> state.drawer)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = (e) => {
        if (drawerState==DrawerState.extended) {dispatch(displayDrawer(DrawerState.narrow))}
        else if (drawerState==DrawerState.narrow) {dispatch(displayDrawer(DrawerState.hidden))}
        else {dispatch(displayDrawer(DrawerState.extended))}
    }

    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: name? stringToColor(name):'lightblue',
                mr: 2 
            },
            children: name?`${name.split(' ')[0][0]}${name.split(' ')[1][0]}`:'',
        };
    }

    const UserMenu = () => {
        return (
            <Menu
                id="user-menu"
                slotProps={{
                    paper: {
                        sx: {
                            width: '300px',
                            maxWidth: '50%',
                        },
                    }
                }}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
            >
                <ProfileContainer>
                    <Avatar sx={{ width: 56, height: 56 }} src={user.data?.image} alt={user.data?.name}/>
                    <h4>{user.data?.name}</h4>
                    <p>{user.data?.email}</p>
                </ProfileContainer>

                <Divider />
                
                <Link to='/logout'>
                    <MenuItem>
                        <ListItemIcon onClick={handleCloseUserMenu}>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Log out</ListItemText>
                    </MenuItem>
                </Link>
            </Menu>
        )
    }

    return (
        <TopBarStyle>          
            
            <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ ml: 1, visibility: user.data? 'visible' : 'hidden' }}
                onClick={handleMenuClick}
            >
                <MenuIcon />
            </IconButton>
            
            {user.data ?
                <Avatar {...stringAvatar(user.data.name)} onClick={handleOpenUserMenu}/>
                :
                <Link to='/login'>
                    <Button
                        sx={{ mr: 2 }}
                        aria-label="login"
                    >
                        <Login sx={{ mr: 1 }} fontSize="small" />
                        Login
                    </Button>
                </Link>
            }
            <UserMenu />

        </TopBarStyle>
    );
}