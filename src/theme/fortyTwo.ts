import {createMuiTheme, responsiveFontSizes} from '@material-ui/core/styles';
import './Font.css';

//const font = "'Quicksand', sans-serif";

const fortyTwo = createMuiTheme({
    palette: {
        primary: {
            main: '#1d343d',
        },
        secondary: {
            main: '#119e74',
        },
        warning: {
            main: '#ECAE65',
        },
        error: {
            main: '#E77052',
        },
        success: {
            main: '#15d300',
        },
    },
    // typography: {
    //     fontFamily: font,
    // },
});

export default responsiveFontSizes(fortyTwo);
