import { Grid, Box } from "@mui/material"
import Paragraph from "../components/Paragraph";
import SlidesSwiper from "../components/SlidesSwiper"
import TypologiesPanel from "../components/TypologiesPanel"
import MapDiagram from "../components/MapDiagram";
import Test from "../components/Test";
import FullBodyHeight from "../components/FullBodyHeight";
import HBlock from "../components/HBlock";

function BigData(props) {
    return (<Box sx={{ pt: 6 }}>
        <HBlock >
            <FullBodyHeight>
                <Paragraph
                    title={props.intro.title}
                    subtitle={props.intro.subtitle}
                    body={props.intro.body}
                />
            </FullBodyHeight>
        </HBlock>
        {/* <Test></Test> */}
        {/* <Grid container sx={{ my: 6 }} spacing={2}>
            <Grid item md={6}>
                <SlidesSwiper contents={props.slides} whitePagination />
            </Grid>
            <Grid item md={6}>
                <   TypologiesPanel contents={props.typologies} />
            </Grid>
        </Grid> */}

            <HBlock fullWidth  >
                <MapDiagram categories={props.diagramMap} />
            </HBlock>

    </Box>);
}


export default BigData;

export async function getStaticProps(context) {
    const contents = (await import('../contents/index.js')).default
    return {
        props: {
            intro: contents.pages.bigData.intro,
            slides: contents.pages.bigData.slides,
            typologies: contents.pages.bigData.typologies,
            diagramMap: contents.pages.bigData.diagramMap
        },
    }
}