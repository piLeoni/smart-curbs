import React, { useRef, useEffect, useState } from 'react';
import { Box, Button, Backdrop, CircularProgress, FormControl, InputLabel, Select, MenuItem, ListSubheader, Paper, Stack, SwipeableDrawer, Drawer } from "@mui/material";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import style from "../../styles/MapDiagram.module.scss";
import 'mapbox-gl/dist/mapbox-gl.css';
import GenerateGrid from "./GenerateGrid";
import { useTheme } from '@mui/material/styles';
import Selector from "../Selector"
import FeaturesDetails from "./FeatureDetails"
import MiniMap from "../MiniMap";
import TranslucentCard from "../TranslucentCard"
import SideDrawer from "../SideDrawer"
import Details from "./Details"

mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vjb25kc2t5IiwiYSI6ImNpdm1pMnNkYjAwYW4ydHA0cG85ZjdmMzAifQ.jtuHwZ4DeUronSqJ1FsaJQ';

import { useSelector, useDispatch } from 'react-redux'
import { setDatasetGrid } from '../../store/slices/datasetGridSlice'




function MapDiagram(props) {

    const samplesData = useSelector((state) => state.datasetGrid.dataset)
    const dispatch = useDispatch()
    const [dataset, setDataset] = useState(0)
    const [testVal, setTestVal] = useState(0)
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(2.352);
    const [lat, setLat] = useState(48.8566);
    const [zoom, setZoom] = useState(12);
    const [bearing, setBearing] = useState(0);
    const [pitch, setPitch] = useState(60);
    const [highlightFeature, setHighlightFeature] = useState(null);
    const [selectedFeature, setSelectedFeature] = useState(null);
    const [showDrawer, setShowDrawer] = useState(true);

    const [displayCategory, setDisplayCategory] = useState(props.categories?.categories[0]?.values[0]);

    useEffect(() => {
        datasetGrid?.current?.highlightCategory({ category: displayCategory })
        // datasetGrid.
    }, [displayCategory]);


    // const samplesData = useRef(null);

    const [showDataset, setShowDataset] = useState(true);

    const datasetGrid = useRef(null);

    useEffect(() => { if (datasetGrid.current) datasetGrid.current.setVisibility(showDataset) }, [showDataset])
    useEffect(() => {
        if (samplesData && map.current) {
            initializeGrid();
        }
    }, [samplesData, map.current]
    )


    // useEffect(() => { if (datasetGrid.current) datasetGrid.current.setVisibility(showDataset) }, [showDataset])
    const [loadingData, setLoadingData] = useState(true);

    const theme = useTheme();

    function initializeGrid() {

        datasetGrid.current = new GenerateGrid({
            map: map.current,
            colorMin: "white",
            colorMax: theme.palette.secondary.main,
            theme: theme,
            highlightCallback: setHighlightFeature,
            selectCallback: setSelectedFeature

        });

        datasetGrid.current.setData(samplesData);
        datasetGrid.current.highlightCategory({ category: displayCategory })
        setDataset(samplesData)

    }
    useEffect(() => {

        if (!map.current) {
            map.current = new mapboxgl.Map({
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
            });
            map.current.scrollZoom.disable();


            map.current.on('load', () => {
                map.current.setFog({
                    'range': [0, 5],
                    'color': '#ffffff',
                    'horizon-blend': 0.1
                });
                if (!samplesData) {
                    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/dataset/grid_scores_filtered_updated.geojson`)
                        .then((res) => res.json())
                        .then((data) => {
                            // samplesData.current = data;
                            dispatch(setDatasetGrid(data))
                            // initializeGrid();
                            // datasetGrid.current.setHighlightCallback(sethighlightFeature)
                            // datasetGrid.current.on('hoveredFeature',  sethighlightFeature);
                            setLoadingData(false);
                        })
                }
                else {
                    // initializeGrid();
                    setLoadingData(false);

                }
            })
            return () => {
                if (map.current) {
                    map.current.remove();
                    // datasetGrid.current.removeEventListener('hoveredFeature', sethighlightFeature);
                    datasetGrid.current = null;
                    // samplesData = null;

                }

            }

        }


    }, []);




    // <Paper className={style.DetailsBox} sx={{ p: 2 }}>

    return (
        <Box style={{ position: 'relative', overflow: 'hidden' }} >
            {/* {showDrawer ? 'true' : 'false'}
            <Button onClick={() => setShowDrawer(!showDrawer)}>show</Button> */}

            {
                !loadingData &&

                <SideDrawer width={{ xs: '85vw', md: '45ch', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ position: 'relative', height: '100%', pt: 1, overflowY: 'scroll' }} >

                        <Details categories={props.categories}
                            map={map.current}
                            displayCategory={displayCategory}
                            // highlightFeature={highlightFeature}
                            // selectedFeature={selectedFeature}
                            setDisplayCategory={setDisplayCategory} />
                    </Box>
                </SideDrawer>


            }


            <div ref={mapContainer} className={style.MapContainer} style={{ minHeight: '600px', height: '100vh' }} />


            <Backdrop
                sx={{
                    color: theme.palette.primary.light, zIndex: (theme) => theme.zIndex.drawer + 1, position: "absolute", zIndex: '10 !important'
                }}
                open={loadingData}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
        </Box >

    );
}

export default MapDiagram;