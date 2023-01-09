import React, { useRef, useEffect, useState, useContext } from 'react';
import { Box, Button, Backdrop, CircularProgress, Paper } from "@mui/material";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import style from "../../styles/MapLog.module.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import { useTheme } from '@mui/material/styles';
import SideDrawer from "../SideDrawer"
import TabSamplesAnimation from "./TabSamplesAnimation";
import TabBusLine from "./TabBusLine";
import TabBusStops from './TabBusStops';
import TabUseCase2 from './TabUseCase2';
import TabUseCase3 from './TabUseCase3';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import * as utils from "./utils.js"

// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';



mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vjb25kc2t5IiwiYSI6ImNpdm1pMnNkYjAwYW4ydHA0cG85ZjdmMzAifQ.jtuHwZ4DeUronSqJ1FsaJQ';



function MapLog() {

    const mapContainer = useRef(null);
    // const map = useRef(null);
    const [map, setMap] = useState(null);

    const [lng, setLng] = useState(2.352);
    const [lat, setLat] = useState(48.8566);
    const [zoom, setZoom] = useState(12);
    const [bearing, setBearing] = useState(0);
    const [pitch, setPitch] = useState(60);
    const [legend, setLegend] = useState(null);


    const [loadingData, setLoadingData] = useState(true);

    const theme = useTheme();

    const [tabValue, setTabValue] = useState('1');
    const [mapLoaded, setMapLoaded] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    useEffect(() => {

        if (map) {
            console.log("generated", map)
            // map.scrollZoom.disable();

            map.on('move', () => {
                setLng(map.getCenter().lng.toFixed(4));
                setLat(map.getCenter().lat.toFixed(4));
                setZoom(map.getZoom().toFixed(2));
                setBearing(map.getBearing().toFixed(2));
                setPitch(map.getPitch().toFixed(2));
            })

            map.on('load', () => {
                map.setFog({
                    'range': [0, 5],
                    'color': '#ffffff',
                    'horizon-blend': 0.1
                });

                utils.createLayers(map, theme);
                utils
                    .fetchAllSources([
                        { source: 'busLine', path: 'busLine_updated.geojson' },
                        { source: 'busSamples', path: 'baseDataset.geojson' },
                        { source: 'pointsAroundStop', path: 'points_around_stop.geojson' },
                        { source: 'busStops', path: 'busStops.geojson' },
                        { source: 'useCase2', path: 'useCase2_filtered.geojson' },
                        { source: 'useCase3Morning', path: 'useCase3_morning_peak.geojson' },
                        { source: 'useCase3Afternoon', path: 'useCase3_afternoon_peak.geojson' },

                    ])
                    .then(r => {
                        utils.feedData(r, map);
                        setMapLoaded(true);
                        setLoadingData(false);
                    })


            })
        }


    }, [map])

    useEffect(() => {
        // utils
        //     .fetchAllSources([{ source: 'busLine', path: 'busLine.geojson' }])
        //     .then(r => utils.feedData(r, map))

        if (!map) {
            setMap(new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/secondsky/ckzr41yvn001l14quoayg0r2o',
                center: [lng, lat],
                bearing: bearing,
                pitch: pitch,
                zoom: zoom,
                maxBounds: [
                    [1.9977190986229516, 48.7343704673078], // Southwest coordinates
                    [2.6257311401569154, 49.00963159052466] // Northeast coordinates
                ]
            }))

        }
        return () => {
            // if (animationFrameID.current) cancelAnimationFrame(animationFrameID.current)
            if (map?.current) {
                map.current.remove();
            }
        }


    }, []);





    return (
        <>
            <Box className={style.MapWrapper}   >

                <div ref={mapContainer} className={`${style.MapContainer}`} style={{ minHeight: '600px', height: '95vh' }} />
                {/* <Box sx={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                    coordinates:[{lng}, {lat}] ,<br />
                    zoom: {zoom}, <br />
                    bearing: {bearing} ,<br />
                    pitch: {pitch}, <br />

                </Box> */}
                <Box sx={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10 }}>
                   {legend}
                </Box>

                {
                    mapLoaded &&

                    <SideDrawer width={{ xs: '85vw', md: '60ch', display: 'flex', flexDirection: 'column' }}>
                        {/* <TabSamplesAnimation map={map} /> */}

                        <TabContext value={tabValue} sx={{ position: 'relative' }} >
                            <Box sx={{ height: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>

                                <Box sx={theme => (
                                    {

                                        borderBottom: 1,
                                        borderColor: 'divider',
                                        '& .MuiTabs-indicator': { backgroundColor: 'secondary.main' },
                                        '& .MuiTab-root.Mui-selected': { color: 'secondary.main' },
                                        '& .MuiTab-root': { color: 'secondary.main' }
                                    })
                                }>
                                    <TabList onChange={handleTabChange} aria-label="lab API tabs example" variant="scrollable"
                                    >
                                        <Tab label="samples" value="1" color='secondary.main' />
                                        <Tab label="route" value="2" color='secondary.main' />
                                        {/* <Tab label="bus stops" value="3" color='secondary.main' />
                                        <Tab label="potentials" value="4" color='secondary.main' /> */}
                                        <Tab label="peaks" value="5" color='secondary.main' />

                                    </TabList>
                                </Box>

                                <Box sx={{ position: 'relative', flexGrow: 1, overflowY: 'scroll' }} >
                                    <Box sx={{ position: 'relative', height: 'auto' }} >
                                        <TabPanel value="1">
                                            <TabSamplesAnimation map={map} setLoadingData={setLoadingData}  setLegend={setLegend}/>
                                        </TabPanel>
                                        <TabPanel value="2">
                                            <TabBusLine map={map} setLoadingData={setLoadingData} setLegend={setLegend}/>
                                        </TabPanel>
                                        {/* <TabPanel value="3">
                                            <TabBusStops map={map} setLoadingData={setLoadingData} setLegend={setLegend}/>
                                        </TabPanel>
                                        <TabPanel value="4">
                                            <TabUseCase2 map={map} setLoadingData={setLoadingData} setLegend={setLegend}/>
                                        </TabPanel> */}
                                        <TabPanel value="5">
                                            <TabUseCase3 map={map} setLoadingData={setLoadingData} setLegend={setLegend}/>
                                        </TabPanel>
                                    </Box>
                                </Box>
                            </Box>

                        </TabContext>



                    </SideDrawer>
                }


                <Backdrop
                    sx={{
                        color: theme.palette.primary.light, zIndex: (theme) => theme.zIndex.drawer + 1, position: "absolute", zIndex: '10 !important'
                    }}
                    open={loadingData}
                >
                    <CircularProgress color="secondary" />
                </Backdrop>
            </Box>
        </>

    );
}


export default MapLog;