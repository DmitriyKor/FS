import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AppThemeContext } from '../context/AppThemeContext';
import { AppLangContext } from '../context/AppLangContext';

export const UpperBar = () => {

    const {theme, setTheme, supportedThemes} = useContext(AppThemeContext);
    const {lang, setLang, supportedLanguages} = useContext(AppLangContext);

    const [selectedTheme, setSelectedTheme] = useState(theme);
    const [selectedLang, setSelectedLang] = useState(lang);

    const handleThemeChange=(e)=>{
        setSelectedTheme(e.target.value);
        setTheme(e.target.value);
    }

    const handleLangChange=(e)=>{
        setSelectedLang(e.target.value);
        setLang(e.target.value);
    }
    
    return (
        <div className="upper-bar">
            <form>
                <label>
                    Theme
                    <select value={selectedTheme} onChange={handleThemeChange}>
                        <option value={supportedThemes.light}>Light</option>
                        <option value={supportedThemes.dark}>Dark</option>
                    </select>
                </label>
                <label>
                    Language
                    <select value={selectedLang} onChange={handleLangChange}>
                        {supportedLanguages?.map((value)=>{return <option value={value} key={value}>{value}</option>})}
                    </select>
                </label>

            </form>
        </div>
    )
}