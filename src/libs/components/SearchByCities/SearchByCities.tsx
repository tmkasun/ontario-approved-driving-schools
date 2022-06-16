import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box } from '@mui/material';
import { cities } from '../../../data/cities';
import CitiesList from './CitiesList';

export default function Grouped() {
    const [selectedCity, setSelectedCity] = React.useState(null);


    return (
        <Box display="flex" flexDirection='column'>
            <Box display="flex" width={1}>
                <Autocomplete
                    id="grouped-cities"
                    onChange={(event, value: any) => setSelectedCity(value)}
                    options={Object.entries(cities).map(
                        ([cityName, cityData]) => ({
                            cityName: cityName.split('#')[0],
                            ...cityData,
                        })
                    )}
                    groupBy={(option) => option.districtName}
                    getOptionLabel={(option) => option.cityName}
                    fullWidth
                    renderInput={(params) => (
                        <TextField {...params} label="Enter a city name" />
                    )}
                />
            </Box>

            <Box display="flex" width={1}>
                {selectedCity && <CitiesList selectedCity={selectedCity} />}
            </Box>
        </Box>
    );
}
