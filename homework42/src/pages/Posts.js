import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { override } from './common.js'

export function Posts(){
    
    const { data, stateReading } = useGetDataInit('https://jsonplaceholder.typicode.com/posts');

    console.log(data);
 
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