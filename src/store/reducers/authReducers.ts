import {userConstants} from '../constants/userConstants';

export interface IAuthState {
    loggedIn: boolean | undefined;
    user?: string | null;
    token?: string | null;
}

const initialState = JSON.parse(
    localStorage.getItem('user') ||
        '{"loggedIn":false, "user": null, "token": null}'
);
if (initialState.loggedIn === undefined) initialState.loggedIn = false;

export function authenticationReducer(
    state: IAuthState = initialState,
    action: any
): IAuthState {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggedIn: true,
                user: action.payload.user,
                token: null,
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        case userConstants.LOGIN_FAILURE:
            return {
                loggedIn: false,
                user: null,
                token: null,
            };
        case userConstants.LOGOUT:
            return {
                loggedIn: false,
                user: null,
                token: null,
            };
        case userConstants.UPDATE_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload.user,
                token: action.payload.token,
            };
        default:
            return state;
    }
}
