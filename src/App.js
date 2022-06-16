import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Papa from "papaparse";
import sampleData from "./tests/data";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import DataController from "./libs/components/DataController"
import LastUpdated from "./libs/components/LastUpdated"
import useLastCommit from "./libs/hooks/useLastCommit";

import LineChart from "./libs/LineChart";
import PieChart from "./libs/PieChart";
import BarChart from "./libs/BarChart";
import Base from "./libs/Base";
import "./styles.css";
import GasStationsMap from './libs/GasStationsMap'
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};



const SectionSeperator = () => (
    <Grid item sm={12}>
        <Box boxShadow={3} my={2}>
            <Divider />
        </Box>
    </Grid>
)
/**
 *
 * https://echarts.apache.org/examples/en/editor.html?c=pie-simple
 *
 * curl   -H "Accept: application/vnd.github.v3+json"   https://api.github.com/repos/nuuuwan/covid19/contents/?ref=data -o response.json
 *
 * testing
 *
 * curl   -H "Accept: application/json"   https://raw.githubusercontent.com/nuuuwan/covid19/data/covid19.epid.vaxs.20210129.json -o response.json
 *
 * http://www.epid.gov.lk/web/index.php?option=com_content&view=article&id=225&lang=en
 */

const App = () => {
    const [dataType, setDataType] = useState("total");
    const [lastXDays, setLastXDays] = useState(0);

    return (
        <Base
            setLastXDays={setLastXDays}
            lastXDays={lastXDays}
            isLoading={false}
            dataType={dataType}
            setDataType={setDataType}
        >
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
            >
                <Grid item sm={12}>
                    <GasStationsMap />
                </Grid>
            </Grid>
        </Base>
    );
};

export default App;