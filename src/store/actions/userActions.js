import { userConstants } from '../constants/userConstants';

export const userActions = {
    login,
    logout,
};

function login(payload) {
    return { type: userConstants.LOGIN_SUCCESS, payload}
}

function logout() {
   return { type: userConstants.LOGOUT }
}