import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BeatLoader } from "react-spinners";

import { useGetDataInit } from './hooks/useGetInit';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';
import { AppLangContext } from '../context/AppLangContext';

export function Users(){  
    const { data, stateReading } = useGetDataInit(apiURL+ '/users');
    const {t} = useContext(AppLangContext);        
    return (
        <div>
            <h1>{t('Users')}</h1>
            {data?.map((item) => {
                    return (
                        <div key={item.id + item.name}>
                            <h4>Name: {item.name}</h4>
                            <p>Username: {item.username}</p>
                            <p>email: {item.email}</p>                            
                        </div>)
                })}
            <LoadIndicator state={stateReading}/>
        </div>
    )
}