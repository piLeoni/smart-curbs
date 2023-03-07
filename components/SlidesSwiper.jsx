import { Controller } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box, Backdrop, Grid } from "@mui/material";
import Paragraph from './Paragraph';
import 'swiper/css';
import "swiper/css/pagination";
import style from "../styles/SlidesSwiper.module.scss"
import { useState, useEffect } from 'react';
import HBlock from './HBlock'
import { Pagination } from "swiper";
import { useTheme } from "@mui/material/styles";

function SlidesSwiper(props) {

    const theme = useTheme();

    const [fullScreen, setFullScreen] = useState(false)

    const [firstSwiper, setFirstSwiper] = useState(null);
    const [secondSwiper, setSecondSwiper] = useState(null);
    const [mobileVersion, setMobileVersion] = useState(false);

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    function handleResize() {
        console.log('resize')
        if (window.innerWidth < theme.breakpoints.values.sm)
            setMobileVersion(true);
    }

    function handleClick(index) {
        secondSwiper.slideTo(index, 0);
        setFullScreen(true);
    }

    return (

        <>

            <Box sx={{ backgroundColor: 'secondary.main', pt: 2, pb: 1 }}>
                <HBlock sx={{ position: 'relative', height: "100%", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* <Box sx={{ position: 'relative', height: "100%" }}>

                        <Paragraph
                            // title={props.contents.title}
                            subtitle={props.contents.subtitle}
                            body={props.contents.body}
                            color='white'
                            columns={1}
                        />
                    </Box> */}

                    <Box sx={{
                        typography: 'h5',
                        fontWeight: "regular",
                        mb: 5,
                        color: 'white'
                    }}>
                        <a href="https://www.dropbox.com/s/gg84i63vwfkei1o/Ideation_Report_1025.pdf?dl=0" target="blank">Download report</a>

                    </Box>
                </HBlock>

                {!mobileVersion && <Swiper
                    slidesPerView={mobileVersion ? 1.2 : 3}
                    spaceBetween={10}
                    onSwiper={setFirstSwiper}

                >

                    {
                        props.contents.images.map((slide, index) => {
                            return (
                                <SwiperSlide key={`slide-${index}`}
                                    style={{ boxSizing: 'border-box' }}
                                // onClick={s => handleClick(index)} 
                                >

                                    <Box sx={{ display: 'flex', position: 'relative' }} >
                                        <img style={{
                                            width: '100%'
                                        }} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/${slide.url}`} alt="" />
                                        <Box
                                            sx={{
                                                boxSizing: 'border-box',
                                                position: 'absolute',
                                                bottom: '0px',
                                                width: '100%',
                                                height: '100%',
                                                typography: { xs: 'body2', sm: 'body1' },
                                                color: 'white',
                                                background: 'linear-gradient(0deg, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                                transition: 'opacity 0.5s ease-out',
                                                opacity: mobileVersion ? 1 : 0,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'end',
                                                p: 3,

                                                '&:hover': {
                                                    opacity: 1,
                                                }
                                            }}

                                        >
                                            <Box dangerouslySetInnerHTML={{ __html: slide.intro }} />
                                        </Box>

                                    </Box>
                                </SwiperSlide>
                            )
                        })
                    }


                </Swiper>
                }

                {mobileVersion &&

                    <HBlock>
                        {props.contents.images.map((slide, index) => {
                            return (
                                <Box key={`slide-${index}`} onClick={s => handleClick(index)} sx={{ py: 2 }}>
                                    <img style={{ width: '100%' }} src={`${process.env.NEXT_PUBLIC_BASE_PATH}/${slide.url}`} alt="" />
                                    <Box
                                        sx={{ color: 'white' }}
                                        dangerouslySetInnerHTML={{ __html: slide.intro }} />

                                </Box>
                            )
                        })}
                    </HBlock>


                }

            </Box>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                className={`${style.fullScreenWrapper} `}
                open={fullScreen}
                onClick={() => setFullScreen(false)}
            >

                <Swiper
                    modules={[Pagination]}
                    onSwiper={setSecondSwiper}
                    pagination={true}
                    onSlideChange={s => firstSwiper.slideTo(s.activeIndex)}
                >
                    {props.contents.images.map((slide, index) =>
                        <SwiperSlide
                            className={`${style.fullScreenSlide} `}
                            key={`slide-${index}`}
                        >
                            <img
                                alt=""
                                className={`${style.fullScreenImage} `}
                                src={`${process.env.NEXT_PUBLIC_BASE_PATH}/${slide.url}`}
                            />
                        </SwiperSlide>
                    )}

                </Swiper>
            </Backdrop>
        </>

    );
}

export default SlidesSwiper;