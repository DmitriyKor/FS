import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

export const useGetDataInit = (url)=> {
    const [data, setData] = useState(null);
    const [stateReading, setStateReading] = useState(true);

    useEffect(() => {
        async function getData() {
            setStateReading(true);
            try {
                const response = await axios.get(url);
                console.log(response);
                setData(response.data);
                toast("Success");
            } catch (error) {
                console.log('Something went wrong');
                console.error(error);
                setData(null);
                toast.error(error.message, {autoClose: 5000});
            } finally {
                setStateReading(false);
            }
        }
        getData(); 
    }, []);

    return {data, stateReading};
}