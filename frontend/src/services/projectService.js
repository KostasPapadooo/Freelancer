import axios from 'axios';

// Λήψη των έργων του πελάτη
export const getClientProjects = async (clientId) => {
    try {
        const response = await axios.get(`/api/projects/client/${clientId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching client projects:', error);
        throw error;
    }
};

// Λήψη των αιτήσεων για έργο
export const getApplicationsForProject = async (projectId) => {
    try {
        const response = await axios.get(`/api/applications/project/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching applications for project:', error);
        throw error;
    }
};

// Δημιουργία νέου έργου
export const createProject = async (projectData) => {
    try {
        const response = await axios.post('/api/projects', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

// Λήψη των διαθέσιμων έργων για freelancers
export const getAvailableProjects = async () => {
    try {
        const response = await axios.get('/api/projects/available');
        return response.data;
    } catch (error) {
        console.error('Error fetching available projects:', error);
        throw error;
    }
};

// Λήψη των αιτήσεων του freelancer
export const getFreelancerApplications = async (freelancerId) => {
    try {
        const response = await axios.get(`/api/applications/freelancer/${freelancerId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching freelancer applications:', error);
        throw error;
    }
};
