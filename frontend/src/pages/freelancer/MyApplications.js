import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import { getFreelancerApplications } from "../../services/applicationService";

const MyApplications = () => {
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const applicationsData = await getFreelancerApplications();
                setApplications(applicationsData);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        };

        fetchApplications();
    }, []);

    return (
        <div>
            <h2>My Applications</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Project Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Budget</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((application) => (
                            <TableRow key={application.id}>
                                <TableCell>{application.projectTitle}</TableCell>
                                <TableCell>{application.status}</TableCell>
                                <TableCell>{application.budget}</TableCell>
                                <TableCell>
                                    <Button color="primary" href={`/freelancer/applications/${application.id}`}>
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default MyApplications;
