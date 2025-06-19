import { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BeatLoader } from "react-spinners";

import { useGetDataInit } from './hooks/useGetInit';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';
import { AppLangContext } from '../context/AppLangContext';

export function Posts(){
    const { data, stateReading } = useGetDataInit(apiURL + '/posts');
    const {t} = useContext(AppLangContext);
    return (
        <div>
            <h1>{t('Posts')}</h1>
            {data?.map((item) => {
                    return (
                        <div key={item.id + item.name}>
                            <Link to={'/posts/'+item.id.toString()}><h2>{item.title}</h2></Link>
                            <p>{item.body}</p>
                        </div>)
                })}
            <LoadIndicator state={stateReading}/>
        </div>
    )
}