import axios from './axios';

export const socialService = {
    findWhoLikedThisPortfolio,
    likePortfolio,
    unlikePortfolio,
    findWhoFollowedThisPortfolio,
    followPortfolio,
    unFollowPortfolio,
    findWhoIamFollowing,
    createComment,
    feed,
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

async function findWhoFollowedThisPortfolio(destinationUsername) {
    const response = await axios.get(`/users/${destinationUsername}/followers`);
    return response.data.data;
}

async function followPortfolio(destinationUsername) {
    const response = await axios.post(
        `/users/${destinationUsername}/followers`
    );
    return response.data.data;
}

async function unFollowPortfolio(destinationUsername) {
    const response = await axios.delete(
        `/users/${destinationUsername}/followers`
    );
    return response.data.data;
}

async function findWhoIamFollowing(username) {
    const response = await axios.get(`/users/${username}/following`);
    return response.data.data;
}

async function createComment(ownerUsername, comment) {
    const response = await axios.post(
        `/portfolios/${ownerUsername}/comments`,
        null,
        {
            params: {
                content: comment,
            },
        }
    );
    return response.data.data;
}

async function feed() {
    const response = await axios.get(`/feed/`);
    return response.data.data;
}
