import { Box, IconButton } from "@mui/material";
import style from "../styles/SideDrawer.module.scss";
import TranslucentCard from "./TranslucentCard";
import { useState } from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function DetailsDrawer(props) {

    const [showDrawer, setShowDrawer] = useState(true);

    return (

        <>
        <Box>
            <Box sx={{
                position: 'absolute', width: props.width || '35ch'
            }}
                className={`${style.SideDrawer} ${!showDrawer ? style.SideDrawerHidden : ''}`}
            >
                <IconButton

                    onClick={() => setShowDrawer(!showDrawer)}
                    size='small'
                    sx={theme => ({
                        position: 'absolute',
                        zIndex: '5',
                        left: '-50px',
                        top: '10%',
                        outline: `0.1px solid #ddd`,
                        boxShadow: '-10px 0px 20px rgba(200,200,200,0.3)'

                        // backgroundColor: '#fff !important'
                    })}  >
                    <ArrowForwardIosIcon
                        size='small'
                        className="arrowb"
                        color='secondary'
                        style={{
                            transition: 'all 0.5s ease-out',
                            transform: `rotate(${showDrawer ? '0deg' : '180deg'})`,
                        }}
                    />
                </IconButton>
                <TranslucentCard px={2} py={2} >
                    {props.children}

                </TranslucentCard>
            </Box>
            </Box>
        </>


    );
}

export default DetailsDrawer;