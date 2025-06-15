import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';

export function Users(){
    
    const { data, stateReading } = useGetDataInit(apiURL+ '/users');

    console.log(data);
 
    return (
        <div>
            <h1>Users</h1>
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