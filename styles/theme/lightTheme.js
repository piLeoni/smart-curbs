import { createTheme } from '@mui/material/styles';
import palette from './Variables.module.scss';

const lightTheme = createTheme({
    palette: {
        // mode: 'light',
        primary: { main: `${palette.primaryColor}` },
        secondary: { main: `${palette.secondaryColor}` },
        error: { main: `${palette.errorColor}` },
        warning: { main: `${palette.warningColor}` },
        info: { main: `${palette.infoColor}` },
        success: { main: `${palette.successColor}` }

    }

});

export default lightTheme;