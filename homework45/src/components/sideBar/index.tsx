import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import type { RootState, AppDispatch } from '../../store/store';
import type { IUser } from '../../store/user';


export const SideBar: React.FC = () => {

    //const displayPosts = useSelector((state) => state.settings.displayPosts);

    const user : IUser = useSelector(state => state.user);

    return (
        <div className="sidebar">
            <div>
                <img src={user.image} alt="avatar"></img>
                <h4>{user.name}</h4>
            </div>
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