import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Button, Divider, FormControl, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, TextField } from "@mui/material";
import { Form, Field } from 'react-final-form';

import { Edit, Login } from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

import { ProfileContainer, TopBarStyle } from "./index.styles";
import { displayDrawer, DrawerState } from "../../../store/drawer";
import type { RootState } from "../../../store/store";
import { fetchUser, type IUser } from "../../../store/user";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { API_URL } from "../../../store/const";
import { ENDPOINT_USER } from "../../../store/user/const";
import { authAxios } from "../../../helpers/authAxios";


export const TopBar = () => {

    const user: IUser = useSelector((state: RootState) => state.user);

    console.log('user.data?.image', user.data?.image);

    const dispatch = useDispatch();
    const drawerState = useSelector((state: RootState) => state.drawer);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    const handleMenuClick = () => {
        if (drawerState == DrawerState.extended) { dispatch(displayDrawer(DrawerState.narrow)) }
        else if (drawerState == DrawerState.narrow) { dispatch(displayDrawer(DrawerState.hidden)) }
        else { dispatch(displayDrawer(DrawerState.extended)) }
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

    const FileSelect = () => {
        const fileSelect = useRef(null);

        const handleFileSelectClick = (e)=>{
            if (fileSelect && fileSelect.current) fileSelect.current.click();
        }
        
        const OnSubmit = () => {
        }

        const handleFileChange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.readAsDataURL(file);
            const formData = new FormData();
            formData.append("image", file);
            try {
                const response: AxiosResponse = await authAxios.instance.post(API_URL + ENDPOINT_USER + '/image', formData);
                console.log(response.status);
                if (response.status==200) dispatch(fetchUser());
            } catch (e) {
            }
        };

        return <>
            <Button onClick={handleFileSelectClick}>...</Button>
            <Form
                onSubmit={OnSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} style={{ display: "none" }}>
                        <input
                            ref={fileSelect}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </form>)
                }
            />
        </>
    }

    function stringAvatar(name: string) {
        const nameParts: string[] = name?.split(' ');
        var ch: string = '';
        if (nameParts && nameParts.length > 1) { ch = nameParts[0][0] + nameParts[1][0] }
        else if (nameParts && nameParts.length > 0) { ch = nameParts[0][0] }
        return {
            sx: {
                bgcolor: name ? stringToColor(name) : 'lightblue',
                mr: 2
            },
            children: ch,
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
                    <Avatar sx={{ width: 56, height: 56 }} src={user.data?.image} alt={user.data?.name} />
                    <FileSelect />
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
                sx={{ ml: 1, visibility: user.data ? 'visible' : 'hidden' }}
                onClick={handleMenuClick}
            >
                <MenuIcon />
            </IconButton>

            {(user.data) ?
                (user.data.image? <Avatar sx={{ width: 40, height: 40, mr:2 }} src={user.data?.image} alt={user.data?.name} onClick={handleOpenUserMenu}/> 
                    : <Avatar {...stringAvatar(user.data.name)} onClick={handleOpenUserMenu} />)
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