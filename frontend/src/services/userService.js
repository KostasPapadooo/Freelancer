import axios from 'axios';

// Εισάγουμε την βάση URL για την API του backend
const API_URL = 'http://localhost:8080/api/users'; // Αντικαταστήστε με το σωστό URL του backend σας

/**
 * Λήψη όλων των χρηστών
 * Αυτή η συνάρτηση χρησιμοποιείται για να πάρουμε τη λίστα όλων των χρηστών του συστήματος.
 * Χρησιμοποιείται κυρίως από το Admin για να διαχειρίζεται χρήστες.
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα των χρηστών
 */
export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;  // Επιστρέφει τη λίστα των χρηστών
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

/**
 * Δημιουργία νέου χρήστη
 * Αυτή η συνάρτηση χρησιμοποιείται για να δημιουργήσουμε έναν νέο χρήστη στο σύστημα.
 * @param {Object} userData - Τα δεδομένα του χρήστη που θα δημιουργηθεί
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της δημιουργίας
 */
export const createUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;  // Επιστρέφει τα δεδομένα του νέου χρήστη
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
};

/**
 * Λήψη δεδομένων χρήστη
 * Αυτή η συνάρτηση χρησιμοποιείται για να πάρουμε τα δεδομένα ενός χρήστη με βάση το ID του.
 * Χρησιμοποιείται για να ανακτήσουμε τα προφίλ των χρηστών.
 * @param {string} userId - Το ID του χρήστη για τον οποίο θέλουμε να πάρουμε τα δεδομένα
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα του χρήστη
 */
export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;  // Επιστρέφει τα δεδομένα του χρήστη
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
};

/**
 * Ενημέρωση δεδομένων χρήστη
 * Αυτή η συνάρτηση χρησιμοποιείται για να ενημερώσουμε τα δεδομένα ενός χρήστη (π.χ. όνομα, email κ.λπ.).
 * @param {string} userId - Το ID του χρήστη που θα ενημερωθεί
 * @param {Object} userData - Τα νέα δεδομένα του χρήστη
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της ενημέρωσης
 */
export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${API_URL}/${userId}`, userData);
        return response.data;  // Επιστρέφει τα νέα δεδομένα του χρήστη
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
};

/**
 * Διαγραφή χρήστη
 * Αυτή η συνάρτηση χρησιμοποιείται για να διαγράψουμε έναν χρήστη από το σύστημα.
 * @param {string} userId - Το ID του χρήστη που θα διαγραφεί
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της διαγραφής
 */
export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${API_URL}/${userId}`);
        return response.data;  // Επιστρέφει το μήνυμα επιτυχίας ή αποτυχίας
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

/**
 * Αλλαγή κωδικού χρήστη
 * Αυτή η συνάρτηση χρησιμοποιείται για να αλλάξουμε τον κωδικό ενός χρήστη.
 * @param {string} userId - Το ID του χρήστη για τον οποίο θα αλλάξει ο κωδικός
 * @param {Object} passwordData - Τα δεδομένα του νέου κωδικού (νέος κωδικός κ.λπ.)
 * @returns {Promise} - Υποσχέσεις για την επιτυχία ή αποτυχία της αλλαγής του κωδικού
 */
export const changePassword = async (userId, passwordData) => {
    try {
        const response = await axios.put(`${API_URL}/change-password/${userId}`, passwordData);
        return response.data;  // Επιστρέφει την επιτυχία ή αποτυχία
    } catch (error) {
        console.error('Error changing password:', error);
        throw error;
    }
};

/**
 * Επιστροφή του τρέχοντος χρήστη
 * Αυτή η συνάρτηση χρησιμοποιείται για να πάρουμε τα δεδομένα του χρήστη που είναι συνδεδεμένος στο σύστημα.
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα του τρέχοντος χρήστη
 */
export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/current-user`);
        return response.data;  // Επιστρέφει τα δεδομένα του συνδεδεμένου χρήστη
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error;
    }
};
