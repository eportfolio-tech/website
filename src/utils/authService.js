import axios from './axios';

export const authService = {
    getUser,
    login,
    signup,
    resetPassword,
    recoveryPassword,
    verifyEmail,
    getRecoveryLink,
    updateInfo,
    getInfo,
};

async function getUser(username, token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    const response = await axios.get('/users/' + username);
    return response.data.data;
}

async function login(username, password) {
    axios.defaults.headers.common['Authorization'] = null;
    const response = await axios.post('/authentication/login', {
        username: username,
        password: password,
    });
    const token = response.headers['x-jwt-token'];
    localStorage.setItem(
        'user',
        JSON.stringify({
            loggedIn: true,
            user: response.data.data.user,
            token: token,
        })
    );
    localStorage.setItem('token', JSON.stringify(token));
    response.data.data['token'] = token;
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

async function updateInfo(username, userInfo) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.patch('/users/' + username, {
        avatarUrl: userInfo.avatarUrl,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        phone: userInfo.phone,
        title: userInfo.title,
    });
    localStorage.setItem(
        'user',
        JSON.stringify({
            loggedIn: true,
            user: response.data.data.user,
            token: localStorage.getItem('token'),
        })
    );
    return response.data.data;
}

async function getInfo(username) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get('/users/' + username, null);
    return response.data.data;
}
