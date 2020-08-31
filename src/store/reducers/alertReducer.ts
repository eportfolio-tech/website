import {alertConstants} from '../constants/alertConstants';

export interface IAlertState {
    type?: String;
    message?: String | null;
}

export function alertReducer(
    state: IAlertState = {},
    action: any
): IAlertState {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {
                type: 'success',
                message: action.message,
            };
        case alertConstants.ERROR:
            return {
                type: 'error',
                message: action.message,
            };
        case alertConstants.WARNING:
            return {
                type: 'warning',
                message: action.message,
            };
        case alertConstants.INFO:
            return {
                type: 'info',
                message: action.message,
            };
        case alertConstants.CLEAR:
            return {};
        default:
            return state;
    }
}
