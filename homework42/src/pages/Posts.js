import { useState, useEffect, CSSProperties } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';

export function Posts(){
    const { data, stateReading } = useGetDataInit(apiURL + '/posts');
    return (
        <div>
            <h1>Posts</h1>
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