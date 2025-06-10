import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetDataInit } from './hooks/useGetInit';
import { createUseStyles } from 'react-jss';
import { ToastContainer, toast } from 'react-toastify';

const useStyles = createUseStyles({
    panel: {
        "background-color": 'green'
    },
    name: {
        "color": "red"
    }
})

export const UserViewer = () => {

    const { data, stateReading } = useGetDataInit('https://jsonplaceholder.typicode.com/users');

    const classes = useStyles();

    return (
        (stateReading) ?
            <>
                <p>Reading data...</p>
            </>
            :
            <>
                {data?.map((item) => {
                    return (
                        <div key={item.id + item.name} className={classes.panel}>
                            <p>ID: {item.id}</p>
                            <p className={classes.name}>Name: {item.name}</p>
                            <p>Email: {item.email}</p>
                        </div>)
                })}
                <ToastContainer />
            </>
    )
}