import React, { useState, useEffect } from "react";
import { Container, Typography, Box, TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import { getFreelancerProfile, updateFreelancerProfile } from "../../services/userService"; // Υπηρεσίες για την ανάκτηση και ενημέρωση του προφίλ
import { useHistory } from "react-router-dom"; // Για τη μεταφορά στη σελίδα του dashboard

const FreelancerProfile = () => {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        bio: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const history = useHistory();

    // Ανάκτηση του προφίλ του freelancer
    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const response = await getFreelancerProfile();
                setProfile(response.data); // Ρύθμιση των δεδομένων του προφίλ
            } catch (err) {
                setError("Σφάλμα κατά την ανάκτηση του προφίλ.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Διαχείριση αλλαγών στις τιμές των πεδίων του προφίλ
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Υποβολή του ενημερωμένου προφίλ
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        try {
            await updateFreelancerProfile(profile);
            setSuccess(true);
        } catch (err) {
            setError("Σφάλμα κατά την ενημέρωση του προφίλ.");
        } finally {
            setIsUpdating(false);
        }
    };

    // Κλείσιμο του μηνύματος επιτυχίας
    const handleCloseSuccess = () => {
        setSuccess(false);
        history.push("/freelancer/dashboard"); // Μεταφορά στο dashboard του freelancer μετά την επιτυχία
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
                        Επεξεργασία Προφίλ
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Όνομα"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            fullWidth
                            required
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
                            label="Βιογραφικό"
                            name="bio"
                            value={profile.bio}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            margin="normal"
                        />

                        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Αναβάθμιση..." : "Ανανέωση Προφίλ"}
                            </Button>
                        </Box>
                    </form>

                    <Snackbar
                        open={success}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccess}
                        message="Το προφίλ ενημερώθηκε με επιτυχία"
                    />
                </Box>
            )}
        </Container>
    );
};

export default FreelancerProfile;
