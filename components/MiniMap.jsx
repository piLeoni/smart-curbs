import { useRef, useEffect } from 'react';
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Vjb25kc2t5IiwiYSI6ImNpdm1pMnNkYjAwYW4ydHA0cG85ZjdmMzAifQ.jtuHwZ4DeUronSqJ1FsaJQ';
import * as turf from "@turf/turf";

function MiniMap(props) {

    const theme = useTheme();
    const map = useRef(null);
    const mapContainer = useRef(null);
    const coordinates = useRef(null);


    useEffect(() => {
        if (!map.current) {

            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/secondsky/cl442bgs9003n14peob5ghipw',
                pitch: 1, // pitch in degrees
                bearing: 0, // bearing in degrees
                zoom: props.zoom || 10,
                center: [2.3522, 48.8566],
                interactive: false
            });


            map.current.on('load', () => {
                map.current.addSource('gridBox', {
                    type: 'geojson',
                    data: null
                });


                map.current.addLayer({
                    'id': 'gridBox',
                    'type': 'line',
                    'source': 'gridBox',
                    'layout': {},
                    'paint': {
                        'line-color': theme.palette.secondary.main,
                        'line-width': 3
                    }
                });
            })

        }
        return () => {
            if (map.current) {
                map.current.remove();
            }

        }
    }
        , []);

    useEffect(() => {
        if (props.value && map.current.getSource("gridBox")) {
            // turf
            const box = turf.bbox(props.value)
            map.current.getSource("gridBox").setData(props.value);
            map.current.fitBounds([
                [box[0], box[1]], // southwestern corner of the bounds
                [box[2], box[3]] // northeastern corner of the bounds
            ], { linear: true, padding: props.padding || 15 });
        }

    }, [props.value])
    return (
        <>
            <Box ref={mapContainer} className="" sx={{ ...props.sx, width: '100%', height: "200px" }} />
        </>);
}

export default MiniMap;