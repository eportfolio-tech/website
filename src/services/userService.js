import axios from "../helper/axios";
import { sha256 } from 'js-sha256';

export const userService = {
    login,
    logout,
    signup,
};

async function login(email, password) {
    let response = await axios.post(
        '/api/auth/login/',
        null,
        {
            params: {
                email: email,
                password: sha256.hmac('upathway', password),
            }
        }
    );
    const user = response.data.data;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

async function logout(){
    await axios.post(
        '/api/auth/logout/',
        null,
        null
    );
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

async function signup(username, email, password) {
    const response = await axios.post(
        '/api/users/',
        null,
        {
            params: {
                username: username,
                email: email,
                password: sha256.hmac('upathway', password)
            }
        });
    return response.data;
}