import { useState, useEffect } from 'react';
import axios from 'axios';

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
                return response;
            } catch (error) {
                console.log('Something went wrong');
                console.error(error);
                setData(null);
            } finally {
                setStateReading(false);
            }
        }

        getData();
    }, []);

    return { data, stateReading };
}