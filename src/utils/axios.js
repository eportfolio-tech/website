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
        // console.log(token);
        if (token !== null && token !== undefined) {
            const jwt = JwtDecode(token);
            const current_time = Date.now() / 1000;
            // console.log(jwt.exp - current_time);
            if (jwt.exp - current_time > 0 && jwt.exp - current_time < 5) {
                instance.post('/authentication/renew').then((data) => {
                    console.log(data);
                });
            }
            // Set auth header
            config.headers.common['Authorization'] =
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
