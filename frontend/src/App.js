import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header"; // Βεβαιώσου ότι το Header εξάγεται σωστά
import { AuthContext } from "./context/AuthContext"; // Εισαγωγή από το σωστό path
import AdminDashboard from "./pages/admin/AdminDashboard"; // Εξαγωγή και εισαγωγή σωστά
import ClientDashboard from "./pages/client/ClientDashboard"; // Εξαγωγή και εισαγωγή σωστά
import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard"; // Εξαγωγή και εισαγωγή σωστά
import LoginPage from "./pages/LoginPage"; // Εξαγωγή και εισαγωγή σωστά
import { RoleContext } from "./context/RoleContext"; // Εισαγωγή από το σωστό path

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(AuthContext);
    const { role } = useContext(RoleContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to="/login" />;
    }

    return children;
};

const App = () => {
    return (
        <>
            <Header />
            <Container>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    {/* Προστατευμένες Routes */}
                    <Route
                        path="/admin/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <AdminDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/client/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["client"]}>
                                <ClientDashboard />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/freelancer/dashboard"
                        element={
                            <ProtectedRoute allowedRoles={["freelancer"]}>
                                <FreelancerDashboard />
                            </ProtectedRoute>
                        }
                    />

                    {/* Default route */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Container>
        </>
    );
};

export default App;
