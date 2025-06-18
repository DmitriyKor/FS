import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BeatLoader } from "react-spinners";

import { useGetDataInit } from './hooks/useGetInit';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';
import { AppLangContext } from '../context/AppLangContext';

export function Photos(){
    const { data, stateReading } = useGetDataInit(apiURL+'/photos');
    const {t} = useContext(AppLangContext);       
    return (
        <div>
            <h1>{t('Photos')}</h1>
            {data?.map((item) => {
                    return (
                        <div key={item.id + item.name}>
                            <p>{item.title}</p>
                            <p>Url: {item.url}</p>
                        </div>)
                })}
            <LoadIndicator state={stateReading}/>
        </div>
    )
}