// http services for portfolio
import axios from './axios';

export const pageService = {
    getPortfolio,
    createPortfolio,
    updatePortfolio,
    getContent,
    putContent,
};

async function getPortfolio(username) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get(`/portfolios/${username}`);
    return response.data.data;
}

async function createPortfolio(username, data) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.post(`/portfolios/${username}`, data);
    return response.data.data;
}

async function updatePortfolio(username, data) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.patch(`/portfolios/${username}`, data);
    return response.data.data;
}

async function getContent(username) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.get(`/portfolios/${username}/content`);
    return response.data.data;
}

async function putContent(username, data) {
    axios.defaults.headers.common['Authorization'] =
        'Bearer ' + localStorage.getItem('token').replace(/['"]+/g, '');
    const response = await axios.put(`/portfolios/${username}/content`, data);
    return response.data.data;
}
