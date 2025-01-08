import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Αντικαταστήστε με το σωστό URL του backend σας

/**
 * Σύνδεση χρήστη
 * @param {Object} credentials - Τα στοιχεία εισόδου του χρήστη (π.χ., email, password)
 * @returns {Object} - Πληροφορίες του συνδεδεμένου χρήστη
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Αποθήκευση του token και των πληροφοριών του χρήστη στο localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw error;
    }
};

/**
 * Αποσύνδεση χρήστη
 */
export const logoutUser = () => {
    try {
        // Καθαρισμός του token και του χρήστη από το localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};

/**
 * Ανάκτηση τρέχοντος χρήστη
 * @returns {Object} - Πληροφορίες του τρέχοντος συνδεδεμένου χρήστη
 */
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        throw error;
    }
};