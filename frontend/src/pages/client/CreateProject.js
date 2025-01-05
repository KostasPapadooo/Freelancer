import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { createProject } from "../../services/projectService";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [budget, setBudget] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            title,
            description,
            budget,
        };

        try {
            await createProject(projectData);
            navigate("/client/my-projects");  // Κατευθύνει τον χρήστη στα έργα του
        } catch (error) {
            console.error("Failed to create project:", error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <h2>Create New Project</h2>
            <TextField
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                multiline
                rows={4}
            />
            <TextField
                label="Budget"
                variant="outlined"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
                type="number"
            />
            <Button type="submit" variant="contained" color="primary">
                Create Project
            </Button>
        </Box>
    );
};

export default CreateProject;
