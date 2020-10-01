import axios from './axios';

export const socialService = {
    findWhoLikedThisPortfolio,
    likePortfolio,
    unlikePortfolio,
    createComment,
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
