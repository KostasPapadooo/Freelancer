import axios from "axios";

const API_URL = "http://localhost:8080/api"; // Αντικαταστήστε με το σωστό URL του backend σας

export const applyForProject = async (applicationData) => {
    try {
        const response = await axios.post(`${API_URL}/freelancer/applications`, applicationData);
        return response.data;
    } catch (error) {
        console.error("There was an error applying for the project!", error);
        throw error;
    }
};

export const getFreelancerApplications = async () => {
    try {
        const response = await axios.get(`${API_URL}/freelancer/applications`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching freelancer's applications!", error);
        throw error;
    }
};

// Συνάρτηση για την ανάκτηση της κατάστασης μιας συγκεκριμένης αίτησης
export const fetchApplicationStatus = async (applicationId) => {
    try {
        const response = await axios.get(`${API_URL}/applications/${applicationId}`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the application status!", error);
        throw error;
    }
};
