import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Typography } from '@mui/material';
import approvedSchools from '../../../data/schools.json';
import CitiesList from './CitiesList';

const cleanUpRegex = /<abbr[^>]+?>([^$]+?)<\/abbr>/i

export default function Grouped({ setCurrentLocation }: any) {
    const [selectedCity, setSelectedCity] = React.useState(null);
    const [settypedName, setTypedName] = React.useState('');

    const cities = approvedSchools;
    return (
        <Box mx={1} display="flex" flexDirection="column">
            <Typography variant="subtitle2">Driving School Name</Typography>
            <Box display="flex" width={1}>
                <Autocomplete
                    id="grouped-cities"
                    onChange={(event, value: any) => setSelectedCity(value)}
                    options={cities.map(
                        ({ school: { content: name }, lat, long, city }) => {
                            let fixedName = name;
                            if (cleanUpRegex.test(name)) {
                                fixedName = name.replace(cleanUpRegex, '$1')
                            }
                            return ({
                                name: fixedName,
                                lat,
                                long,
                                city
                            })
                        }

                    )}
                    groupBy={(option) => option.city}
                    getOptionLabel={(option) => option.name}
                    fullWidth

                    renderInput={(params: any) => {
                        return (
                            <TextField onChange={(e) => {
                                setTypedName(e.target.value);
                                console.log(e.target.value)
                                if (params) {
                                    params?.inputProps?.onChange(e)
                                }
                            }} {...params} label="Driving School Name" />
                        )
                    }}
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
