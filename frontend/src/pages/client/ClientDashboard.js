import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { getClientProjects, getApplicationsForProject } from "../../services/projectService"; // Σωστές συναρτήσεις
import ProjectCard from "../../components/Client/ProjectCard"; // Εισάγουμε το ProjectCard
import ApplicationCard from "../../components/ApplicationCard"; // Αντίστοιχο component για τις αιτήσεις

const ClientDashboard = () => {
    const [projects, setProjects] = useState([]);
    const [applications, setApplications] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Φόρτωση των έργων κατά την είσοδο στη σελίδα
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getClientProjects(1); // Ανάκτηση έργων από το backend (υποθέτουμε ότι ο πελάτης έχει ID = 1 για το παράδειγμα)
                setProjects(response);
                setLoading(false); // Ανάβουμε το loading σε false αφού φορτωθούν τα έργα
            } catch (error) {
                setError("Σφάλμα κατά την φόρτωση των έργων.");
                setLoading(false); // Σταματάει το loading σε περίπτωση σφάλματος
            }
        };

        fetchProjects();
    }, []);

    // Ανάκτηση αιτήσεων για το συγκεκριμένο έργο
    const handleFetchApplications = async (projectId) => {
        try {
            const response = await getApplicationsForProject(projectId); // Ανάκτηση αιτήσεων για το έργο
            setApplications((prevApplications) => ({
                ...prevApplications,
                [projectId]: response,
            }));
        } catch (error) {
            setError("Σφάλμα κατά την φόρτωση των αιτήσεων.");
        }
    };

    return (
        <Container>
            {loading ? (
                <Typography variant="h6">Φόρτωση έργων...</Typography>
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Κεντρική Σελίδα Πελάτη
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to="/client/create-project"
                        sx={{ marginBottom: "20px" }}
                    >
                        Δημιουργία Νέου Έργου
                    </Button>

                    {/* Εμφάνιση όλων των έργων με ProjectCard */}
                    <Grid container spacing={3}>
                        {projects.map((project) => (
                            <Grid item xs={12} md={6} lg={4} key={project.id}>
                                <ProjectCard project={project} /> {/* Προβολή του έργου */}
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => handleFetchApplications(project.id)}
                                    sx={{ marginTop: "10px" }}
                                >
                                    Δες Αιτήσεις
                                </Button>

                                {/* Εμφάνιση των αιτήσεων εάν υπάρχουν */}
                                {applications[project.id] && (
                                    <Box sx={{ marginTop: "20px" }}>
                                        <Typography variant="h6">Αιτήσεις για το έργο</Typography>
                                        <List>
                                            {applications[project.id].map((application) => (
                                                <ListItem key={application.id}>
                                                    <ListItemText
                                                        primary={`${application.freelancer.name} - ${application.status}`}
                                                        secondary={application.message}
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        color="success"
                                                        sx={{ marginRight: "10px" }}
                                                        // Για την αποδοχή της αίτησης
                                                    >
                                                        Αποδοχή
                                                    </Button>
                                                    <Button
                                                        variant="outlined"
                                                        color="error"
                                                        // Για την απόρριψη της αίτησης
                                                    >
                                                        Απόρριψη
                                                    </Button>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Box>
                                )}
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default ClientDashboard;
