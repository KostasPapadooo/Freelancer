import React, { useEffect, useState } from "react";
import { Container, TextField, Button, Typography, Box, CircularProgress } from "@mui/material";
import { updateClientProfile, getClientProfile } from "../../services/userService"; // Υποθέτω ότι η υπηρεσία υπάρχει για την ανάκτηση και ενημέρωση του προφίλ
import { useHistory } from "react-router-dom";

const ClientProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // Για να εναλλάσσουμε την κατάσταση μεταξύ προβολής και επεξεργασίας του προφίλ
    const history = useHistory();

    // Ανάκτηση προφίλ πελάτη κατά την φόρτωση της σελίδας
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await getClientProfile(); // Υποθέτω ότι η συνάρτηση αυτή καλεί το backend για την ανάκτηση του προφίλ
                setProfile(response.data);
            } catch (error) {
                setError("Σφάλμα κατά την φόρτωση του προφίλ.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Διαχείριση αλλαγών στο προφίλ
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Υποβολή των αλλαγών στο προφίλ
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateClientProfile(profile); // Υποθέτω ότι αυτή η συνάρτηση στέλνει το ενημερωμένο προφίλ στο backend
            setIsEditing(false); // Επιστροφή σε κατάσταση προβολής
        } catch (error) {
            setError("Σφάλμα κατά την ενημέρωση του προφίλ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Προφίλ Πελάτη
                    </Typography>

                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Όνομα"
                                name="name"
                                value={profile.name}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                name="email"
                                value={profile.email}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                type="email"
                            />
                            <TextField
                                label="Τηλέφωνο"
                                name="phone"
                                value={profile.phone}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Εταιρεία"
                                name="company"
                                value={profile.company}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <Box sx={{ marginTop: "20px" }}>
                                <Button variant="contained" color="primary" type="submit">
                                    Αποθήκευση Αλλαγών
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setIsEditing(false)}
                                    sx={{ marginLeft: "10px" }}
                                >
                                    Ακύρωση
                                </Button>
                            </Box>
                        </form>
                    ) : (
                        <Box>
                            <Typography variant="h6">Όνομα: {profile.name}</Typography>
                            <Typography variant="h6">Email: {profile.email}</Typography>
                            <Typography variant="h6">Τηλέφωνο: {profile.phone}</Typography>
                            <Typography variant="h6">Εταιρεία: {profile.company}</Typography>

                            <Box sx={{ marginTop: "20px" }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Επεξεργασία
                                </Button>
                            </Box>
                        </Box>
                    )}
                </Box>
            )}
        </Container>
    );
};

export default ClientProfile;
