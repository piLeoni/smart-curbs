import React from 'react'
import { Grid, Box } from '@mui/material'
import { DisplayValue, DisplayValueVertical } from './DisplayValue';



function DataBlock(props) {
    function Cell(props) {
        return (<Grid item xs={props.xs || 6} sm={props.sm || 4} sx={{ ...gridAlign }}>{props.children}</Grid>)
    }
    const gridAlign = { display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', pt: 1.5, width: '500px' };
    

    return (
        <div>
            <Box sx={{ typography: 'body1', color: 'secondary.main', textTransform: 'uppercase', mt: 2 }}>{props.label}</Box>

            <Grid container sx={{ ...props.sx }}>
                {props.values.map((v, i) => {
                    return <Cell key={`element-${i}`} sm={props.sm} xs={props.xs} >
                        <DisplayValueVertical label={v.label} value={v.value} suffix={v.suffix} />
                    </Cell>
                }
                )}

            </Grid>
        </div>
    )
}

function DataBlockSmall(props) {

    function Cell(props) {
        return (<Grid item xs={props.xs || 6} sm={props.sm || 4} sx={{ ...gridAlign }}>{props.children}</Grid>)
    }
    const gridAlign = { display: 'flex', flexDirection: 'row', alignItems: 'start', justifyContent: 'start', pt: 1.5, width: '500px' };

    return (
        <div>
            <Box sx={{ typography: 'body1', color: 'secondary.main', textTransform: 'uppercase', mt: 2 }}>{props.label}</Box>

            <Grid container sx={{ ...props.sx }}>
                {props.values.map((v, i) => {
                    return <Cell key={`element-${i}`}>
                        <DisplayValue label={v.label} value={v.value} suffix={v.suffix} />
                    </Cell>
                }
                )}

            </Grid>
            {/* <Grid container>
                <Cell> <DisplayValue label="lat" value={currentSample?.geometry?.coordinates[0].toFixed(5).toString().padStart(8, '0')} /></Cell>
                <Cell> <DisplayValue label="lon" value={currentSample?.geometry?.coordinates[1].toFixed(5).toString().padStart(8, '0')} /></Cell>
                <Cell> <DisplayValue label="dist" value={currentSample?.properties?.totalDistance?.toFixed(2).toString().padStart(5, '0')} suffix='km' /></Cell>
                <Cell>  <DisplayValue label="head" value={parseInt(bearing(currentSample?.properties?.bearing)).toString().padStart(3, '0')} suffix='deg' /></Cell>
                <Cell> <DisplayValue label="speed" value={parseInt(currentSample?.properties?.speed).toString().padStart(3, '0')} suffix='km/h' /></Cell>
                <Cell>  <DisplayValue label="line" value={79} /></Cell>
            </Grid> */}
        </div>
    )
}

export { DataBlock, DataBlockSmall }
