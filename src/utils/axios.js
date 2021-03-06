import axios from 'axios';

const devEnvironment = process.env.REACT_APP_ENDPOINT;

// const localEnvironment = 'http://localhost:8090';

const instance = axios.create({
    baseURL: devEnvironment,
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] =
                'Bearer ' + token.replace(/['"]+/g, '');
        }
        return config;
    },
    (error) => {
        console.log('axios error: ', error);
        Promise.reject(error);
    }
);

//Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const originalRequest = error.config;

        if (
            error.response.status === 401 &&
            originalRequest.url === '/authentication/renew/'
        ) {
            // router.push('/login');
            console.log('renew token expired');
            return Promise.reject(error);
        }

        if (
            (error.response.status === 401 || error.response.status === 403) &&
            !originalRequest._retry
        ) {
            localStorage.removeItem('token');

            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('retoken');
            return instance
                .post('/authentication/renew/', {
                    refreshToken: refreshToken.replace(/['"]+/g, ''),
                })
                .then((res) => {
                    if (res.status === 201) {
                        localStorage.setItem(
                            'token',
                            res.data.data['access-token']
                        );
                        instance.defaults.headers.common['Authorization'] =
                            'Bearer ' + localStorage.getItem('token');
                        return instance(originalRequest);
                    }
                });
        }
        return Promise.reject(error);
    }
);

export default instance;
