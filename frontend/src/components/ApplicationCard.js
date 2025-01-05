// src/components/ApplicationCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ApplicationCard = ({ application }) => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6">{application.title}</Typography>
                <Typography>{application.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default ApplicationCard;
