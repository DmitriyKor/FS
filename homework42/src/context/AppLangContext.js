import { createContext, useState, useEffect } from "react";

import {supportedLanguages, translationTable} from './AppLangContext.const';

const StorageKey = 'features-ui-language';

export const AppLangContext = createContext(null);

export const AppLangProvider = ({ children }) => {
    let storedLang = localStorage.getItem(StorageKey);
    if (!storedLang) { storedLang = supportedLanguages[0] };
    const [lang, setLang] = useState(storedLang);
    const [langIdx, setLangIdx] = useState(0);

    function t(str) {
        if (langIdx <= 0) return str;
        return translationTable[langIdx][str] ?? str;
    }

    useEffect(() => {
        localStorage.setItem(StorageKey, lang);
        setLangIdx(supportedLanguages.findIndex(item => item == lang));
    }, [lang]);

    return (
        <AppLangContext.Provider value={{ lang, setLang, supportedLanguages, t }}>
            {children}
        </AppLangContext.Provider>
    )
}