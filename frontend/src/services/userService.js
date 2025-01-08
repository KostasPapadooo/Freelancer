import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users'; // Αντικαταστήστε με το σωστό URL του backend σας

// Συνάρτηση για να πάρεις το token (μπορείς να το πάρεις από το localStorage ή το sessionStorage)
const getAuthToken = () => {
    return localStorage.getItem("token"); // Παράδειγμα, αναλόγως το πώς αποθηκεύεις το JWT
};

/**
 * Λήψη όλων των χρηστών
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα των χρηστών
 */
export const getAllUsers = async () => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`${API_URL}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data; // Επιστρέφει τη λίστα των χρηστών
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

/**
 * Δημιουργία νέου χρήστη
 * @param {Object} userData - Τα δεδομένα του χρήστη που θα δημιουργηθεί
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της δημιουργίας
 */
export const createUser = async (userData) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.post(`${API_URL}/register`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data; // Επιστρέφει τα δεδομένα του νέου χρήστη
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

/**
 * Λήψη δεδομένων χρήστη
 * @param {string} userId - Το ID του χρήστη
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα του χρήστη
 */
export const getUserById = async (userId) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

/**
 * Ενημέρωση δεδομένων χρήστη
 * @param {string} userId - Το ID του χρήστη που θα ενημερωθεί
 * @param {Object} userData - Τα νέα δεδομένα του χρήστη
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της ενημέρωσης
 */
export const updateUser = async (userId, userData) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.put(`${API_URL}/${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

/**
 * Διαγραφή χρήστη
 * @param {string} userId - Το ID του χρήστη που θα διαγραφεί
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της διαγραφής
 */
export const deleteUser = async (userId) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.delete(`${API_URL}/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

/**
 * Αλλαγή κωδικού χρήστη
 * @param {string} userId - Το ID του χρήστη για τον οποίο θα αλλάξει ο κωδικός
 * @param {Object} passwordData - Τα δεδομένα του νέου κωδικού
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της αλλαγής του κωδικού
 */
export const changePassword = async (userId, passwordData) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.put(`${API_URL}/change-password/${userId}`, passwordData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

/**
 * Επιστροφή του τρέχοντος χρήστη
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα του συνδεδεμένου χρήστη
 */
export const getCurrentUser = async () => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`${API_URL}/current-user`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};