import { Box, Stack, Container, Button } from "@mui/material"
import { useTheme } from '@mui/material/styles'
import HBlock from "./HBlock"
// import style from '../styles/Footer.module.scss';
// import Typography from '@mui/material/Typography';

function Footer() {


    const theme = useTheme();

    return (
        <Box sx={{  backgroundColor: theme.palette.grey['100'], color: 'primary.main', pt: 2 }} >
            <HBlock>
                <Stack
                    direction="row"
                    //  justifyContent="center"
                    alignItems="center"
                    spacing={3}
                >
                    <Button>
                        <embed src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logos/MIT_SCL_logo_text.svg`} style={{ height: '1.5rem' }} />
                    </Button>
                    <Button>
                        <embed src={`${process.env.NEXT_PUBLIC_BASE_PATH}/logos/RATP_logo_original.svg`} style={{ height: '3rem' }} />
                    </Button>

                </Stack>
                <Box sx={{ py: 2, typography: "body2" }} >
                    {/* <div >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat.
                    </div> */}
                   
                    <Button variant="outlined" sx={{mt:2}}>
                        Accessibility
                    </Button>
                </Box>
            </HBlock>
        </Box>
    );
}

export default Footer;