import axios from '../helper/axios';

export const userService = {
    login,
    signup,
    resetPassword,
    getAllTags,
    getUserTags,
    updateUserTags,
    deleteUserTags,
    verifyEmail,
    recoveryPassword,
};

async function login(username, password) {
    const response = await axios.post('/authentication/login', null, {
        params: {
            username: username,
            password: password,
        },
    });
    const user = {
        username: response.data.username,
        email: response.data.email,
    };
    const token = response.headers['x-jwt-token'];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    return { user: user.username, token: token };
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
        username: response.data.username,
        email: response.data.email,
    };
    const token = response.headers['x-jwt-token'];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', JSON.stringify(token));
    return response.data;
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
    return response.data;
}

async function getAllTags() {
    const response = await axios.get('/tags/');
    return response.data;
}

async function getUserTags(username) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get('/users/' + username + '/tags');
    return response.data;
}

async function updateUserTags(username, updatedTags) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(
        '/users/' + username + '/tags',
        updatedTags
    );
    return response.data;
}

async function deleteUserTags(username, deletedTags) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(
        '/users/' + username + '/deleteTags',
        deletedTags
    );
    return response.data;
}

async function verifyEmail(token, username) {
    const response = await axios.post('/verification/verify', null, {
        params: {
            token: token,
            username: username,
        },
    });

    return response.data;
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

    return response.data;
}
