import axios from 'axios';

// Δημιουργία μιας βασικής ρύθμισης για το Axios
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Το base URL του backend
    withCredentials: true, // Ενεργοποιεί την αποστολή cookies και JWT tokens
});

// Αίτημα για τον τρέχοντα χρήστη (current user)
export const getCurrentUser = () => {
    return api.get('/auth/currentUser')  // Κλήση του endpoint για τον τρέχοντα χρήστη
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching current user:", error);
            throw error;
        });
};

// Αίτημα για login χρήστη
export const login = (userData) => {
    return api.post('/auth/login', userData)  // Κλήση του login endpoint
        .then(response => response.data)
        .catch(error => {
            console.error("Error logging in:", error);
            throw error;
        });
};

// Αίτημα για logout χρήστη
export const logout = () => {
    return api.post('/auth/logout')  // Κλήση του logout endpoint
        .then(response => response.data)
        .catch(error => {
            console.error("Error logging out:", error);
            throw error;
        });
};

// Αίτημα για την ανάκτηση πληροφοριών για τα έργα (projects)
export const getProjects = () => {
    return api.get('/projects')  // Κλήση του endpoint για τα έργα
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching projects:", error);
            throw error;
        });
};

// Εξαγωγή του api για χρήση σε άλλα μέρη της εφαρμογής
export default api;
