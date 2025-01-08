import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // Αντικαταστήστε με το σωστό URL του backend σας

// Συνάρτηση για να πάρεις το token (μπορείς να το πάρεις από το localStorage ή το sessionStorage)
const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Παράδειγμα, αναλόγως το πώς αποθηκεύεις το JWT
};

/**
 * Λήψη όλων των ρόλων του συστήματος
 * @returns {Promise} - Υποσχέσεις για τα δεδομένα των ρόλων
 */
export const getAllRoles = async () => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`${API_URL}/roles`, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;  // Επιστρέφει τον πίνακα των ρόλων από το backend
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
};
