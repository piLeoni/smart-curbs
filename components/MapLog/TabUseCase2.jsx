import { useRef, useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
// import { setDatasetBusLine } from '../../store/slices/datasetBusLineSlice'
import { useTheme } from '@mui/material/styles';
import { DisplayValue, DisplayValueVertical } from '../DisplayValue';
import contents from '../../contents/index';
import MiniMap from "../MiniMap";
import { DataBlock } from '../DataBlock';
import Selector from '../Selector';
import { LinearLegend } from './Legend'

function TabUseCase2(props) {

    const theme = useTheme();
    const [currentCell, setCurrentCell] = useState(props.map.getSource('busLine')._data.features[0]);
    const [displayCategory, setDisplayCategory] = useState(contents.pages.realTimeCurbs.activeScore.fields[0])




    useEffect(() => {
        props.map.on('mousemove', highlightCell);
        setCurrentCell(props.map.getSource('useCase2')._data.features[0])
        setLayerVisibility(true);
        props.setLoadingData(false);

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
        props.setLegend(<LinearLegend
            min={0}
            max={displayCategory.max.toFixed(2)}
            colors={
                [theme.palette.success.main,
                theme.palette.secondary.main]
            } />)

    }, [displayCategory])

    useEffect(() => {
        props.map.getSource("useCase2Highlight").setData(currentCell);


    }, [currentCell])

    function handleChange(e) {

        setDisplayCategory(e);
    }

    function highlightCell(e) {
        const features = props.map.queryRenderedFeatures(e.point, { layers: ['useCase2'] });
        // this.emit('hoveredFeature', features[0])
        if (features.length > 0) {
            setCurrentCell(features[0]);
            props.map.getCanvas().style.cursor = 'none';
        } else {
            props.map.getCanvas().style.cursor = 'grab';
        }
    }

    function highlightCategory() {
        // fill-extrusion-color
        props.map.setPaintProperty("useCase2", 'fill-extrusion-height', {
            property: displayCategory.key,
            stops: [
                [0, 0],
                [displayCategory.max, 200]
            ]
        });
        props.map.setPaintProperty("useCase2", 'fill-extrusion-color', {
            property: displayCategory.key,
            stops: [
                [0, theme.palette.success.main],
                [displayCategory.max, theme.palette.secondary.main]
            ]
        });
    }


    function setLayerVisibility(input) {

        props.map.setLayoutProperty(
            'useCase2',
            'visibility',
            input ? 'visible' : 'none'
        );
        props.map.setLayoutProperty(
            'useCase2Highlight',
            'visibility',
            input ? 'visible' : 'none'
        );

    }

    return (
        <>
            <Selector
                selectedOption={displayCategory}
                changeHandler={(e) => handleChange(e.target.value)}
                options={contents.pages.realTimeCurbs.activeScore.fields}
                label="category"

            />

            <Box sx={{ mt: 2, typography: 'body1', color: 'primary.main' }}>{displayCategory.intro}</Box>

            <Divider sx={{ my: 2 }} />

            {
                currentCell &&
                <>
                    <MiniMap value={currentCell} sx={{ my: 2 }} />

                    <DataBlock label='cell data' values={[
                        { label: 'residential', value: currentCell.properties.residential?.toFixed(2).toString() },
                        { label: 'transport', value: currentCell.properties.transport?.toFixed(2).toString() },
                        { label: 'recreation', value: currentCell.properties.recreation?.toFixed(2).toString() },
                        { label: 'retail', value: currentCell.properties.retail?.toFixed(2).toString() }
                    ]} />
                </>
            }


        </>);
}

export default TabUseCase2;