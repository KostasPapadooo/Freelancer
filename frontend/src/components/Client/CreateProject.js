import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, CircularProgress, Snackbar } from "@mui/material";
import { createProject } from "../../services/projectService"; // Υπηρεσία για την δημιουργία νέου έργου
import { useHistory } from "react-router-dom"; // Για να μεταφερθεί ο χρήστης στο dashboard του πελάτη

const CreateProject = () => {
    const [projectData, setProjectData] = useState({
        title: "",
        description: "",
        skillsRequired: "",
        budget: "",
        deadline: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const history = useHistory();

    // Χειρισμός αλλαγών στα πεδία του φόρμας
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjectData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Υποβολή της φόρμας για την δημιουργία νέου έργου
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            await createProject(projectData); // Κλήση της υπηρεσίας για την δημιουργία του έργου
            setSuccess(true); // Εμφάνιση μηνύματος επιτυχίας
        } catch (err) {
            setError("Σφάλμα κατά την δημιουργία του έργου. Παρακαλώ δοκιμάστε ξανά.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Κλείσιμο του μηνύματος επιτυχίας
    const handleCloseSuccess = () => {
        setSuccess(false);
        history.push("/client/dashboard"); // Μεταφορά στη σελίδα του dashboard του πελάτη
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Δημιουργία Έργου
            </Typography>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Τίτλος Έργου"
                            name="title"
                            value={projectData.title}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Περιγραφή Έργου"
                            name="description"
                            value={projectData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            multiline
                            rows={4}
                        />
                        <TextField
                            label="Απαιτούμενες Δεξιότητες"
                            name="skillsRequired"
                            value={projectData.skillsRequired}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Προϋπολογισμός"
                            name="budget"
                            value={projectData.budget}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            type="number"
                        />
                        <TextField
                            label="Ημερομηνία Παράδοσης"
                            name="deadline"
                            value={projectData.deadline}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />

                        <Box sx={{ marginTop: "20px", textAlign: "center" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Δημιουργία..." : "Δημιουργία Έργου"}
                            </Button>
                        </Box>
                    </form>

                    {error && (
                        <Typography variant="h6" color="error" sx={{ marginTop: 2 }}>
                            {error}
                        </Typography>
                    )}

                    <Snackbar
                        open={success}
                        autoHideDuration={6000}
                        onClose={handleCloseSuccess}
                        message="Το έργο δημιουργήθηκε με επιτυχία"
                    />
                </Box>
            )}
        </Container>
    );
};

export default CreateProject;
