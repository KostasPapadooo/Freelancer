import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFreelancerApplications } from "../../services/applicationService";
import { fetchAvailableProjects } from "../../services/projectService";

const FreelancerDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [availableProjects, setAvailableProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [applicationResponse, projectResponse] = await Promise.all([
                    getFreelancerApplications(),
                    fetchAvailableProjects(),
                ]);
                setApplications(applicationResponse.data);
                setAvailableProjects(projectResponse.data);
                setLoading(false);
            } catch (error) {
                setError("Σφάλμα κατά την φόρτωση δεδομένων του πίνακα ελέγχου.");
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const handleViewApplications = () => {
        navigate("/freelancer/my-applications");
    };

    const handleViewAvailableProjects = () => {
        navigate("/freelancer/available-projects");
    };

    return (
        <Container>
            {loading ? (
                <Typography variant="h6">Φόρτωση...</Typography>
            ) : error ? (
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Πίνακας Ελέγχου Freelancer
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Οι Αιτήσεις μου</Typography>
                                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                                    Συνολικές αιτήσεις: {applications.length}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: "20px" }}
                                    onClick={handleViewApplications}
                                >
                                    Δείτε τις αιτήσεις σας
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Διαθέσιμα Έργα</Typography>
                                <Typography variant="body1" sx={{ marginTop: "10px" }}>
                                    Συνολικά διαθέσιμα έργα: {availableProjects.length}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ marginTop: "20px" }}
                                    onClick={handleViewAvailableProjects}
                                >
                                    Δείτε τα διαθέσιμα έργα
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default FreelancerDashboard;
