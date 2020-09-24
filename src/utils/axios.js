import axios from 'axios';

// Set config defaults when creating the instance
const testEnvironment = 'https://haswell.eportfolio.tech/';
const devEnvironment = 'https://api.eportfolio.tech/';
const localEnvironment = 'http://localhost:8090'

var instance = axios.create({
    baseURL: localEnvironment,
});

// const user = JSON.parse(localStorage.getItem('user'));
// console.log("User token" + user.token);
// if (user) {
//     instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
// }
instance.interceptors.request.use(
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
