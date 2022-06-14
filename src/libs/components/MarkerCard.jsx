import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
//https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=[YOUR_LAT],[YOUR_LNG]
// https://www.vaccines.gov/search/
import Typography from '@mui/material/Typography';

import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime, { rounding: Math.floor });


/**
 * @param {*} props 
 * @returns 
 */
export default function MarkerCard({ gasStation }) {
    const { id, province, district, city, lane,
        longitude, latitude, phoneNumber, shedName,
        fuelAvailabilityDTO, instituteId, p92Availablity, p95Availablity,
        davailablity, sdavailablity, ikavailablity,
        kavailablity, p92Capacity, p95Capacity,
        dcapacity, sdcapacity, ikcapacity, kcapacity, shedCode } = gasStation;
    const { lastUpdateByShed } = fuelAvailabilityDTO;
    const isPetrolAvailable = davailablity || sdavailablity;
    const isDieselAvailable = p92Availablity || p95Availablity;
    useEffect(() => {
        // debugger
    }, [])

    return (
        <Box sx={{
            minWidth: 275,
        }}>
            <Box>
                <Typography sx={{
                    fontSize: 14,
                }} color="textSecondary" gutterBottom>
                    Last Updated
                </Typography>
                <Box ml={3}>
                    <Typography variant="h6" component="h6">
                        <code>{dayjs().to(dayjs(lastUpdateByShed))}</code>
                    </Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                    Address
                </Typography>
                <Box ml={3}>
                    <Typography variant="h6" component="h6">
                        <code>{shedName}</code>
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        marginBottom: 12,
                    }}
                    color="textSecondary">
                    Available Fuel Types
                </Typography>
                <Box ml={3}>
                    <Typography variant="body2" component="p">
                        Petrol <Checkbox
                            checked={isPetrolAvailable}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Typography>
                    <Typography variant="body2" component="p">
                        Diesel<Checkbox
                            checked={isDieselAvailable}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </Typography>
                </Box>
            </Box>
            <CardActions>
                <Link
                    target="_blank"
                    rel="noopener"
                    href={`https://www.google.com/maps/dir/?api=1&travelmode=driving&layer=traffic&destination=${longitude},${latitude}`}>
                    <Button variant='outlined' color='primary' size="small">Directions</Button>
                </Link>
            </CardActions>
        </Box >
    );
}