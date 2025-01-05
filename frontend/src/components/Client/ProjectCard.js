import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';  // Χρησιμοποιούμε το useNavigate αντί για το useHistory

const ProjectCard = ({ project }) => {
    const navigate = useNavigate();  // Δημιουργία του navigate

    const handleViewProject = () => {
        navigate(`/client/projects/${project.id}`);  // Χρησιμοποιούμε το navigate για πλοήγηση
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{project.title}</Typography>
                <Typography>{project.description}</Typography>
                <Button onClick={handleViewProject} variant="contained" color="primary">
                    View Project
                </Button>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;
