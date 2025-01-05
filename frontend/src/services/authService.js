import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Αντικαταστήστε με το σωστό URL του backend σας

/**
 * Σύνδεση χρήστη
 * @param {Object} credentials - Τα στοιχεία εισόδου του χρήστη (π.χ., email, password)
 * @returns {Object} - Πληροφορίες του συνδεδεμένου χρήστη
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

/**
 * Αποσύνδεση χρήστη
 */
export const logoutUser = async () => {
    try {
        await axios.post(`${API_URL}/logout`);
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};

/**
 * Ανάκτηση τρέχοντος χρήστη
 * @returns {Object} - Πληροφορίες του τρέχοντος συνδεδεμένου χρήστη
 */
export const getCurrentUser = async () => {
    try {
        const response = await axios.get(`${API_URL}/currentUser`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch current user:", error);
        throw error;
    }
};
