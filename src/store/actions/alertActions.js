import {alertConstants} from '../constants/alertConstants';

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

function error(error, errorHeader) {
    const statusCode = error.response.status;
    let normalError = error.response.data.data;
    if (!normalError) {
        normalError = error.response.data;
    }

    return {
        type: alertConstants.ERROR,
        message: `${statusCode}${
            errorHeader ? ' ' + errorHeader : ''
        }: ${JSON.stringify(normalError)}`,
    };
}

function clear() {
    return {type: alertConstants.CLEAR};
}
