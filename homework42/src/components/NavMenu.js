import { appContent } from '../const';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

export function NavMenu() {

    return (
        <aside className="nav-menu">
            <nav>
                <ul>
                    {appContent.map((item, index) => {
                        if (!item.link.includes(':')) {
                            return (
                                <li key={index}>
                                    <Link to={item.link}>{item.text}</Link>
                                </li>
                            )
                        }
                    })}
                </ul>
            </nav>
        </aside>
    )
}