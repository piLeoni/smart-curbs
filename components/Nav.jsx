import Link from "next/link";

import { Stack, Button, ButtonBase, Box, Divider, Paper, AppBar, Toolbar, Typography, useScrollTrigger, Slide } from '@mui/material';
import { useRouter } from 'next/router';
import HBlock from "./HBlock";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TransucentCard from "./TranslucentCard";
import { useState, useEffect } from "react";
import Ripple from "./Ripple"

import MenuIcon from '@mui/icons-material/Menu';

function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}


function Nav(props) {
    const router = useRouter();
    const [drawerOpen, setDrawerOpen] = useState(false);

    function toggleDrawer(input) {
        setDrawerOpen(input)
    }

    useEffect(() => {
        toggleDrawer(false);
    }, [router.asPath])


    return (

        <>
            <HideOnScroll>
                <AppBar style={{ background: 'transparent', boxShadow: '-10px 0px 20px rgba(200,200,200,0.3)', zIndex: '100 !important' }} >
                    <TransucentCard >
                        <Toolbar variant='dense'>
                            <Box style={{ width: '100%' }} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Stack spacing={2} direction="row" justifyContent="center" alignItems="center" >
                                    <Box
                                        display={{ xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }}>
                                        <embed src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logos/MIT_SCL_logo_text.svg`} style={{ height: '1.2rem' }} />
                                    </Box>
                                    <Box
                                        display={{ xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' }} >
                                        <embed src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logos/SCL_logo.svg`} style={{ height: '1.2rem' }} />
                                    </Box>

                                    <Divider orientation="vertical" flexItem />
                                    <Ripple>
                                        <Box sx={{ typography: 'h6', color: 'secondary.main', fontWeight: 'medium', p: 0.5 }}><Link href="/">Smart Curbs</Link></Box>
                                    </Ripple>

                                </Stack>



                                <Stack spacing={1} direction="row" justifyContent="end" className="otulined" display={{ xs: 'none', sm: 'none', md: 'block', lg: 'block', xl: 'block' }}>

                                    {/* <Link href="/curb-types">
                                        <Button color='secondary'>
                                            <Box sx={{ opacity: (router.asPath === "/curb-types") ? 1 : 0.6 }}> Curb Types </Box>
                                        </Button>
                                    </Link> */}
                                    <Link href="/future-curbs">
                                        <Button color='secondary'>
                                            <Box sx={{ opacity: (router.asPath === "/future-curbs") ? 1 : 0.6 }}> Future Curbs</Box>
                                        </Button>
                                    </Link>
                                    <Link href="/real-time-curbs">
                                        <Button color='secondary'>
                                            <Box sx={{ opacity: (router.asPath === "/real-time-curbs") ? 1 : 0.6 }}> Real-time curbs</Box>
                                        </Button>
                                    </Link>
                                </Stack>

                                <Box display={{ xs: 'block', sm: 'block', md: 'none', lg: 'none', xl: 'none' }}>
                                    <Button variant='normal'
                                        onClick={() => toggleDrawer(true)}
                                        disableElevation

                                    >
                                        <MenuIcon color="secondary" />
                                    </Button>
                                </Box >


                            </Box>
                        </Toolbar>
                    </TransucentCard>
                </AppBar >
            </HideOnScroll>


            <SwipeableDrawer
                anchor='bottom'
                open={drawerOpen}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
            >
                <Box sx={{ p: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <Stack spacing={1} direction="column" justifyContent="center" sx={{ width: '20rem' }} >
{/* 
                        <Link href="/curb-types">
                            <Button sx={{ fontWeight: router.asPath === '/curb-types' ? 'bold' : 'regular', color:'secondary.main' }}
                                disableElevation>Curb Types</Button>
                        </Link> */}
                        <Link href="/future-curbs">
                            <Button
                                sx={{ fontWeight: router.asPath === '/future-curbs' ? 'bold' : 'regular',color:'secondary.main' }}
                                disableElevation>
                                Future Curbs
                            </Button>
                        </Link>
                        <Link href="/real-time-curbs">
                            <Button
                                sx={{ fontWeight: router.asPath === '/real-time-curbs' ? 'bold' : 'regular', color:'secondary.main' }}
                                disableElevation>
                                Real-time Curbs
                            </Button>
                        </Link>
                    </Stack>
                </Box>
            </SwipeableDrawer>

        </>

    );
}


export { Nav };