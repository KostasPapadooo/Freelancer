import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Αντικαταστήστε με το σωστό URL του backend σας

/**
 * Λήψη όλων των ρόλων του συστήματος
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα των ρόλων
 */
export const getAllRoles = async () => {
    try {
        const response = await axios.get(`${API_URL}/roles`);
        return response.data;  // Επιστρέφει τον πίνακα των ρόλων από το backend
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};

/**
 * Ανάθεση ρόλου σε χρήστη
 * @param {string} userId - Το ID του χρήστη
 * @param {string} role - Ο ρόλος που θέλουμε να αναθέσουμε στον χρήστη
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της ανάθεσης
 */
export const assignRoleToUser = async (userId, role) => {
    try {
        const response = await axios.post(`${API_URL}/roles/assign`, { userId, role });
        return response.data;  // Επιστρέφει τα δεδομένα του χρήστη με το νέο του ρόλο
    } catch (error) {
        console.error('Error assigning role to user:', error);
        throw error;
    }
};

/**
 * Διαγραφή ρόλου από χρήστη
 * @param {string} userId - Το ID του χρήστη
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της διαγραφής του ρόλου
 */
export const removeRoleFromUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/roles/remove/${userId}`);
        return response.data;  // Επιστρέφει την επιτυχία ή το μήνυμα του backend
    } catch (error) {
        console.error('Error removing role from user:', error);
        throw error;
    }
};

/**
 * Επιστροφή του ρόλου ενός χρήστη
 * @param {string} userId - Το ID του χρήστη
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα του ρόλου του χρήστη
 */
export const getUserRole = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/roles/${userId}`);
        return response.data;  // Επιστρέφει το ρόλο του χρήστη
    } catch (error) {
        console.error('Error fetching user role:', error);
        throw error;
    }
};

/**
 * Ενημέρωση του ρόλου ενός χρήστη
 * @param {string} userId - Το ID του χρήστη
 * @param {string} role - Ο νέος ρόλος που θα ανατεθεί στον χρήστη
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της ενημέρωσης
 */
export const updateUserRole = async (userId, role) => {
    try {
        const response = await axios.put(`${API_URL}/roles/update/${userId}`, { role });
        return response.data;  // Επιστρέφει τα δεδομένα του χρήστη με τον νέο ρόλο
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
};
