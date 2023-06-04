import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography } from '@mui/material';
import debounce from 'lodash.debounce';

import CitiesList from './CitiesList';

// onSearch
function Grouped({ setCurrentLocation, approvedSchools, onSearch, setIsLoading }: any) {
    const [selectedCity, setSelectedCity] = React.useState(null);

    const updateList = React.useMemo(
        () =>
            debounce((inputValue: string) => {
                if (!inputValue || inputValue === '') {
                    onSearch(approvedSchools)
                } else {
                    const filteredSchools = approvedSchools.filter(({ name }: any) => name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()))
                    onSearch(filteredSchools)
                }
                setIsLoading(false);
            }, 500),
        [],
    );
    return (
        <Box bgcolor='white' display="flex" flexDirection="column">
            <Box display="flex" width={1}>
                <Autocomplete
                    id="grouped-cities"
                    freeSolo
                    size='small'
                    closeText=''
                    onChange={(event, selectedCity: any) => {
                        if (!selectedCity || typeof selectedCity === 'string') {
                            return;
                        }
                        const {
                            latitude,
                            longitude
                        } = selectedCity;
                        setCurrentLocation({
                            coords: { latitude, longitude },
                            zoom: 17,
                        });
                        // setSelectedCity(value)
                    }}
                    options={approvedSchools}
                    groupBy={(option: any) => option.city}
                    getOptionLabel={(option: any) => option.name}
                    fullWidth
                    onInputChange={(e, value) => {
                        updateList(value);
                        setIsLoading(true);
                    }}
                    renderInput={(params: any) =>
                        <TextField autoFocus {...params} label="Driving School Name" />
                    }
                />
            </Box>
            <Box display="flex" width={1}>
                {selectedCity && (
                    <CitiesList
                        setCurrentLocation={setCurrentLocation}
                        selectedCity={selectedCity}
                    />
                )}
            </Box>
        </Box>
    );
}

export default React.memo(Grouped)