import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext, useState } from 'react';

import { appContent } from '../const';
import { AppLangContext } from '../context/AppLangContext';

export function NavMenu() {

    const {t} = useContext(AppLangContext);

    return (
        <aside className="nav-menu">
            <nav>
                <ul>
                    {appContent.map((item, index) => {
                        if (!item.link.includes(':')) {
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