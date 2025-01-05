import React, { useState, useEffect } from "react";
import {
    Container, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box
} from "@mui/material";
import { fetchUserById, updateUserRole, deleteUser } from "../../services/userService"; // Υποθέτω ότι αυτές οι συναρτήσεις υπάρχουν στον service

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetchUserById(userId);
                setUser(response.data);
                setNewRole(response.data.role);
            } catch (error) {
                setError("Σφάλμα κατά την φόρτωση των δεδομένων του χρήστη.");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [userId]);

    const handleRoleChange = async () => {
        try {
            await updateUserRole(userId, newRole);
            setUser((prevUser) => ({
                ...prevUser,
                role: newRole,
            }));
        } catch (error) {
            setError("Σφάλμα κατά την αλλαγή του ρόλου.");
        }
    };

    const handleDeleteUser = async () => {
        try {
            await deleteUser(userId);
            // Ανάλυση του χρήστη με ανακατεύθυνση ή άλλο τρόπο.
            alert("Ο χρήστης διαγράφηκε επιτυχώς!");
        } catch (error) {
            setError("Σφάλμα κατά τη διαγραφή του χρήστη.");
        }
    };

    return (
        <Container>
            {loading ? (
                <Typography variant="h6">Φόρτωση προφίλ...</Typography>
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Προφίλ Χρήστη
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Όνομα: {user.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Email: {user.email}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Ρόλος: {user.role}
                    </Typography>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Αλλαγή Ρόλου</InputLabel>
                        <Select
                            value={newRole}
                            onChange={(e) => setNewRole(e.target.value)}
                        >
                            <MenuItem value="Admin">Διαχειριστής</MenuItem>
                            <MenuItem value="Client">Πελάτης</MenuItem>
                            <MenuItem value="Freelancer">Ελεύθερος Επαγγελματίας</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRoleChange}
                        fullWidth
                        margin="normal"
                    >
                        Αλλαγή Ρόλου
                    </Button>

                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleDeleteUser}
                        fullWidth
                        margin="normal"
                    >
                        Διαγραφή Χρήστη
                    </Button>
                </Box>
            )}
        </Container>
    );
};

export default UserProfile;
