import { useState, useEffect, useContext } from 'react';

import { apiURL } from '../const';
import { AppLangContext } from '../context/AppLangContext';

export function Home(){
    const {t} = useContext(AppLangContext);   
    return (
        <>
        <h1>{t('Home')}</h1>
        <p>{t('This is the demo app')}</p>
        </>
    )
}