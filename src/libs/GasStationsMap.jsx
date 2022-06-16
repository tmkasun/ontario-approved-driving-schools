import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import LinearProgress from '@mui/material/LinearProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import MarkerClusterGroup from 'react-leaflet-markercluster';

import AreaSelect from './components/AreaSelect';
import useGasStations from './hooks/useGasStations';
import MarkerCard from './components/MarkerCard';
import SearchByCities from './components/SearchByCities/SearchByCities';

import './css/map.css';
import 'leaflet/dist/leaflet.css';

const getMarker = (gasStation) => {
    const {
        id,
        province,
        district,
        city,
        lane,
        longitude,
        latitude,
        phoneNumber,
        shedName,
        fuelAvailabilityDTO,
        instituteId,
        p92Availablity,
        p95Availablity,
        davailablity,
        sdavailablity,
        ikavailablity,
        kavailablity,
        p92Capacity,
        p95Capacity,
        dcapacity,
        sdcapacity,
        ikcapacity,
        kcapacity,
        shedCode,
    } = gasStation;
    const isPetrolAvailable = davailablity || sdavailablity;
    const isDieselAvailable = p92Availablity || p95Availablity;

    let pinClass = 'pin-oneavailable';
    let pinEffectClass = 'pin-oneavailable-effect';

    if (!(isPetrolAvailable || isDieselAvailable)) {
        pinClass = 'pin-notavailable';
        pinEffectClass = 'pin-notavailable-effect';
    } else if (isPetrolAvailable && isDieselAvailable) {
        pinClass = 'pin';
        pinEffectClass = 'pin-effect';
    }
    return new L.divIcon({
        html: `<div class="${pinClass}"></div> <div class="${pinEffectClass}"></div>`,
    });
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

const GasStationsMap = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [gasStations, error, isLoading] = useGasStations();
    const [showDose1, setShowDose1] = useState(true);
    const [showDose2, setShowDose2] = useState(true);
    const [haveVaccine, setHaveVaccine] = useState(true);
    const reset = () => {
        setShowDose1(true);
        setCurrentLocation(null);
        setShowDose2(true);
        setHaveVaccine(true);
    };
    const mapCenter = currentLocation
        ? [currentLocation.coords.latitude, currentLocation.coords.longitude]
        : [7.79, 80.91];
    const zoom = currentLocation ? 13 : 8;
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                xs={12}
                sm={3}
                item
            >
                <Box my={4} />
                <Grid item xs={12}>
                    <Typography variant="h4" component="h4" gutterBottom>
                        Search
                    </Typography>
                    {isLoading && <LinearProgress />}
                </Grid>
                <Grid item xs={12} container spacing={3}>
                    <AreaSelect onLocationChange={setCurrentLocation} />
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    item
                    xs={12}
                >
                    <Grid item xs={12} sm={6}>
                        <Box my={3}>
                            <Button
                                style={{ color: '#a20000' }}
                                onClick={reset}
                            >
                                RESET
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Box
                            borderRadius={3}
                            border={1}
                            color="success.main"
                            textAlign="center"
                            display="block"
                            mr={7}
                        >
                            <Typography variant="subtitle2">
                                <Box color="text.secondary" display="inline">
                                    {' '}
                                    Found{' '}
                                </Box>
                                {gasStations && gasStations.length}
                            </Typography>
                        </Box>
                    </Grid>

                    <Typography variant="subtitle2">
                        Search By Cities
                    </Typography>
                    <Grid xs={12} item>
                        <SearchByCities />
                    </Grid>
                </Grid>
            </Grid>

            <Grid xs={12} sm={9} item>
                <Box border={0} boxShadow={3}>
                    <MapContainer
                        zoomControl
                        style={{ overflow: 'hidden', height: '90vh' }}
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
                        <MarkerClusterGroup>
                            {gasStations &&
                                gasStations.map((gasStation) => {
                                    const {
                                        id,
                                        province,
                                        district,
                                        city,
                                        lane,
                                        longitude,
                                        latitude,
                                        phoneNumber,
                                        shedName,
                                        fuelAvailabilityDTO,
                                        instituteId,
                                        p92Availablity,
                                        p95Availablity,
                                        davailablity,
                                        sdavailablity,
                                        ikavailablity,
                                        kavailablity,
                                        p92Capacity,
                                        p95Capacity,
                                        dcapacity,
                                        sdcapacity,
                                        ikcapacity,
                                        kcapacity,
                                        shedCode,
                                    } = gasStation;
                                    const position = [longitude, latitude];
                                    return (
                                        <Marker
                                            key={id}
                                            icon={getMarker(gasStation)}
                                            position={position}
                                        >
                                            <Popup>
                                                <MarkerCard
                                                    gasStation={gasStation}
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
