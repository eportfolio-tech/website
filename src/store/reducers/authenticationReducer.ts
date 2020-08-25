import { userConstants } from "../constants/userConstants";

export interface IAuthState {
	loggedIn: boolean | undefined;
	user?: String | null;
	token?: String | null;
}

let initialState = JSON.parse(
	localStorage.getItem("user") ||
		'{"loggedIn":false, "user": null, "token": null}'
);
if (initialState.loggedIn === undefined) initialState.loggedIn = true;

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
		default:
			return state;
	}
}
