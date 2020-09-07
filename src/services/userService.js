import axios from '../helper/axios';

export const userService = {
    login,
    signup,
    resetPassword,
    getUserTags,
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

async function getUserTags(username) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get('/users/' + username + '/tags');
    // console.log(response.data);

    // TODO: map the result data to array of tag names
    const tags = response.data.reduce((a, { name }) => {
        a.push(name);
        return a;
    }, []);

    // console.log('tags: ', tags);

    return tags;
}
