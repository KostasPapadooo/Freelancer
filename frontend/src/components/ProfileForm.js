import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, CircularProgress, Alert } from "@mui/material";
import { getUserProfile, updateUserProfile } from "../services/userService";

const ProfileForm = () => {
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        bio: "",
        skills: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getUserProfile();
                setProfileData(data);
                setLoading(false);
            } catch (error) {
                setError("Σφάλμα κατά τη φόρτωση των δεδομένων προφίλ.");
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await updateUserProfile(profileData);
            setSuccess(true);
        } catch (error) {
            setError("Σφάλμα κατά την ενημέρωση του προφίλ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>
                Ενημέρωση Προφίλ
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Όνομα"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Επώνυμο"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        type="email"
                    />
                    <TextField
                        label="Σύντομο Βιογραφικό"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <TextField
                        label="Δεξιότητες (χωρισμένες με κόμμα)"
                        name="skills"
                        value={profileData.skills}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    {error && <Alert severity="error">{error}</Alert>}
                    {success && <Alert severity="success">Το προφίλ ενημερώθηκε με επιτυχία!</Alert>}
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Αποθήκευση
                    </Button>
                </form>
            )}
        </Container>
    );
};

export default ProfileForm;
