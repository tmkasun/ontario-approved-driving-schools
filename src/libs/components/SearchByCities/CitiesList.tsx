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
    const { cityId, districtId, provinceId } = selectedCity;
    const [allSheds, allShedsError, isLoadingAllSheds] = useGasStations();

    const {
        isError: isP92Error,
        isLoading: isP92Loading,
        data: p92Data,
        error: p92Error,
    } = useQuery(['p92', provinceId, cityId, districtId], searchFuelDetails);
    const {
        isError: isP95Error,
        isLoading: isP52Loading,
        data: p95Data,
        error: p95Error,
    } = useQuery(['p95', provinceId, cityId, districtId], searchFuelDetails);
    const {
        isError: isDError,
        isLoading: isDLoading,
        data: dData,
        error: dError,
    } = useQuery(['d', provinceId, cityId, districtId], searchFuelDetails);
    let allData = [];
    if (dData && p92Data && p95Data) {
        for (const petrol92 of p92Data) {
            allData.push({
                petrol92,
                petrol95: p95Data.find(
                    ({ shedId }: any) => shedId === petrol92.shedId
                ),
                diesel: dData.find(
                    ({ shedId }: any) => shedId === petrol92.shedId
                ),
            });
        }
    }
    const locateShed = (event: any) => {
        const { id: currentID } = event.currentTarget;
        const found = allSheds[currentID];
        if (found) {
            const { latitude, longitude } = found.p92Data;
            setCurrentLocation({
                coords: { latitude: longitude, longitude: latitude },
                zoom: 17,
            });
        }
    };
    return (
        <Box>
            {(isP92Loading || isDLoading) &&
                [1, 2].map((i) => (
                    <Card elevation={1} sx={{ width: '100%', my: 1 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                <Skeleton height={30} width="50%" />
                            </Typography>
                            <Typography
                                variant="h5"
                                component="div"
                            ></Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                <Skeleton height={20} width="20%" />
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Skeleton
                                variant="rectangular"
                                width={80}
                                height={30}
                                sx={{ borderRadius: '5px' }}
                            />
                        </CardActions>
                    </Card>
                ))}
            {allData.length > 0 &&
                allData.map((shed) => (
                    <Card
                        key={shed.petrol92.shedId}
                        elevation={1}
                        sx={{ width: '100%', my: 1 }}
                    >
                        <CardContent>
                            <Box display="flex" flexDirection="column">
                                <Box>
                                    <Typography variant="h6">
                                        {shed.petrol92.shedName}
                                    </Typography>
                                </Box>

                                <Box>
                                    Petrol 92
                                    {shed.petrol92.bowserDispatch ? (
                                        <Box
                                            display="inline"
                                            color="green"
                                            ml={2}
                                        >
                                            <img
                                                width={60}
                                                src={inComingLoad}
                                            />
                                            ETA:{' '}
                                            {dayjs().to(
                                                dayjs(
                                                    shed.petrol92.eta.split(
                                                        ','
                                                    )[0]
                                                )
                                            )}
                                        </Box>
                                    ) : (
                                        <Box
                                            display="inline"
                                            color="red"
                                            ml={2}
                                        >
                                            Not dispatched
                                        </Box>
                                    )}
                                </Box>
                                <Box>
                                    Petrol 95
                                    {shed.petrol95.bowserDispatch ? (
                                        <Box
                                            display="inline"
                                            color="green"
                                            ml={2}
                                        >
                                            <img
                                                width={60}
                                                src={inComingLoad}
                                            />
                                            ETA:{' '}
                                            {dayjs().to(
                                                dayjs(
                                                    shed.petrol95.eta.split(
                                                        ','
                                                    )[0]
                                                )
                                            )}
                                        </Box>
                                    ) : (
                                        <Box
                                            display="inline"
                                            color="red"
                                            ml={2}
                                        >
                                            Not dispatched
                                        </Box>
                                    )}
                                </Box>
                                <Box>
                                    Diesel (Normal)
                                    {shed.diesel.bowserDispatch ? (
                                        <Box
                                            display="inline"
                                            color="green"
                                            ml={2}
                                        >
                                            <img
                                                width={60}
                                                src={inComingLoad}
                                            />
                                            ETA:{' '}
                                            {dayjs().to(
                                                dayjs(
                                                    shed.diesel.eta.split(
                                                        ','
                                                    )[0]
                                                )
                                            )}
                                        </Box>
                                    ) : (
                                        <Box
                                            display="inline"
                                            color="red"
                                            ml={2}
                                        >
                                            Not dispatched
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </CardContent>
                        <CardActions>
                            <Button
                                id={shed.petrol92.shedId}
                                onClick={locateShed}
                                size="small"
                                variant="outlined"
                            >
                                Locate
                            </Button>
                        </CardActions>
                    </Card>
                ))}
        </Box>
    );
}
