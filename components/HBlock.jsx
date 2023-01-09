import { Container, Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

function HBlock(props) {

    const theme = useTheme();



    return (
        <>

            <Grid container justifyContent="center" className="outlined_" sx={{ ...props.sx }}>
                <Grid
                    className="outlined_"
                    item
                    xl={props.fullWidth ? 12 : 7}
                    lg={props.fullWidth ? 12 : 9}
                    md={props.fullWidth ? 12 : 10}
                    xm={props.fullWidth ? 12 : 11}
                    xs={props.fullWidth ? 12 : 12}
                    sx={{
                        width: "100vw",
                        px: props.fullWidth ? 0 : 3

                    }}

                >
                    {props.children}
                </Grid>
            </Grid>
        </>

    );
}

export default HBlock;