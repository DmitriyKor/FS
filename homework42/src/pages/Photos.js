import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { override } from './common.js'

export function Photos(){
    
    const { data, stateReading } = useGetDataInit('https://jsonplaceholder.typicode.com/photos');

    console.log(data);
 
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