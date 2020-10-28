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
    if (error.response) {
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
    } else {
        return {
            type: alertConstants.ERROR,
            message: `System crashed! please check console. [${error}]`,
        };
    }
}

function clear() {
    return {type: alertConstants.CLEAR};
}
