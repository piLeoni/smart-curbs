import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import styles from "../styles/Player.module.css";

function Player(props) {

    const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });
    return (
        <>
            <Box sx={{ wisth: "100%" }}
                className={`${styles.playerWrapper} playerSelectorClass`}>
                <ReactPlayer
                    className={styles.reactPlayer}
                    url={`${props.url}?showinfo=0&modestbranding=1&rel=0`}
                    width='100%'
                    height='100%'
                />
            </Box>
        </>);
}

export default Player;