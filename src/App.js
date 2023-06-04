import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Papa from "papaparse";
import sampleData from "./tests/data";
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import DataController from "./libs/components/DataController"
import LastUpdated from "./libs/components/LastUpdated"

import LineChart from "./libs/LineChart";
import PieChart from "./libs/PieChart";
import BarChart from "./libs/BarChart";
import Base from "./libs/Base";
import "./styles.css";
import GasStationsMap from './libs/GasStationsMap'
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

const App = () => {

    return (
        <Base>
            <GasStationsMap />
        </Base >
    );
};

export default App;