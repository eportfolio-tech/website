import axios from './axios';

export const userService = {
    getAllTags,
    getUserTags,
    updateUserTags,
    deleteUserTags,
    search,
    uploadFile,
};

async function getAllTags() {
    const response = await axios.get('/tags/');
    return response.data.data;
}

async function getUserTags(username) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get(`/users/${username}/tags`);
    return response.data.data;
}

async function updateUserTags(username, updatedTags) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(`/users/$username}/tags`, updatedTags);
    return response.data.data;
}

async function deleteUserTags(username, deletedTags) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(
        `/users/${username}/deleteTags`,
        deletedTags
    );
    return response.data.data;
}

async function search(query, page, size) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get('/portfolios/search', {
        params: {
            query: query,
            page: page,
            size: size,
        },
    });
    return response.data.data;
}

async function uploadFile(username, file) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const formData = new FormData();
    formData.append('multipartFile', file);
    formData.append('username', username);
    const response = await axios.post(`/blobs/${username}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data.data;
}
