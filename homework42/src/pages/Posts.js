import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export function Posts(){
    
    const { data, stateReading } = useGetDataInit('https://jsonplaceholder.typicode.com/posts');

    console.log(data);
 
    return (
        <div>
            <h1>Posts</h1>
            {data?.map((item) => {
                    return (
                        <div key={item.id + item.name}>
                            <p>ID: {item.id}</p>
                            <p>Name: {item.name}</p>
                            <p>Email: {item.email}</p>
                        </div>)
                })}
            
            <BeatLoader
                color="black"
                loading={stateReading}
                cssOverride={override}
                size={150}
                aria-label="Loading data"
                data-testid="loader"
            />
        </div>
    )
}