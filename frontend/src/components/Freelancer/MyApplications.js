import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material";
import { getFreelancerApplications } from "../../services/applicationService";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await getFreelancerApplications();
                setApplications(response);
                setLoading(false);
            } catch (error) {
                setError("Σφάλμα κατά τη φόρτωση των αιτήσεων.");
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Οι Αιτήσεις μου
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : applications.length === 0 ? (
                <Typography variant="body1">Δεν έχετε υποβάλει καμία αίτηση ακόμα.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Όνομα Έργου</TableCell>
                                <TableCell>Ημερομηνία Υποβολής</TableCell>
                                <TableCell>Κατάσταση</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {applications.map((application) => (
                                <TableRow key={application.id}>
                                    <TableCell>{application.projectName}</TableCell>
                                    <TableCell>{new Date(application.submissionDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{application.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default MyApplications;
