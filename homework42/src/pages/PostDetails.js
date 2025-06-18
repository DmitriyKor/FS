import { useState, useEffect, useContext } from 'react';
import { BeatLoader } from "react-spinners";

import { useGetDataInit } from './hooks/useGetInit';
import { useParams } from 'react-router-dom';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';
import { AppLangContext } from '../context/AppLangContext';

export function PostDetails() {
    let { id } = useParams();
    const { data, stateReading } = useGetDataInit(apiURL+'/posts/' + id.toString());
    const {t} = useContext(AppLangContext);       
    return (
        <div>
            <h1>{t('Posts')}</h1>
            <h2>{data?.title}</h2>
            <p>{data?.body}</p>
            <LoadIndicator state={stateReading}/>
        </div>
    )
}
