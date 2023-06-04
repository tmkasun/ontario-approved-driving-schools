import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import approvedSchools from '../data/schools.json';

import AreaSelect from './components/AreaSelect';
import useGasStations from './hooks/useGasStations';
import MarkerCard from './components/MarkerCard';
import SearchByCities from './components/SearchByCities/SearchByCities';

import './css/map.css';
import 'leaflet/dist/leaflet.css';
import Link from '@mui/material/Link';

const getMarker = (shedType = 1) => {
    const pinClass = 'pin-oneavailable';
    const pinEffectClass = 'pin-oneavailable-effect';

    switch (shedType) {
        case 1:
            return new L.icon({
                iconUrl: 'mapIcons/icon.png',
                iconSize: [30, 30], // size of the icon
                className: 'logoGlow',
            });
        case 2:
            return new L.icon({
                iconUrl: 'mapIcons/ioc.png',
                iconSize: [30, 30], // size of the icon
                className: 'logoGlow',
            });
        default:
            return new L.divIcon({
                html: `<div class="${pinClass}"></div> <div class="${pinEffectClass}"></div>`,
            });
    }
};

const searchedLocationMarker = new L.icon({
    iconUrl:
        'https://nishati-us.com/wp-content/uploads/2014/09/red-location-icon-map-png-4.png',

    iconSize: [30, 40], // size of the icon
    iconAnchor: [0, 35], // point of the icon which will correspond to marker's location
    popupAnchor: [25, 0], // point from which the popup should open relative to the iconAnchor
});
// https://opencagedata.com/demo

function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

const cleanUpRegex = /<abbr[^>]+?>([^$]+?)<\/abbr>/i
const getCleanedSchoolList = () =>
    approvedSchools.map(({ defensive_driving_course: { content: isDefAvailable }, digital_curriculum: { content: isDigiAvailable },
        phone: { content: phoneNumber }, school: { content: name },
        address: { content: address }, city, long: longitude, lat: latitude }) => {
        let fixedName = name;
        let fixedAddress = address;
        if (cleanUpRegex.test(name)) {
            fixedName = name.replace(cleanUpRegex, '$1')
        }
        if (cleanUpRegex.test(address)) {
            fixedAddress = address.replace(cleanUpRegex, '$1')
        }
        return {
            name: fixedName,
            address: fixedAddress,
            phoneNumber,
            longitude,
            latitude,
            city,
            isDefAvailable: isDefAvailable === 'Available',
            isDigiAvailable: isDigiAvailable === 'Available'
        }
    }
    )
const GasStationsMap = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const cleanedSchoolsList = useMemo(getCleanedSchoolList, [])
    const [filteredSchools, setFilteredSchools] = useState(cleanedSchoolsList);
    const reset = () => {
        setCurrentLocation(null);
        setFilteredSchools(cleanedSchoolsList)
    };
    const mapCenter = currentLocation
        ? [currentLocation.coords.latitude, currentLocation.coords.longitude]
        : [43.7181228, -79.5428661];
    const { zoom: customZoom = 11 } = currentLocation || {};
    const zoom = currentLocation && customZoom ? customZoom : 8;
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
            height={1}
        >
            {isLoading && (
                <LinearProgress
                    sx={{
                        width: '100vw',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        zIndex: 1000000, // TODO: Fix this
                    }}
                />
            )}

            <Grid xs={12} sm={3} item height={1}>
                <Box display='flex' flexDirection='column' height={1}>
                    <Box display='flex' flexGrow={1} flexDirection='column' rowGap={1} mt={1} alignItems='stretch'>
                        <SearchByCities
                            setCurrentLocation={setCurrentLocation}
                            approvedSchools={cleanedSchoolsList}
                            onSearch={setFilteredSchools}
                            setIsLoading={setIsLoading}
                        />

                        <AreaSelect onLocationChange={setCurrentLocation} />
                        <Button style={{ color: '#a20000' }} onClick={reset}>
                            RESET
                        </Button>
                        <Box color="success.main" textAlign="center">
                            <Typography variant="subtitle2">
                                <Box
                                    color="text.secondary"
                                    mr={1}
                                    display="inline"
                                >
                                    Total
                                </Box>
                                {filteredSchools && filteredSchools.length}
                            </Typography>
                        </Box>
                    </Box>
                    <Box display='flex' color="text.secondary">
                        Data source :{' '}
                        <Link
                            target="_blank"
                            rel="noopener"
                            href={'https://home.knnect.com:9443/devportal/'}
                        >
                            GitHub
                        </Link>
                        {'    '}
                        Source code :{' '}
                        <Link
                            target="_blank"
                            rel="noopener"
                            href={'https://github.com/tmkasun/better-fuel-gov.lk'}
                        >
                            GitHub
                        </Link>
                    </Box>
                </Box>
            </Grid>
            <Grid xs={12} sm={9} item>
                <Box border={0} boxShadow={3}>
                    <MapContainer
                        zoomControl
                        style={{ height: '100vh' }}
                        center={mapCenter}
                        zoom={zoom}
                        scrollWheelZoom
                    >
                        <ChangeView center={mapCenter} zoom={zoom} />
                        <TileLayer
                            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
                            accessToken="pk.eyJ1IjoidG1rYXN1biIsImEiOiJlNmZhOTYwNGJlODcxYWE5YjNmYjYzZmJiM2NlZWM4YiJ9.UT41ORairJ1PQ7woCnCH-A"
                            id="mapbox/streets-v11"
                            tileSize={512}
                            zoomOffset={-1}
                        />
                        <MarkerClusterGroup key={filteredSchools.length}>
                            {filteredSchools &&
                                filteredSchools.map((drivingSchool) => {
                                    const { latitude, longitude, name } = drivingSchool;
                                    const position = [latitude, longitude];
                                    const id = `${latitude}${longitude}-${name}`;
                                    return (
                                        <Marker
                                            key={id}
                                            icon={getMarker()}
                                            position={position}
                                        >
                                            <Popup>
                                                <MarkerCard
                                                    drivingSchool={drivingSchool}
                                                />
                                            </Popup>
                                        </Marker>
                                    );
                                })}
                        </MarkerClusterGroup>
                        {currentLocation && (
                            <Marker
                                icon={searchedLocationMarker}
                                position={mapCenter}
                            >
                                <Popup>Current location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </Box>
            </Grid>
        </Grid>
    );
};

export default GasStationsMap;
