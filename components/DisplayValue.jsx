import { Box, Stack } from "@mui/material"
function DisplayValue(props) {
    return (
        <Stack direction="row" spacing={0.5} >

            {
                props.label &&
                <Box sx={{ typography: 'body2', fontSize: { xs: '0.6rem', md: '0.9rem' }, color: 'secondary.main', textTransform: "uppercase" }}>{props.label}</Box>
            }

            <Box sx={{ typography: 'body2', fontSize: { xs: '0.6rem', md: '0.9rem' }, fontWeight: "bold", color: 'secondary.main', textTransform: "uppercase", display: 'flex' }}>
                {props.value}
                <Box sx={{ fontWeight: "regular", textTransform: "none", ml: 0.25 }}>{props.suffix}</Box>
            </Box>


        </Stack>
    );
}

function DisplayValueVertical(props) {
    return (
        <Box className='outlined_' direction="column" sx={{ ...props.sx, display: 'inline-flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }} >

            <Box sx={{ typography: 'h4', fontWeight: "medium", color: 'secondary.main', textTransform: "uppercase", display: 'flex', lineHeight: 0.9 }}>
                {props.value}
                {/* <Box sx={{ fontWeight: "regular", textTransform: "none", ml: 0.25 }}>{props.suffix}</Box> */}
            </Box>
            <Box sx={{ typography: 'underline', fontSize: '0.6rem', color: 'secondary.light',fontWeight: "bold", textTransform: "uppercase" }}>
                {props.label} {props.suffix ? ` | ${props.suffix}` : ''}
            </Box>
        </Box>
    );
}

export { DisplayValue, DisplayValueVertical };