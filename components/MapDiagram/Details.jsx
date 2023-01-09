import { Box, Stack, ListSubheader, MenuItem, Button, IconButton } from "@mui/material";
import style from "../../styles/MapDiagram.module.scss";
import MiniMap from "../MiniMap";
import FeaturesDetails from "./FeatureDetails";
import Selector from "../Selector"
import { useEffect, useState } from "react";
import { DataBlock, DataBlockSmall } from '../DataBlock'
function DetailsDrawer(props) {

    const [currentCell, setCurrentCell] = useState(props.map.getSource('gridSource')?._data?.features[0]);

    useEffect(() => {
        props.map.on('mousemove', highlightCell)
        return () => {
            props.map.off('mousemove', highlightCell)
        }
    }, [])

    useEffect(() => {

        if (currentCell)
            props.map.getSource('gridCursor').setData(currentCell)
    }, [currentCell])

    function highlightCell(e) {

        const features = props.map.queryRenderedFeatures(e.point, { layers: ['gridLayer'] });
        // this.emit('hoveredFeature', features[0])
        if (features.length > 0) {

            setCurrentCell(features[0]);

            props.map.getCanvas().style.cursor = 'none';
        } else {
            props.map.getCanvas().style.cursor = 'grab';
        }
    }

    return (
        <>
            <Stack direction="column" spacing={2}>
                <Selector
                    selectedOption={props.displayCategory}
                    changeHandler={(e) => props.setDisplayCategory(e.target.value)}
                    // options={props.categories?.categories[0]?.values}
                    label="category"
                    items={
                        props.categories.categories.map(category => {
                            const list = [];
                            list.push(
                                <ListSubheader key={`sb-header-${category.key}`}
                                    sx={theme => {
                                        return {
                                            typography: 'subtitle',
                                            textTransform: 'uppercase',
                                            color: theme.palette.secondary.main,
                                        }
                                    }}
                                >
                                    {category.label}
                                </ListSubheader>)
                            category.values.forEach(option => {
                                list.push(<MenuItem value={option} key={`category-${option.key}`}>{option.label}</MenuItem>)
                            })
                            return list;
                        })
                    }
                />

                <Box sx={{ typography: 'body2', fontWeight: 'light' }}>{props.displayCategory?.intro}</Box>
                <MiniMap value={currentCell} />



                {/*

                "grid_area": 10002.212, 
                "curb_lengt": 281.615, 
                "curb_parki": 0.655, 
                "builtarea": 2513.232, 
                "height_ave": 9.33673469387755, 
                "road_area": 962.236, 
                "terrace_ar": 16.8131826390763, "
                tree_count": 0, "tree": 0.02987925, 
                "road": 0.271187875, 
                "sky": 0.1489181875, 
                "sidewalk": 0.0440686875, 
                "poi_var": 0, "poi_count": 0, "
                bikelane_l": 143.382, "
                bus_st_cou": 0, 
                "bike_st_co": 0, "
                ward_clust": 1, 
                "cluster": 3, "activity_a": 0, "
                connected_nodes": 0, "urban_hotspots": 1, "calm_street": 0, "open_corridor": 0, "green_zones": 0, "multimodal_hubs": 0 } */}



                {/* {JSON.stringify(currentCell.properties, null, 2)} */}
                {currentCell &&
                    <DataBlock label="cell data" sm={6} values={[


                        { label: 'curb length', value: currentCell.properties.curb_lengt.toFixed(2) },
                        { label: 'ratio of parking to curb', value: currentCell.properties.curb_parki.toFixed(2) },
                        { label: 'build-up area', value: currentCell.properties.builtarea.toFixed(2) },
                        { label: 'average building height', value: currentCell.properties.height_ave.toFixed(2) },
                        { label: 'road area', value: currentCell.properties.road_area.toFixed(2) },
                        { label: 'terrace area', value: currentCell.properties.terrace_ar.toFixed(2) },
                        { label: 'tree count', value: currentCell.properties.tree_count.toFixed(2) },
                        { label: 'bikeline length', value: currentCell.properties.bikelane_l.toFixed(2) },
                        { label: 'bus station count', value: currentCell.properties.bus_st_cou.toFixed(2) },
                        { label: 'bike station count', value: currentCell.properties.bike_st_co.toFixed(2) },
                        { label: 'road percentage', value: currentCell.properties.road.toFixed(2) },
                        { label: 'sky percentage', value: currentCell.properties.sky.toFixed(2) },
                        { label: 'sidewalk percentage', value: currentCell.properties.sidewalk.toFixed(2) },
                        { label: 'poi type variance', value: currentCell.properties.poi_var.toFixed(2) },
                        

                    ]} />}
            </Stack>
        </>


    );
}

export default DetailsDrawer;