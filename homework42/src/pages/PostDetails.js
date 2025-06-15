import { useState, useEffect, CSSProperties } from 'react';
import { useGetDataInit } from './hooks/useGetInit';
import { BeatLoader } from "react-spinners";
import { useParams } from 'react-router-dom';
import { apiURL } from '../const';
import { LoadIndicator } from '../components/LoadIndicator';

export function PostDetails() {
    let { id } = useParams();
    const { data, stateReading } = useGetDataInit(apiURL+'/posts/' + id.toString());
    return (
        <div>
            <h1>Posts</h1>
            <h2>{data?.title}</h2>
            <p>{data?.body}</p>
            <LoadIndicator state={stateReading}/>
        </div>
    )
}
