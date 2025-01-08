import axios from 'axios';

const API_URL = 'http://localhost:8080/api';  // Αντικαταστήστε με το σωστό URL του backend σας

// Συνάρτηση για να πάρεις το token (μπορείς να το πάρεις από το localStorage ή το sessionStorage)
const getAuthToken = () => {
    return localStorage.getItem('authToken'); // Παράδειγμα, αναλόγως το πώς αποθηκεύεις το JWT
};

export const getUsers = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/admin/users`, {
            headers: {
                Authorization: `Bearer ${token}` // Στέλνουμε το JWT token
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching users!", error);
        throw error;
    }
};

export const getProjects = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/admin/projects`, {
            headers: {
                Authorization: `Bearer ${token}` // Στέλνουμε το JWT token
            }
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching projects!", error);
        throw error;
    }
};
