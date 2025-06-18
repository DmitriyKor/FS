import { createContext, useState, useEffect } from "react";

const supportedLanguages = [
    'English',
    'Francais',
    'Українська',
];

const translationTable = [
    {}, //first language is english, no translation 
    {
        "Home": "Accueil",
        "Posts": "Publications",
        "Users": "Utilisateurs",
        "Photos": "Photos",
        "Todos": "A faire"
    },
    {
        "Home": "Домашня",
        "Posts": "Пости",
        "Users": "Користувачі",
        "Photos": "Фотографії",
        "Todos": "До виконання"
    }
]

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