import axios from 'axios';

// Συνάρτηση για να πάρεις το token (μπορείς να το πάρεις από το localStorage ή το sessionStorage)
const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Παράδειγμα, αναλόγως το πώς αποθηκεύεις το JWT
};

// Λήψη των έργων του πελάτη
export const getClientProjects = async (clientId) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`/api/projects/client/${clientId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching client projects:', error);
        throw error;
    }
};

// Λήψη των αιτήσεων για έργο
export const getApplicationsForProject = async (projectId) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`/api/applications/project/${projectId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching applications for project:', error);
        throw error;
    }
};

// Δημιουργία νέου έργου
export const createProject = async (projectData) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.post('/api/projects', projectData, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

// Λήψη των διαθέσιμων έργων για freelancers
export const getAvailableProjects = async () => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get('/api/projects/available', {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching available projects:', error);
        throw error;
    }
};

// Λήψη των αιτήσεων του freelancer
export const getFreelancerApplications = async (freelancerId) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`/api/applications/freelancer/${freelancerId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching freelancer applications:', error);
        throw error;
    }
};
