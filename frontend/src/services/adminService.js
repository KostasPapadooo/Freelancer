import axios from 'axios';

const API_URL = 'http://localhost:8080/api';  // Αντικαταστήστε με το σωστό URL του backend σας

export const getUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/users`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching users!", error);
        throw error;
    }
};

export const getProjects = async () => {
    try {
        const response = await axios.get(`${API_URL}/admin/projects`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching projects!", error);
        throw error;
    }
};
