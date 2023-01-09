import { useEffect, useState, useRef } from 'react';
import { Box , Grid} from "@mui/material";
import contents from "../contents";

export default function Diagram() {

    const diagram = useRef(contents.pages.realTimeCurbs.diagrams.drawings[0])
    useEffect(() => {

        console.log(contents.pages.realTimeCurbs.diagrams.drawings[0])
    })
    return (
        <>
            <Grid container sx={{ display: 'flex', flexDirection: 'row', my:5 }} >
                <Grid item xs={12} md={6}>
                    <img style={{ width: '100%' }} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/${diagram.current.url}`} alt="" />
                </Grid>
                <Grid item xs={12} md={6} sx={{display:'flex', flexDirection:'column', justifyContent:'center', pl:{sx:0, md:5}}}>
                    <Box sx={{typography:'h4', fontWeight:'medium', color:'secondary.main', mb:1}}> {diagram.current.label}</Box>
                    <Box sx={{typography:'body1', color:'primary.main', fontSize:'1.2rem', fontWeight: "light"}}>{diagram.current.details}</Box>
                </Grid>
            </Grid>
        </>
    )
}
