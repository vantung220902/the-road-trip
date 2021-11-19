import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    color: {
        primary: '#f9f4f7',
        secondary: '#090832',
        primaryDark: '#121212',
        secondaryDark: '#d1d5db',
        error: '#D32F2F',
        text: '#FFFFFF',
        defaultTextColor: '#000000',
        hover: 'rgba(0,0,0,0.8)',
    },
    typography: {
        fontFamily: 'Roboto',
    },
    containers: {
        maxWidth: 1327,
    },
    text: {
        colorPrimary: '#000000',
        colorSecondary: '#2c68eb',
        blueColor: '#356eeb',
    },
});
export default theme;
