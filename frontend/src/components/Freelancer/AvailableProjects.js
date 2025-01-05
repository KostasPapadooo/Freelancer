import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { fetchAvailableProjects } from "../../services/projectService";
import { applyForProject } from "../../services/applicationService";
import ProjectCard from "../../components/ProjectCard";

const AvailableProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetchAvailableProjects();
                setProjects(response.data);
                setLoading(false);
            } catch (error) {
                setError("Σφάλμα κατά την φόρτωση των διαθέσιμων έργων.");
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const handleApply = async (projectId) => {
        try {
            const applicationData = {
                projectId: projectId,
                message: "Ενδιαφέρομαι για αυτό το έργο.", // Προσαρμόστε το μήνυμα αν χρειάζεται
            };
            await applyForProject(applicationData);
            alert("Η αίτηση υποβλήθηκε επιτυχώς!");
        } catch (error) {
            alert("Υπήρξε πρόβλημα κατά την υποβολή της αίτησης.");
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
            ) : projects.length === 0 ? (
                <Typography variant="h6">Δεν υπάρχουν διαθέσιμα έργα προς το παρόν.</Typography>
            ) : (
                <Box>
                    <Typography variant="h4" gutterBottom>
                        Διαθέσιμα Έργα
                    </Typography>
                    <Grid container spacing={3}>
                        {projects.map((project) => (
                            <Grid item xs={12} md={6} lg={4} key={project.id}>
                                <ProjectCard project={project} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleApply(project.id)}
                                    sx={{ marginTop: "10px" }}
                                >
                                    Υποβολή Αίτησης
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Container>
    );
};

export default AvailableProjects;
