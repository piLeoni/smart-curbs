import { Box } from "@mui/material";
import { useState, useEffect } from 'react';
function FullBodyHeight(props) {

    const [mainAreaHeight, setMainAreaHeight] = useState('100vh');

    useEffect(() => {
        const topBarHeight = document.getElementsByClassName('MuiAppBar-root')[0].clientHeight;
        setMainAreaHeight(`${(window.innerHeight) - topBarHeight}px`);
    }, []);

    return (

        <Box sx={{ minHeight: mainAreaHeight, display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' }}>
            {props.children}
        </Box>);
}

export default FullBodyHeight;