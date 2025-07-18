import { Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import MenuIcon from '@mui/icons-material/Menu';
import { TopBarStyle } from "./index.styles";
import { AccountCircle, Login } from "@mui/icons-material";
import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';

export const TopBar = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorEl(null);
    };

    return (
        <TopBarStyle>
            <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={{ ml: 2 }}
            >
                <MenuIcon />
            </IconButton>

            <IconButton
                size="large"
                edge='end'
                sx={{ mr: 2 }}
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
            >
                <AccountCircle />
            </IconButton>
            <Menu
                id="user-menu"
                // slotProps={{
                //     paper: {
                //         sx: {
                //             width: '400px',
                //             maxWidth: '50%',
                //         },
                //     }
                // }}
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
                <div>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        kuqgf qiufhiq
                    </Typography>
                </div>

                <Divider />

                <MenuItem>
                    <ListItemIcon onClick={handleCloseUserMenu}>
                        <Login fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Login</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon onClick={handleCloseUserMenu}>
                        <AssignmentIndIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Register</ListItemText>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon onClick={handleCloseUserMenu}>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Log out</ListItemText>
                </MenuItem>

            </Menu>

        </TopBarStyle>
    );
}