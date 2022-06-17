import React, { useEffect, useState } from 'react';

import { useQuery } from 'react-query';

export default function useGasStations() {
    const { isLoading, data, isError, error } = useQuery('allGasStations', async () => {
        const response = await fetch('final.json', {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Unable to fetch data /final.json');
        }
        return response.json();
    });
    return [data, error, isLoading];
}
