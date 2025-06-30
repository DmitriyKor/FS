import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../../store/store';
import type { IUser, IUserData } from '../../store/user';
import { Avatar, ProfileContainer } from './index.styles';


export const SideBar: React.FC = () => {
    const user : IUser = useSelector(state => state.user);

    console.log('useSelector');
    console.log(user);
    return (
        <div>
            <ProfileContainer>
                <Avatar src={user.data?.image} alt="avatar"></Avatar>
                <h4>{user.data?.name}</h4>
                <p>{user.data?.email}</p>
            </ProfileContainer>
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/'>Sign in</Link></li>
                    <li><Link to='/'>Signup</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul>
            </nav>
        </div>
    )
}