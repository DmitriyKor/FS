import { createContext, useState, useEffect } from "react";

const supportedThemes = {
    light: 'light',
    dark: 'dark',
};

const StorageKey = 'features-color-theme';

export const AppThemeContext = createContext(null);

export const AppThemeProvider = ({ children }) => {
    let storedTheme = localStorage.getItem(StorageKey);
    if (!storedTheme) {storedTheme = supportedThemes.light};
    const [theme, setTheme] = useState(storedTheme);

    useEffect(() => {
        localStorage.setItem(StorageKey, theme);
        document.documentElement.setAttribute('theme', theme);
    }, [theme]);

    return (
        <AppThemeContext.Provider value={{ theme, setTheme, supportedThemes }}>
            {children}
        </AppThemeContext.Provider>
    )
}