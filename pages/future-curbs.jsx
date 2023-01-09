import { Grid, Box } from "@mui/material"
import SlidesSwiper from "../components/SlidesSwiper"
import Paragraph from "../components/Paragraph";
import HBlock from "../components/HBlock";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import FullBodyHeight from "../components/FullBodyHeight";

function InnovatingCurbs(props) {

    const theme = useTheme();
    const [slidesNumber, setSlidesNumber] = useState(2.5);

    useEffect(() => {
        if (window.innerWidth > theme.breakpoints.values.xs) setSlidesNumber(1.1);
        if (window.innerWidth > theme.breakpoints.values.sm) setSlidesNumber(1.6);
        if (window.innerWidth > theme.breakpoints.values.md) setSlidesNumber(2.1);
        if (window.innerWidth > theme.breakpoints.values.lg) setSlidesNumber(2.6);
        if (window.innerWidth > theme.breakpoints.values.xl) setSlidesNumber(3.1);


    }, [])


    return (< Box sx={{ pt: 6 }}>
        <Box >

            <HBlock>
                <FullBodyHeight>
                    <Paragraph
                        title={props.intro.title}
                        subtitle={props.intro.subtitle}
                        body={props.intro.body}
                    />
                </FullBodyHeight>
            </HBlock>
            <Grid container spacing={2}>

                <Grid item md={12}>

                    <SlidesSwiper contents={props.slides} whitePagination
                        sx={{ minHeight: '100vh' }}
                        slidesPerView={slidesNumber}
                        centeredSlides={false} />

                </Grid>
            </Grid>

        </Box>
    </ Box>);
}

export default InnovatingCurbs;


export async function getStaticProps(context) {
    const contents = (await import('../contents/index.js')).default;
    return {
        props: {
            intro: contents.pages.innovatingCurbs.intro,
            slides: contents.pages.innovatingCurbs.slides,
        },
    }
}