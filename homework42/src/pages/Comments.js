import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BeatLoader } from "react-spinners";

import { useGetDataInit } from './hooks/useGetInit';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';
import { AppLangContext } from '../context/AppLangContext';

export function Comments() {
    const { data, stateReading } = useGetDataInit(apiURL + '/comments');
    const {t} = useContext(AppLangContext);    
    return (
        <div>
            <h1>{t('Comments')}</h1>
            {data?.map((item) => {
                return (
                    <div key={item.id + item.name}>
                        <h2>{item.name}</h2>
                        <p>From: {item.email}</p>
                        <p>{item.body}</p>
                    </div>)
            })}
            <LoadIndicator state={stateReading} />
        </div>
    )
}