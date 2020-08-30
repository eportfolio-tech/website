import axios from 'axios';

// Set config defaults when creating the instance
var instance = axios.create({
    baseURL: 'https://dev.eportfolio.tech/',
});

const user = JSON.parse(localStorage.getItem('user'));
// console.log("User token" + user.token);
if (user) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
}
instance.interceptors.request.use(
    (request) => {
        console.log(request);
        return request;
    },
    (error) => {
        console.log(error);
        Promise.reject(error);
    }
);

export default instance;
