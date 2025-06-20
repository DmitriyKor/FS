import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useSelector } from 'react-redux';

import { appContent } from '../const';
import { AppLangContext } from '../context/AppLangContext';

export function NavMenu() {

    const {t} = useContext(AppLangContext);
    const displayPosts = useSelector((state) => state.settings.displayPosts);
    const displayPhotos = useSelector((state) => state.settings.displayPhotos);

    return (
        <aside className="nav-menu">
            <nav>
                <ul>
                    {appContent.map((item, index) => {
                        if (!item.link.includes(':')) {
                            if ((item.text!='Posts' | displayPosts) & (item.text!='Photos' | displayPhotos))
                            return (                                
                                <li key={index}>
                                    <Link to={item.link}>{t(item.text)}</Link>
                                </li>
                            )
                        }
                    })}
                </ul>
            </nav>
        </aside>
    )
}