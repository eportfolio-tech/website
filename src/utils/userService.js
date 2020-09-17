import axios from './axios';

export const userService = {
    getAllTags,
    getUserTags,
    updateUserTags,
    deleteUserTags,
    search,
};

async function getAllTags() {
    const response = await axios.get('/tags/');
    return response.data.data;
}

async function getUserTags(username) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get('/users/' + username + '/tags');
    return response.data.data;
}

async function updateUserTags(username, updatedTags) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(
        '/users/' + username + '/tags',
        updatedTags
    );
    return response.data.data;
}

async function deleteUserTags(username, deletedTags) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(
        '/users/' + username + '/deleteTags',
        deletedTags
    );
    return response.data.data;
}

async function search(query, page, size) {
    // console.log(query + page + size);
    const response = await axios.get('/portfolio/search', {
        params: {
            query: query,
            page: page,
            size: size,
        },
    });

    return response.data.data;
}