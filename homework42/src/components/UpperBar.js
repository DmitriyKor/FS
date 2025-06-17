import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppThemeContext } from '../context/AppThemeContext';

export const UpperBar = () => {

    const {theme, setTheme, supportedThemes} = useContext(AppThemeContext);

    const [selectedValue, setSelectedValue] = useState(theme);

    const handleThemeChange=(e)=>{
        setSelectedValue(e.target.value);
        setTheme(e.target.value);
    }
    
    return (
        <div className="upper-bar">
            <form>
                <label>
                    Theme
                    <select value={selectedValue} onChange={handleThemeChange}>
                        <option value={supportedThemes.light}>Light</option>
                        <option value={supportedThemes.dark}>Dark</option>
                    </select>
                </label>
            </form>
        </div>
    )
}