import axios from './axios';

export const socialService = {
    findWhoLikedThisPortfolio,
    likePortfolio,
    unlikePortfolio,
    findWhofollowedThisPortfolio,
    followPortfolio,
    unfollowPortfolio,
};

async function findWhoLikedThisPortfolio(ownerUsername) {
    const response = await axios.get(`/portfolios/${ownerUsername}/like`);
    return response.data.data;
}

async function likePortfolio(ownerUsername) {
    const response = await axios.post(`/portfolios/${ownerUsername}/like`);
    return response.data.data;
}

async function unlikePortfolio(ownerUsername) {
    const response = await axios.delete(`/portfolios/${ownerUsername}/like`);
    return response.data.data;
}

async function findWhofollowedThisPortfolio(destinationUsername) {
    const response = await axios.get(`/users/${destinationUsername}/follow`);
    return response.data.data;
}

async function followPortfolio(destinationUsername) {
    const response = await axios.post(`/users/${destinationUsername}/follow`);
    return response.data.data;
}

async function unfollowPortfolio(destinationUsername) {
    const response = await axios.delete(`/users/${destinationUsername}/follow`);
    return response.data.data;
}
