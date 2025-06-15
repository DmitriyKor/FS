import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';

export function Comments() {
    const { data, stateReading } = useGetDataInit(apiURL + '/comments');
    return (
        <div>
            <h1>Comments</h1>
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