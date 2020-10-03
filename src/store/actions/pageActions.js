import {pageConstants} from '../constants/pageConstants';

export const pageActions = {
    loading,
    loaded,
    sleep,
    openDrawer,
    closeDrawer,
};

function loading() {
    return {type: pageConstants.LOADING};
}

function loaded() {
    return {type: pageConstants.LOADED};
}

function openDrawer() {
    return {type: pageConstants.OPEN_DRAWER};
}

function closeDrawer() {
    return {type: pageConstants.CLOSE_DRAWER};
}

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}
