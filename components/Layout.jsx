import { Nav, NavMobile } from "./Nav";
import Footer from "./Footer";
// import Test from "./Test";
import { Container, Stack, Box } from '@mui/material';

function Layout({ children }) {
    return (
        <Box className="" alignItems="stretch"
            sx={{
                minHeight: "100vh",
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              
            }}>
            {/* <Container className="" maxWidth="lg" > */}

            <Nav className="" />
            {/* <Box display={{xs:'none', lg:'block'}}><Nav className="" /></Box>
            <Box display={{xs:'block', lg:'none'}}><NavMobile className="" /></Box> */}

            <main className="">
                <Box sx={{mt:6}}>
                {children}

                </Box>
            </main>
            {/* </Container> */}
            <Footer />

        </Box>
    );
}

export default Layout;