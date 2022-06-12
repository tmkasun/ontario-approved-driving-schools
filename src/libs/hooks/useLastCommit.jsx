import React, { useEffect,useState } from 'react';

import sample from '../../tests/vax'
// filePath = covid19.lk_vax_centers.latest.tsv
export default function useLastCommit(filePath) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    useEffect(() => {
        const asyncFun = async () => {
            setIsLoading(true)
            const response = await fetch(
                `https://api.github.com/repos/nuuuwan/covid19/commits?path=${filePath}&ref=data&page=1&per_page=1&sha=data`
            ).catch(setError).finally(() => {
                setIsLoading(false)
            });
            const jsonData = await response.json();
            setData(jsonData[0]);
        };
        // setData(sample);
        asyncFun();
    }, [filePath])
    return [data, error, isLoading]
}