import axios from './axios';

export const authService = {
    login,
    signup,
    resetPassword,
    recoveryPassword,
    verifyEmail,
    getRecoveryLink,
};

async function login(username, password) {
    const response = await axios.post('/authentication/login', null, {
        params: {
            username: username,
            password: password,
        },
    });
    const user = {
        username: response.data.data.user.username,
        email: response.data.data.user.email,
    };
    const token = response.headers['x-jwt-token'];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    return response.data.data;
}

async function signup(userInfo) {
    const response = await axios.post('/authentication/signup', {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password,
        username: userInfo.username,
        title: userInfo.title,
        phone: userInfo.phone,
    });
    const user = {
        username: response.data.data.username,
        email: response.data.data.email,
    };
    const token = response.headers['x-jwt-token'];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    return response.data.data;
}

async function resetPassword(username, oldPassword, newPassword) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(
        '/users/' + username + '/password-reset',
        {
            newPassword: newPassword,
            oldPassword: oldPassword,
        }
    );
    return response.data.data;
}

async function verifyEmail(token, username) {
    const response = await axios.post('/verification/verify', null, {
        params: {
            token: token,
            username: username,
        },
    });

    return response.data.data;
}

async function recoveryPassword(token, username, password) {
    const response = await axios.post(
        '/authentication/password-recovery',
        null,
        {
            params: {
                token: token,
                username: username,
                password: password,
            },
        }
    );

    return response.data.data;
}

async function getRecoveryLink(email) {
    const response = await axios.post(
        '/authentication/send-recovery-link',
        null,
        {
            params: {
                email: email,
            },
        }
    );

    return response.data.data;
}
