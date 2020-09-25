import axios from 'axios';
import JwtDecode from 'jwt-decode';

// Set config defaults when creating the instance
const testEnvironment = 'https://haswell.eportfolio.tech/';
const devEnvironment = 'https://api.eportfolio.tech/';
const localEnvironment = 'http://localhost:8090';

const instance = axios.create({
    baseURL: devEnvironment,
});

instance.interceptors.request.use(
    (config) => {
        // check how long the token is left
        const token = localStorage.getItem('token');
        console.log(token);
        if (token !== null && token !== undefined) {
            const jwt = JwtDecode(token);
            const current_time = Date.now() / 1000;
            if (jwt.exp < current_time) {
                /* expired */
                // TODO: renew token
                // localStorage.removeItem('token');
                // localStorage.removeItem('user');
            }
            // Set auth header
            axios.defaults.headers.common['Authorization'] =
                'Bearer ' + token.replace(/['"]+/g, '');
        }
        return config;
    },
    (request) => {
        console.log('axios request: ', request);
        return request;
    },
    (error) => {
        console.log('axios error: ', error);
        Promise.reject(error);
    }
);

export default instance;
