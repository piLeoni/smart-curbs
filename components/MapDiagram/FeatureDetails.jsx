import { Box, Stack } from "@mui/material";
// import Selector from "../Selector"
import { useRef, useState, useEffect } from 'react';

import {DisplayValue} from "../DisplayValue";


function DataValue(props) {
    return (
        <>
                <Stack direction='row' spacing={0.5} sx={{ typography: 'body2', color: 'primary.main', fontWeight: 'regular' }}>
                    <Box sx={{ fontWeight: 'regular', color: 'success.main', textTransform: 'uppercase' }}>
                        {props.label}
                    </Box>
                    <Box>{props.value?.toFixed(2)}</Box>
                </Stack>

        </>
    )
}
function FeatureDetails(props) {
    const [referenceData, setReferenceData] = useState(null);
    useEffect(() => {
        setReferenceData(props.selectedFeature || props.highlightFeature)
    }, [props.highlightFeature, props.selectedFeature])


    return (
        <Stack direction="column" spacing={0.1}>
            {/* {props.selectedFeature.properties.map(feature=>{

            })} */}

            {/* {key: 'curb_lengt', label: 'curb lengt', min: 0, max: 983, intro: standardIntro() },
            {key: 'curb_parki', label: 'curb parki', min: 0, max: 2, intro: standardIntro() },
            {key: 'builtarea', label: 'builtarea', min: 0, max: 7900, intro: standardIntro() },
            {key: 'height_ave', label: 'height ave', min: 0, max: 92, intro: standardIntro() },
            {key: 'road_area', label: 'road area', min: 0, max: 9967, intro: standardIntro() },
            {key: 'terrace_ar', label: 'terrace ar', min: 0, max: 969, intro: standardIntro() },
            {key: 'tree_count', label: 'tree count', min: 0, max: 415, intro: standardIntro() },
            {key: 'bikelane_l', label: 'bikelane l', min: 0, max: 819, intro: standardIntro() }, */}
            <Box sx={{ fontWeight: 'medium', thypography: 'h3', color:'secondary.dark' }}>Cell details:</Box>
            <DisplayValue label="grid area:" value={referenceData?.properties?.grid_area} />
            <DisplayValue label="built area:" value={referenceData?.properties?.builtarea} />
            <DisplayValue label="road area:" value={referenceData?.properties?.road_area} />
            <DisplayValue label="terrace area:" value={referenceData?.properties?.terrace_ar} />
            <DisplayValue label="terrace area:" value={referenceData?.properties?.tree_count} />
            <DisplayValue label="bikelanes length:" value={referenceData?.properties?.bikelane_l} />




        </Stack>
    );
}

export default FeatureDetails;