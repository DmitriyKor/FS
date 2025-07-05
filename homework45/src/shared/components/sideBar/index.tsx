import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import type { IUser } from '../../store/user';
import { Avatar, ProfileContainer, SideBarNav, StyledSideBar } from './index.styles';


export const SideBar: React.FC = () => {
    const user : IUser = useSelector(state => state.user);

    return (
        <StyledSideBar>
            <ProfileContainer>
                <Avatar src={user.data?.image} alt="avatar"></Avatar>
                <h4>{user.data?.name}</h4>
                <p>{user.data?.email}</p>
            </ProfileContainer>
            <SideBarNav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/'>Sign in</Link></li>
                    <li><Link to='/'>Signup</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul>
            </SideBarNav>
        </StyledSideBar>
    )
}