import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { applyForProject } from "../../services/applicationService";
import { useNavigate } from "react-router-dom";

const ApplyForProject = () => {
    const { projectId } = useParams();
    const [proposal, setProposal] = useState("");
    const [budget, setBudget] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const applicationData = {
            projectId,
            proposal,
            budget,
        };

        try {
            await applyForProject(applicationData);
            navigate("/freelancer/my-applications"); // Κατευθύνει στις αιτήσεις του freelancer
        } catch (error) {
            console.error("Failed to apply for project:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <h2>Apply for Project</h2>
            <TextField
                label="Proposal"
                variant="outlined"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                required
                multiline
                rows={4}
            />
            <TextField
                label="Proposed Budget"
                variant="outlined"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                type="number"
            />
            <Button type="submit" variant="contained" color="primary">
                Submit Application
            </Button>
        </Box>
    );
};

export default ApplyForProject;
