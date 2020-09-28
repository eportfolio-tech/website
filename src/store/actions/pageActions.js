import {pageConstants} from '../constants/pageConstants';

export const pageActions = {
    loading,
    loaded,
    sleep,
};

function loading() {
    return {type: pageConstants.LOADING};
}

function loaded() {
    return {type: pageConstants.LOADED};
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
