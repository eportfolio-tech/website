import {alertConstants} from '../constants/AlertConstants';

export const alertActions = {
    success,
    error,
    clear,
    warning,
    info,
};

function success(message) {
    return {type: alertConstants.SUCCESS, message};
}

function info(message) {
    return {type: alertConstants.INFO, message};
}

function warning(message) {
    return {type: alertConstants.WARNING, message};
}

function error(message) {
    return {type: alertConstants.ERROR, message};
}

function clear() {
    return {type: alertConstants.CLEAR};
}
