import * as React from 'react';
import searchFuelDetails from '../../../data/hooks/fuelData';
import { useQuery } from 'react-query';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Skeleton,
    Typography,
} from '@mui/material';
import inComingLoad from '../inComing.ico';

import dayjs from 'dayjs';
import useGasStations from '../../hooks/useGasStations';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime, { rounding: Math.floor });

export default function CitiesList({ selectedCity, setCurrentLocation }: any) {
    const { name,
        lat,
        long,
        city } = selectedCity;

    const locateShed = (event: any) => {
        setCurrentLocation({
            coords: { latitude: lat, longitude: long },
            zoom: 17,
        });
    };
    return (
        <Box>
            <Card
                elevation={1}
                sx={{ width: '100%', my: 1 }}
            >
                <CardContent>
                    <Box display="flex" flexDirection="column">
                        <Box>
                            <Typography variant="h6">
                                {name}
                            </Typography>
                        </Box>

                        <Box>
                            {city}
                        </Box>
                    </Box>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={locateShed}
                        size="small"
                        variant="outlined"
                    >
                        Locate
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}
