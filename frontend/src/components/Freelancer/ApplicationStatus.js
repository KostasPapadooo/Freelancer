import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Paper, CircularProgress, Button } from "@mui/material";
import { fetchApplicationStatus } from "../../services/applicationService"; // Υποθέτω ότι υπάρχει αυτή η συνάρτηση για την ανάκτηση της κατάστασης μιας αίτησης

const ApplicationStatus = () => {
    const { applicationId } = useParams(); // Παίρνουμε το applicationId από το URL
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetchApplicationStatus(applicationId); // Ανάκτηση δεδομένων αίτησης
                setApplication(response.data);
                setLoading(false);
            } catch (err) {
                setError("Αποτυχία φόρτωσης της κατάστασης της αίτησης.");
                setLoading(false);
            }
        };

        fetchStatus();
    }, [applicationId]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container>
            <Paper elevation={3} sx={{ padding: "20px", marginTop: "20px" }}>
                <Typography variant="h4" gutterBottom>
                    Κατάσταση Αίτησης
                </Typography>
                <Typography variant="h6">
                    Έργο: {application.projectTitle}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                    Περιγραφή: {application.projectDescription}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                    Κατάσταση:{" "}
                    <span
                        style={{
                            color:
                                application.status === "ACCEPTED"
                                    ? "green"
                                    : application.status === "REJECTED"
                                        ? "red"
                                        : "blue",
                        }}
                    >
                        {application.status === "ACCEPTED"
                            ? "Αποδεκτή"
                            : application.status === "REJECTED"
                                ? "Απορριφθείσα"
                                : "Σε εκκρεμότητα"}
                    </span>
                </Typography>
                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                    Μήνυμα Πελάτη:{" "}
                    {application.clientMessage
                        ? application.clientMessage
                        : "Δεν υπάρχει μήνυμα από τον πελάτη."}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    href="/freelancer"
                    sx={{ marginTop: "20px" }}
                >
                    Επιστροφή στον Πίνακα Ελέγχου
                </Button>
            </Paper>
        </Container>
    );
};

export default ApplicationStatus;
