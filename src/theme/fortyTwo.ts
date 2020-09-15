import {createMuiTheme} from '@material-ui/core/styles';

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
});

export default fortyTwo;
