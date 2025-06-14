import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { override } from './common.js'

export function Users(){
    
    const { data, stateReading } = useGetDataInit('https://jsonplaceholder.typicode.com/users');

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
            
            <BeatLoader
                color="black"
                loading={stateReading}
                cssOverride={override}
                size={25}
                aria-label="Loading data"
                data-testid="loader"
            />
        </div>
    )
}