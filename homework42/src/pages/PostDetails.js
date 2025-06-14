import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { useParams } from 'react-router-dom';
import { override } from './common.js'

export function PostDetails() {
    let { id } = useParams();

    const { data, stateReading } = useGetDataInit('https://jsonplaceholder.typicode.com/posts/' + id.toString());

    return (
        <div>
            <h1>Posts</h1>
            <h2>{data?.title}</h2>
            <p>{data?.body}</p>
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
