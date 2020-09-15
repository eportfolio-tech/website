import {userConstants} from '../constants/UserConstants';

export interface IUserState {
    loading?: Boolean;
    items?: any;
    error?: any;
}

const defaultState = {loading: false};
export function userReducer(
    state: IUserState = defaultState,
    action: any
): IUserState {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true,
            };
        case userConstants.GETALL_SUCCESS:
            return {
                items: action.users,
            };
        case userConstants.GETALL_FAILURE:
            return {
                error: action.error,
            };
        default:
            return state;
    }
}
