import {userConstants} from '../constants/userConstants';

export const userActions = {
    login,
    logout,
    update,
};

function login(payload) {
    return {type: userConstants.LOGIN_SUCCESS, payload};
}

function logout() {
    return {type: userConstants.LOGOUT};
}

function update(payload) {
    return {type: userConstants.UPDATE_SUCCESS, payload};
}
