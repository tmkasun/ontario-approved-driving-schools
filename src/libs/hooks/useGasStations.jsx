import React, { useEffect,useState } from 'react';
import Papa from "papaparse";
const allData = import('../../data/final.json');

import sample from '../../tests/vax'

export default function useGasStations() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    useEffect(() => {
        setIsLoading(true)
        const asyncFun = async () => {
            const allStations = await allData;
            setData(allStations.default);
            setIsLoading(false)

        };
        // setData(sample);
        asyncFun();
    }, [])
    return [data, error, isLoading]
}