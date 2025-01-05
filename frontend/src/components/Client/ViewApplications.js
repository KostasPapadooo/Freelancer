import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { fetchApplicationsForProject } from "../../services/projectService"; // Συνάρτηση που καλεί το backend για τις αιτήσεις
import ApplicationCard from "../../components/ApplicationCard"; // Υποθέτω ότι υπάρχει το ApplicationCard component για το rendering των αιτήσεων

const ViewApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { projectId } = useParams(); // Παίρνουμε το projectId από τις παραμέτρους της διαδρομής

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetchApplicationsForProject(projectId); // Ανάκτηση αιτήσεων για το συγκεκριμένο έργο
                setApplications(response.data);
                setLoading(false); // Ολοκληρώθηκε η φόρτωση
            } catch (error) {
                setError("Σφάλμα κατά την φόρτωση των αιτήσεων.");
                setLoading(false);
            }
        };

        fetchApplications();
    }, [projectId]); // Κάθε φορά που το projectId αλλάζει, ξαναφορτώνουμε τις αιτήσεις

    return (
        <Container>
            {loading ? (
                <Typography variant="h6">Φόρτωση αιτήσεων...</Typography>
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Αιτήσεις για το Έργο
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/client"
                        sx={{ marginBottom: "20px" }}
                    >
                        Επιστροφή στην Κεντρική Σελίδα
                    </Button>

                    <Grid container spacing={3}>
                        {applications.length > 0 ? (
                            applications.map((application) => (
                                <Grid item xs={12} md={6} lg={4} key={application.id}>
                                    <ApplicationCard application={application} /> {/* Υποθέτω ότι το ApplicationCard έχει ήδη φτιαχτεί */}
                                    <Box sx={{ marginTop: "10px" }}>
                                        <Typography variant="h6">Αιτήσεις</Typography>
                                        <List>
                                            <ListItem key={application.id}>
                                                <ListItemText
                                                    primary={`${application.freelancer.name} - ${application.status}`}
                                                    secondary={application.message}
                                                />
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    sx={{ marginRight: "10px" }}
                                                    onClick={() => handleAccept(application.id)}
                                                >
                                                    Αποδοχή
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="error"
                                                    onClick={() => handleReject(application.id)}
                                                >
                                                    Απόρριψη
                                                </Button>
                                            </ListItem>
                                        </List>
                                    </Box>
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="h6">Δεν υπάρχουν αιτήσεις για το έργο αυτό.</Typography>
                        )}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

// Συνάρτηση για την αποδοχή μιας αίτησης
const handleAccept = async (applicationId) => {
    try {
        // Κάλεσε τη συνάρτηση του backend για αποδοχή αίτησης
        // Θα πρέπει να φτιάξεις την αντίστοιχη συνάρτηση στο projectService.js
        await acceptApplication(applicationId);
        alert("Η αίτηση έγινε αποδεκτή!");
    } catch (error) {
        alert("Σφάλμα κατά την αποδοχή της αίτησης.");
    }
};

// Συνάρτηση για την απόρριψη μιας αίτησης
const handleReject = async (applicationId) => {
    try {
        // Κάλεσε τη συνάρτηση του backend για απόρριψη αίτησης
        // Θα πρέπει να φτιάξεις την αντίστοιχη συνάρτηση στο projectService.js
        await rejectApplication(applicationId);
        alert("Η αίτηση απορρίφθηκε!");
    } catch (error) {
        alert("Σφάλμα κατά την απόρριψη της αίτησης.");
    }
};

export default ViewApplications;
