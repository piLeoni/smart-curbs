import React from 'react';
import {Box} from "@mui/material"
// import * as d3 from "d3";


function LinearLegend(props) {
   


    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: "row", alignItems:'center', justifyContent:'start', typography:'underline', color:'secondary.main' , my:2}}>
                {props.labelMin || props.min}
                <Box sx={{ width: "200px",
                mx:1, 
                height: "15px", 
                background: `linear-gradient(0.25turn, ${props.colors.join(',')})`,
                }} />
                 {props.labelMax || props.max}
            </Box>
        </>
    )
}

export { LinearLegend }