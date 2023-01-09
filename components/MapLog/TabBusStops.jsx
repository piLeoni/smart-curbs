import { useRef, useState, useEffect } from 'react';
import { Button, Box, Stack, Grid, Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
// import { setDatasetBusLine } from '../../store/slices/datasetBusLineSlice'
import { useTheme } from '@mui/material/styles';
import { DisplayValue, DisplayValueVertical } from '../DisplayValue';
import contents from '../../contents/index';
import MiniMap from "../MiniMap";
import { DataBlock, DataBlockSmall } from '../DataBlock';
import Selector from '../Selector';
import * as turf from "@turf/turf";
function TabSamplesAnimation(props) {

    const theme = useTheme();
    const [currentPoint, setCurrentPoint] = useState(pointToCircle(props.map.getSource('pointsAroundStop')._data.features[0]));
    const [displayStop, setDisplayStop] = useState(contents.pages.realTimeCurbs.busStops.stops[0])

    //Châtelet - Quai de Gesvres
    //  Saint-André Des Arts
    //  Sèvres - Babylone
    //  Hôpital Des Enfants Malades
    //  Péclet
    //  Place du Docteur Hayem - Radio France

    useEffect(() => {
        props.setLegend(null);

        props.map.on('mousemove', highlightCell);
        setLayerVisibility(true);
        return () => {
            props.map.off('mousemove', highlightCell);

            setLayerVisibility(false);
        }
    }, []);

    useEffect(() => {

        props.map.easeTo({
            center: displayStop.coordinates,
            zoom: 18,
            bearing: 0 ,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    }, [displayStop])

    useEffect(() => {
        props.map.getSource('selectedPointStop').setData(currentPoint);
    }, [currentPoint])

    function handleChange(e) {
        setDisplayStop(e);
    }

    function highlightCell(e) {
        const features = props.map.queryRenderedFeatures(e.point, { layers: ['pointsAroundStop'] });
        if (features.length > 0) {
            if (features[0].geometry.type === 'Point')
                setCurrentPoint(pointToCircle(features[0]));
            props.map.getCanvas().style.cursor = 'none';
        } else {
            props.map.getCanvas().style.cursor = 'grab';
        }
    }

    function pointToCircle(point) {
        if (point)
            return turf.ellipse(point.geometry.coordinates, 0.001, 0.001, { properties: point.properties })
    }

    function setLayerVisibility(input) {
        props.map.setLayoutProperty(
            'selectedPointStop',
            'visibility',
            input ? 'visible' : 'none'
        )
        props.map.setLayoutProperty(
            'busStops',
            'visibility',
            input ? 'visible' : 'none'
        )
        props.map.setLayoutProperty(
            'pointsAroundStop',
            'visibility',
            input ? 'visible' : 'none'
        )


    }

    return (
        <>
            <Selector
                sx={{ width: `40ch` }}
                selectedOption={displayStop}
                changeHandler={(e) => handleChange(e.target.value)}
                options={contents.pages.realTimeCurbs.busStops.stops}
                label="bus stop"

            />

            <Box sx={{ mt: 2, typography: 'body1', color: 'primary.main' }}>{contents.pages.realTimeCurbs.busStops.intro}</Box>
            <Divider sx={{ my: 2 }} />
            {
                currentPoint &&
                <>
                    <MiniMap padding={75} value={currentPoint} sx={{ my: 2 }} />

                    <DataBlockSmall label='bus data' values={[
                        { label: 'lat', value: currentPoint.properties.lat?.toFixed(5).toString() },
                        { label: 'lon', value: currentPoint.properties.lon?.toFixed(5).toString() },
                        { label: 'peak', value: currentPoint.properties.peak.split('_')[0] },
                        { label: 'speed', value: currentPoint.properties.speed?.toFixed(2).toString(), suffix: 'km/h' }

                    ]} />
                    <DataBlock label='sample data' values={[
                        { label: 'cars', value: currentPoint.properties.countCar?.toFixed(2).toString() },
                        { label: 'motorcycles', value: currentPoint.properties.countMotorcycle?.toFixed(2).toString() },
                        { label: 'vehicles', value: currentPoint.properties.vehicle_count?.toFixed(2).toString() },
                        { label: 'active', value: currentPoint.properties.active_count?.toFixed(2).toString() }

                    ]} />
                </>
            }

        </>);
}

export default TabSamplesAnimation;