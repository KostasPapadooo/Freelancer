import React, { useState, useEffect } from "react";
import {
    Container, Typography, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Button, Select, MenuItem
} from "@mui/material";
import { fetchUsers, updateUserRole, deleteUser } from "../../services/userService"; // Υποθέτω ότι οι λειτουργίες βρίσκονται εδώ

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUsers();
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                )
            );
        } catch (error) {
            console.error("Error updating user role:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteUser(userId);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Διαχείριση Χρηστών
            </Typography>
            {loading ? (
                <Typography>Φόρτωση δεδομένων...</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Όνομα</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Ρόλος</TableCell>
                                <TableCell>Ενέργειες</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                        >
                                            <MenuItem value="Admin">Διαχειριστής</MenuItem>
                                            <MenuItem value="Client">Πελάτης</MenuItem>
                                            <MenuItem value="Freelancer">Ελεύθερος Επαγγελματίας</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDeleteUser(user.id)}
                                        >
                                            Διαγραφή
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

export default ManageUsers;
