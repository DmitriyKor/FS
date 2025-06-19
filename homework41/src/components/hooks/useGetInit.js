import { useState, useEffect } from 'react';
import axios from 'axios';
//import { ToastContainer, toast } from 'react-toastify';
import toast, { Toaster } from 'react-hot-toast';

export const useGetDataInit = (url) => {
    const [data, setData] = useState(null);
    const [stateReading, setStateReading] = useState(true);

    useEffect(() => {
        async function getData() {
            setStateReading(true);
            try {
                const response = await axios.get(url);
                console.log(`response is ${response}`);
                setData(response.data);
                toast("Success");
                return response;
            } catch (error) {
                console.log('Something went wrong');
                console.error(error);
                toast(error.message);
                setData(null);
            } finally {
                setStateReading(false);
            }
        }

        // async function getData() {
        //     const response = await axios.get(url);
        //     setData(response.data);
        //     return response;
        // }

        // async function handleToast() {
        //     toast.promise(
        //         getData(), 
        //         {
        //             loading: 'Loading data...', // Message during loading
        //             success: ({ data }) => `Data fetched: ${data}`, // Message on success
        //             error: (err) => `Error: ${err.message}`, // Message on error
        //         }
        //     );
        // }

        // handleToast();
        getData();
    }, []);

    return { data, stateReading };
}