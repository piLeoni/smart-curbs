import { useRef, useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { setDatasetSamples } from '../../store/slices/datasetSamplesSlice'
import GenerateSamples from "./GenerateSamples"
import { useTheme } from '@mui/material/styles';
import { DisplayValue, DisplayValueVertical } from '../DisplayValue';
import { DataBlock, DataBlockSmall } from '../DataBlock';

function TabSamplesAnimation(props) {
    const samplesData = useSelector((state) => state.datasetSamples.dataset)
    const dispatch = useDispatch()
    const map = useRef(null);
    const mapAnimator = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [value, setValue] = useState(1);
    const animationFrameID = useRef(null);
    const [currentSample, setCurrentSample] = useState(null);
    const theme = useTheme();

    const lastSamplesUpdate = useRef(0);
    const samplesUpdateInterval = 1000 / 20;


    useEffect(() => {
        if (playing) {
            animationFrameID.current = requestAnimationFrame(animateMap);
            setLayerVisibility(true);
        }
        else {
            cancelAnimationFrame(animationFrameID.current);
        }
    }, [playing]);

    useEffect(() => {

        props.setLegend(null);
        if (!map.current) map.current = props.map;
        console.log("loaded");
        mapAnimator.current = new GenerateSamples({ map: map.current, palette: theme.palette, dataset: map.current.getSource('busSamples')._data });
        setPlaying(true);

        props.map.easeTo({
            coordinates:[2.3320, 48.8703] ,
            zoom: 12.02,
            bearing: 0 ,
            pitch: 56.00,
                
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
        
        return () => {
            console.log("cancel animation frame")
            setLayerVisibility(false);
            animationFrameID.current ? cancelAnimationFrame(animationFrameID.current) : null;
        }
    }, []);

    function setLayerVisibility(input) {

        const layer = map?.current?.getLayer('busLiveTrace');
        if (layer) {
            map.current.setLayoutProperty(
                'busLiveTrace',
                'visibility',
                input ? 'visible' : 'none'
            );
        }
    }




    function animateMap() {
        mapAnimator.current.updateTrace({ increment: 2, buffer: 100 }).drawTrace();
        if (Date.now() - lastSamplesUpdate.current > samplesUpdateInterval) {
            setCurrentSample(mapAnimator.current.getCurrentSample());
            lastSamplesUpdate.current = Date.now();
        }
        animationFrameID.current = requestAnimationFrame(animateMap);
    }

    function displayTime(input) {
        const date = new Date(input);
        if (input) {
            const hour = Intl.DateTimeFormat("en-GB", {
                hour: "numeric",
                minute: "numeric",
                timeZone: "Europe/Paris",
            }).format(date);
            return `${date.toDateString()} ${hour}`
        }
        else return null;
        // return date.toLocaleDateString();
    }
    const gridAlign = { display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', pt: 1.5, width: '500px' };
    const colsMD = 4;
    const colsXS = 6;


    function Cell(props) {
        return (<Grid item xs={props.xs || 6} sm={props.sm || 4} sx={{ ...gridAlign }}>{props.children}</Grid>)
    }

    function bearing(input) {
        if (input < 0) return 360 - (180 - input)
        else return input;
    }
    return (
        <>
            {currentSample && <>
                <Box sx={{ typography: 'h6', color: 'secondary.main' }}>{displayTime(currentSample?.properties?.sampleTime)}</Box>
                < Divider sx={{ my: 1 }} />
                <DisplayValueVertical label="samples" value={currentSample?.properties?.samples?.index} sx={{ mb: 1 }} />


                <DataBlockSmall label='bus data' values={[
                    { label: 'lat', value: currentSample?.geometry?.coordinates[0].toFixed(5).toString().padStart(8, '0') },
                    { label: 'lon', value: currentSample?.geometry?.coordinates[1].toFixed(5).toString().padStart(8, '0') },
                    { label: 'distance', value: currentSample?.properties?.totalDistance.toFixed(2).toString().padStart(5, '0') },
                    { label: 'head', value: parseInt(bearing(currentSample?.properties?.bearing)).toString().padStart(3, '0') },
                    { label: 'speed', value: parseInt(currentSample?.properties?.speed).toString().padStart(3, '0') },
                    { label: 'line', value: 79 },

                ]} />

                < Divider sx={{ my: 1 }} />
                {currentSample && <DataBlock label="Activities Detected" values={[
                    { label: "pedestrians", value: currentSample?.properties?.samples?.countWalkStand },
                    // { label: "childrens" , value: currentSample?.properties?.samples?.countChildren },
                    // { label: "queuing", value: currentSample?.properties?.samples?.countQueuing },
                    { label: "people sitting", value: currentSample?.properties?.samples?.countSit },
                    // { label: "skaters", value: currentSample?.properties?.samples?.countSkateboarder },
                    { label: "trucks", value: currentSample?.properties?.samples?.countTruck },
                    // { label: "scooters", value: currentSample?.properties?.samples?.countRidingScooter },
                    { label: "cars", value: currentSample?.properties?.samples?.countCar },
                    { label: "vans", value: currentSample?.properties?.samples?.countVan },
                    { label: "buses", value: currentSample?.properties?.samples?.countBus },
                    { label: "motorcycles", value: currentSample?.properties?.samples?.countMotorcycle },
                    { label: "bikes", value: currentSample?.properties?.samples?.countRidingBike + currentSample?.properties?.samples?.countSkateboarder}
                ]} />}

            </>}




        </>);
}

export default TabSamplesAnimation;