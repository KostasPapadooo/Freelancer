import axios from "axios";

const API_URL = "http://localhost:8080/api/applications"; // Αντικαταστήστε με το σωστό URL του backend σας

// Συνάρτηση για να πάρεις το token (μπορείς να το πάρεις από το localStorage ή το sessionStorage)
const getAuthToken = () => {
    return localStorage.getItem("authToken"); // Παράδειγμα, αναλόγως το πώς αποθηκεύεις το JWT
};

export const applyForProject = async (applicationData) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.post(
            `${API_URL}/freelancer/applications`,
            applicationData,
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("There was an error applying for the project!", error);
        throw error;
    }
};

export const getFreelancerApplications = async () => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`${API_URL}/freelancer/applications`, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching freelancer's applications!", error);
        throw error;
    }
};

// Συνάρτηση για την ανάκτηση της κατάστασης μιας συγκεκριμένης αίτησης
export const fetchApplicationStatus = async (applicationId) => {
    try {
        const token = getAuthToken(); // Λήψη του token
        const response = await axios.get(`${API_URL}/applications/${applicationId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Προσθήκη του token στα headers
            },
        });
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the application status!", error);
        throw error;
    }
};
