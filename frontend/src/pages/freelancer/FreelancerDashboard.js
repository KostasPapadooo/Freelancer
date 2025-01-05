import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box, Button, CircularProgress } from "@mui/material";
import { getAvailableProjects, getFreelancerApplications } from "../../services/projectService"; // Υπηρεσίες για την ανάκτηση έργων και αιτήσεων
import { Link } from "react-router-dom"; // Για τη σύνδεση με την σελίδα υποβολής αίτησης
import ProjectCard from "../../components/ProjectCard"; // Υποθέτω ότι έχεις δημιουργήσει ένα component για την προβολή των έργων

const FreelancerDashboard = () => {
    const [availableProjects, setAvailableProjects] = useState([]);
    const [myApplications, setMyApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Ανάκτηση έργων και αιτήσεων κατά την αρχική φόρτωση της σελίδας
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const projectsResponse = await getAvailableProjects(); // Ανάκτηση διαθέσιμων έργων
                setAvailableProjects(projectsResponse.data);

                const applicationsResponse = await getFreelancerApplications(); // Ανάκτηση αιτήσεων του freelancer
                setMyApplications(applicationsResponse.data);
            } catch (err) {
                setError("Σφάλμα κατά την φόρτωση των δεδομένων.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                        Dashboard Ελεύθερου Επαγγελματία
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        Διαθέσιμα Έργα
                    </Typography>
                    <Grid container spacing={2}>
                        {availableProjects.length > 0 ? (
                            availableProjects.map((project) => (
                                <Grid item xs={12} sm={6} md={4} key={project.id}>
                                    <ProjectCard project={project} />
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="body1">Δεν υπάρχουν διαθέσιμα έργα προς υποβολή αιτήσεων.</Typography>
                        )}
                    </Grid>

                    <Box sx={{ marginTop: "40px" }}>
                        <Typography variant="h6" gutterBottom>
                            Αιτήσεις που Έχετε Υποβάλει
                        </Typography>
                        {myApplications.length > 0 ? (
                            <Grid container spacing={2}>
                                {myApplications.map((application) => (
                                    <Grid item xs={12} sm={6} md={4} key={application.id}>
                                        <Box sx={{ padding: "10px", border: "1px solid #ccc", borderRadius: "8px" }}>
                                            <Typography variant="h6">{application.projectTitle}</Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                Κατάσταση: {application.status}
                                            </Typography>
                                            <Button
                                                component={Link}
                                                to={`/freelancer/my-application/${application.id}`}
                                                variant="contained"
                                                color="primary"
                                                sx={{ marginTop: "10px" }}
                                            >
                                                Δείτε Λεπτομέρειες
                                            </Button>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body1">Δεν έχετε υποβάλει αιτήσεις σε έργα.</Typography>
                        )}
                    </Box>

                    <Box sx={{ marginTop: "40px" }}>
                        <Link to="/freelancer/apply-for-project">
                            <Button variant="contained" color="primary">
                                Υποβολή Αίτησης για Νέο Έργο
                            </Button>
                        </Link>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default FreelancerDashboard;
