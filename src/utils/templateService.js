import axios from './axios';

export const templateService = {
    getAllTemplates,
    createTemplate,
    getTemplateById,
    deleteTemplateById,
};

async function getAllTemplates() {
    const response = await axios.get('/templates/');
    return response.data.data;
}

async function createTemplate(data, des, title) {
    const response = await axios.post('/templates/', {
        boilerplate: data,
        description: des,
        title: title,
    });
    return response.data.data;
}

async function getTemplateById(templateID) {
    const response = await axios.get(`/templates/${templateID}`);
    return response.data.data;
}

async function deleteTemplateById(templateID) {
    const response = await axios.get(`/templates/${templateID}`);
    return response.data.data;
}
