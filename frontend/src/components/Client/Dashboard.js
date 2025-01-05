import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Container, Grid, CircularProgress, Snackbar } from "@mui/material";
import { getProjects } from "../../services/projectService"; // Υπηρεσία για την ανάκτηση των έργων του πελάτη
import { useHistory } from "react-router-dom";

const ClientDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const history = useHistory();

    // Ανάκτηση των έργων του πελάτη όταν φορτώνει η σελίδα
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getProjects(); // Κλήση υπηρεσίας για την ανάκτηση των έργων
                setProjects(response); // Αποθήκευση των έργων στο state
            } catch (err) {
                setError("Σφάλμα κατά την ανάκτηση των έργων. Παρακαλώ δοκιμάστε ξανά.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Διαχείριση της προβολής του έργου
    const handleViewProject = (projectId) => {
        history.push(`/client/view-project/${projectId}`); // Μεταφορά στο page προβολής του επιλεγμένου έργου
    };

    // Διαχείριση της δημιουργίας νέου έργου
    const handleCreateProject = () => {
        history.push("/client/create-project"); // Μεταφορά στη σελίδα δημιουργίας νέου έργου
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dashboard Πελάτη
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Box sx={{ marginBottom: "20px", textAlign: "center" }}>
                        <Button variant="contained" color="primary" onClick={handleCreateProject}>
                            Δημιουργία Νέου Έργου
                        </Button>
                    </Box>

                    {error && (
                        <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <Grid container spacing={3}>
                        {projects.length === 0 ? (
                            <Typography variant="h6" sx={{ width: "100%", textAlign: "center" }}>
                                Δεν υπάρχουν έργα.
                            </Typography>
                        ) : (
                            projects.map((project) => (
                                <Grid item xs={12} sm={6} md={4} key={project.id}>
                                    <Box
                                        sx={{
                                            border: "1px solid #ddd",
                                            padding: "16px",
                                            borderRadius: "8px",
                                            textAlign: "center",
                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        <Typography variant="h6">{project.title}</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ marginBottom: "16px" }}>
                                            {project.description.length > 100
                                                ? `${project.description.substring(0, 100)}...`
                                                : project.description}
                                        </Typography>

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleViewProject(project.id)}
                                        >
                                            Προβολή
                                        </Button>
                                    </Box>
                                </Grid>
                            ))
                        )}
                    </Grid>

                    <Snackbar
                        open={success}
                        autoHideDuration={6000}
                        onClose={() => setSuccess(false)}
                        message="Επιτυχής Δημιουργία Έργου"
                    />
                </Box>
            )}
        </Container>
    );
};

export default ClientDashboard;
