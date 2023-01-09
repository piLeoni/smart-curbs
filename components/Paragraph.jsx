
import { Grid, Divider, Box } from "@mui/material";
import { useTheme } from '@mui/material/styles'

// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from '../store/slices/counterSlice'


function ParagraphTwoCols(props) {

    const theme = useTheme();

    // const count = useSelector((state) => state.counter.value)
    // const dispatch = useDispatch()

    return (
        <Grid
            container
            sx={{ mb: 0, color: 'primary.dark' }}>

            <Grid
                item sx={
                    {
                        typography: 'h3',
                        fontWeight: "bold",
                        lineHeight: 1,
                        color: props.color || 'secondary.main',
                        mb:1
                    }}
                md={7}
                xs={10}
            // style={{ borderBottom: `5px solid ${theme.palette.secondary.main}` }} 
            dangerouslySetInnerHTML={{ __html: props.title }}
            >

            </Grid>

            <Grid
                item sx={
                    {
                        typography: 'h5',
                        fontWeight: "regular",
                        mb: 2,
                        color: props.color ||'secondary.main'
                    }}
                md={12}
                xs={12}
            >
                {props.subtitle}

            </Grid>

            <Grid
                item
                xs={12}
                md={12}
                sx={{ typography: 'body1', fontSize:'1.2rem', fontWeight: "light", pb: 3 }}

            >
                <Box
                    dangerouslySetInnerHTML={{ __html: props.body }}
                    sx={{ pb: 3, columnCount: props.columns || { xs: 1, md: 2}, maxWidth:'120ch' ,  color: props.color ||'primary.main'}}
                // style={{ borderBottom: `5px solid ${theme.palette.secondary.main}` }} 
                />
            </Grid>
        </Grid >


    );
}

export default ParagraphTwoCols;