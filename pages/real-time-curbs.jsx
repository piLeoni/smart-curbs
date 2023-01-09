
import { Box, Stack } from "@mui/material";
import MapLog from "../components/MapLog";
import HBlock from "../components/HBlock";
import Paragraph from "../components/Paragraph";
import FullBodyHeight from "../components/FullBodyHeight";
import Diagram from "../components/Diagram"
function RealTimeCurbs(props) {
    return (<Box sx={{ pt: 6 }}>
        <HBlock>
            <FullBodyHeight>
                <Paragraph title={props.intro?.title} subtitle={props.intro?.subtitle} body={props.intro?.body} />
            </FullBodyHeight>
            <Diagram />
        </HBlock>
        <HBlock fullWidth>
            <MapLog />
        </HBlock>
    </Box>);
}

export default RealTimeCurbs;

export async function getStaticProps(context) {
    const contents = (await import('../contents/index.js')).default
    return {
        props: {
            intro: contents.pages.realTimeCurbs.intro,
            diagrams: contents.pages.realTimeCurbs.diagrams
        },
    }
}