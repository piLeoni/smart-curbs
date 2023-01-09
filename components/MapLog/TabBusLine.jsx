import { useRef, useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
// import { setDatasetBusLine } from '../../store/slices/datasetBusLineSlice'
import { useTheme } from '@mui/material/styles';
import { DisplayValue, DisplayValueVertical } from '../DisplayValue';
import contents from '../../contents/index';
import Selector from '../Selector';
import MiniMap from "../MiniMap";
import { DataBlock } from '../DataBlock';
import { LinearLegend } from './Legend'

function TabBusStops(props) {

    const theme = useTheme();
    const [currentCell, setCurrentCell] = useState(props.map.getSource('busLine')._data.features[0]);
    const [displayCategory, setDisplayCategory] = useState(contents.pages.realTimeCurbs.lineGrid.fields[0])

    useEffect(() => {
        props.map.on('mousemove', highlightCell);
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
            props.map.off('mousemove', highlightCell);
            setLayerVisibility(false);
        }
    }, [])

    useEffect(() => {
        highlightCategory();

        props.setLegend(<LinearLegend
            min={0}
            max={displayCategory.max.toFixed(2)}
            labelMin="LOW"
            labelMax="HIGH"
            colors={
                [theme.palette.success.light,
                theme.palette.warning.dark,
                theme.palette.secondary.main]
            } />
        )
    }, [displayCategory])

    useEffect(() => {
        props.map.getSource("busLineHighlight").setData(currentCell);
    }, [currentCell])

    function handleChange(e) {
        setDisplayCategory(e);
    }

    function highlightCategory() {
        props.map.setPaintProperty("busLine", 'fill-color', {
            property: displayCategory.key,
            stops: [
                // [0, 'white'],
                // [displayCategory.max, theme.palette.secondary.main]
                [0, theme.palette.success.light],
                [(displayCategory.max * 0.5), theme.palette.warning.dark],
                [displayCategory.max, theme.palette.secondary.main]

            ]
        });
    }



    function highlightCell(e) {
        const features = props.map.queryRenderedFeatures(e.point, { layers: ['busLine'] });
        // this.emit('hoveredFeature', features[0])
        if (features.length > 0) {
            setCurrentCell(features[0]);
            props.map.getCanvas().style.cursor = 'none';
        } else {
            props.map.getCanvas().style.cursor = 'grab';
        }
    }


    function setLayerVisibility(input) {

        props.map.setLayoutProperty(
            'busLine',
            'visibility',
            input ? 'visible' : 'none'
        );
        props.map.setLayoutProperty(
            'busLineHighlight',
            'visibility',
            input ? 'visible' : 'none'
        );


    }



    return (
        <>
            <Selector
                selectedOption={displayCategory}
                changeHandler={(e) => handleChange(e.target.value)}
                options={contents.pages.realTimeCurbs.lineGrid.fields}
                label="category"

            />
            <br />

            <Box sx={{ mt: 2, typography: 'body1', color: 'primary.main' }}>{contents.pages.realTimeCurbs.lineGrid.intro}</Box>
            <Divider sx={{ my: 2 }} />



            <MiniMap value={currentCell} sx={{ my: 2 }} />

            <DisplayValueVertical label="samples in the cell" value={currentCell?.properties.number_obs} />
            {/* < Divider sx={{ my: 1 }} />

            {currentCell && <DataBlock values={[
                { label: "count alt", value: currentCell.properties.count_alt.toFixed(4) },
                { label: "people walking", value: currentCell.properties.count_walk_stand.toFixed(4) },
                { label: "people quequig", value: currentCell.properties.count_queuing.toFixed(4) },
                { label: "people sitting", value: currentCell.properties.count_sit.toFixed(4) },
                { label: "cars", value: currentCell.properties.count_car.toFixed(4) },
                { label: "vans", value: currentCell.properties.count_van.toFixed(4) },
                { label: "buses", value: currentCell.properties.count_bus.toFixed(4) },
                { label: "motorcycles", value: currentCell.properties.count_motorcycle.toFixed(4) },
                { label: "childrens", value: currentCell.properties.count_children.toFixed(4) },
                { label: "skateboarders", value: currentCell.properties.count_skateboarder.toFixed(4) },
                { label: "trucks", value: currentCell.properties.count_truck.toFixed(4) },
                { label: "scooters", value: currentCell.properties.count_riding_scooter.toFixed(4) }
            ]} />} */}


        </>);
}

export default TabBusStops;