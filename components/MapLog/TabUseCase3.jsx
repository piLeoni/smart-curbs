import { useRef, useState, useEffect } from 'react';
import { Box, Stack, ListSubheader, MenuItem, Button, IconButton, ToggleButton, ToggleButtonGroup, Divider } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
// import { setDatasetBusLine } from '../../store/slices/datasetBusLineSlice'
import { useTheme } from '@mui/material/styles';
import { DisplayValue, DisplayValueVertical } from '../DisplayValue';
import contents from '../../contents/index';
import Selector from '../Selector';
import { CircleSharp } from '@mui/icons-material';
import * as turf from "@turf/turf";
import MiniMap from "../MiniMap";
import { DataBlock } from '../DataBlock';
import { LinearLegend } from './Legend'

function TabUseCase3(props) {

    const theme = useTheme();

    const [displayCategory, setDisplayCategory] = useState(contents.pages.realTimeCurbs.peaks.categories[0]);
    const [currentCell, setCurrentCell] = useState(null);

    const [dayTime, setDayTime] = useState("am");



    useEffect(() => {

        setLayerVisibility(true);
        props.map.on('mousemove', highlightCell);

        props.map.easeTo({
            coordinates: [2.3180, 48.8608],
            zoom: 12.90,
            bearing: -80.80,
            pitch: 64.50,

            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        return () => {
            setLayerVisibility(false);
            props.map.off('mousemove', highlightCell);

        }
    }, [])

    useEffect(() => {

        highlightCategory();


        props.setLegend(
            <LinearLegend
                min={0}
                max={displayCategory.max.toFixed(2)}
                colors={
                    [theme.palette.success.main,
                    theme.palette.secondary.main]
                } />
        )

    }, [displayCategory, dayTime])



    useEffect(() => {

        props.map.getSource("useCase3Highlight").setData(currentCell);
    }, [currentCell])



    function highlightCategory() {

        const source = props.map.getSource(dayTime === 'am' ? 'useCase3Morning' : 'useCase3Afternoon')._data;
        const data = source.features.map(f => ({
            properties: f.properties,
            radius: 0.2 / displayCategory.max * f.properties[displayCategory.key],
            center: f.geometry.coordinates,

        }))
        const output = { type: 'FeatureCollection', features: data.map(d => turf.ellipse(d.center, d.radius, d.radius, { properties: { ...d.properties, radius: d.radius } })) }
        if (!currentCell) setCurrentCell(output.features[0]);
        props.map.getSource('useCase3').setData(output);


    }

    function highlightCell(e) {
        const features = props.map.queryRenderedFeatures(e.point, { layers: ['useCase3'] });
        // this.emit('hoveredFeature', features[0])
        if (features.length > 0) {
            setCurrentCell(features[0]);
            props.map.getCanvas().style.cursor = 'none';
        } else {
            props.map.getCanvas().style.cursor = 'grab';
        }
    }

    function changeDayTime(e) {
        setDayTime(e.target.value)
    }
    function setLayerVisibility(input) {

        props.map.setLayoutProperty(
            'useCase3Highlight',
            'visibility',
            input ? 'visible' : 'none'
        );
        props.map.setLayoutProperty(
            'useCase3',
            'visibility',
            input ? 'visible' : 'none'
        );

    }

    return (
        <>

            <Stack direction="row" spacing={2}>

                <Selector
                    selectedOption={displayCategory}
                    changeHandler={(e) => setDisplayCategory(e.target.value)}
                    // sx={{ width: `${Math.max(...contents.pages.peaks.categories.map(e => e.label.length)) + 2}ch` }}
                    options={contents.pages.realTimeCurbs.peaks.categories}
                    label="category"

                />
                <ToggleButtonGroup value={dayTime} size='small' onChange={changeDayTime} exclusive
                >
                    <ToggleButton value="am" >
                        am
                    </ToggleButton>
                    <ToggleButton value="pm">
                        pm
                    </ToggleButton>
                </ToggleButtonGroup>
            </Stack>
            {/* <Box sx={{ mt: 2, typography: 'body1', color: 'primary.main' }}>{displayCategory.intro}</Box> */}
            <Divider sx={{ my: 2 }} />

            {currentCell &&
                <>
                    <MiniMap value={currentCell} />
                    <Box sx={{ typography: 'body1', color: 'secondary.main', textTransform: 'uppercase', mt: 3 }}>selected curb</Box>
                    <Box sx={{ typography: 'h6', color: 'secondary.main' }}>{currentCell.properties.stopName}</Box>
                    <DataBlock label='curb data' values={[
                        { label: 'average speed', value: currentCell.properties.speed.toFixed(2).toString(), suffix: 'km/h' },
                        { label: 'veicle count', value: currentCell.properties.vehicle_count.toFixed(2).toString() },
                        { label: 'active count', value: currentCell.properties.active_count.toFixed(2).toString() }
                    ]} />
                </>

            }


        </>);
}

export default TabUseCase3;