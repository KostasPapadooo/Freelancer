import React, { useState, useEffect } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Select, MenuItem } from "@mui/material";
import { fetchProjects, updateProjectStatus } from "../../services/projectService"; // Υποθέτω ότι οι λειτουργίες βρίσκονται εδώ

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchProjects();
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleStatusChange = async (projectId, newStatus) => {
        try {
            await updateProjectStatus(projectId, newStatus);
            setProjects((prevProjects) =>
                prevProjects.map((project) =>
                    project.id === projectId ? { ...project, status: newStatus } : project
                )
            );
        } catch (error) {
            console.error("Error updating project status:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Διαχείριση Έργων
            </Typography>
            {loading ? (
                <Typography>Φόρτωση δεδομένων...</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Όνομα Έργου</TableCell>
                                <TableCell>Περιγραφή</TableCell>
                                <TableCell>Κατάσταση</TableCell>
                                <TableCell>Ενέργειες</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map((project) => (
                                <TableRow key={project.id}>
                                    <TableCell>{project.name}</TableCell>
                                    <TableCell>{project.description}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={project.status}
                                            onChange={(e) => handleStatusChange(project.id, e.target.value)}
                                        >
                                            <MenuItem value="Pending">Σε Εκκρεμότητα</MenuItem>
                                            <MenuItem value="Approved">Εγκρίθηκε</MenuItem>
                                            <MenuItem value="Rejected">Απορρίφθηκε</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleStatusChange(project.id, "Rejected")}
                                        >
                                            Απόρριψη
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={() => handleStatusChange(project.id, "Approved")}
                                            style={{ marginLeft: "10px" }}
                                        >
                                            Έγκριση
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default ManageProjects;
