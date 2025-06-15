import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';

export function Photos(){
    const { data, stateReading } = useGetDataInit(apiURL+'/photos');
    return (
        <div>
            <h1>Photos</h1>
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