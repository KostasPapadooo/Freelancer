
import React, { useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./components/Header";
import { AuthContext } from "./context/AuthContext";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard";
import LoginPage from "./pages/LoginPage";
import { RoleContext } from "./context/RoleContext";

const App = () => {
    const { user } = useContext(AuthContext);
    const { role } = useContext(RoleContext);

    // ProtectedRoute component για έλεγχο πρόσβασης
    const ProtectedRoute = ({ children }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }
        return children;
    };

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
                            <ProtectedRoute>
                                {role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/client/dashboard"
                        element={
                            <ProtectedRoute>
                                {role === "client" ? <ClientDashboard /> : <Navigate to="/login" />}
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/freelancer/dashboard"
                        element={
                            <ProtectedRoute>
                                {role === "freelancer" ? <FreelancerDashboard /> : <Navigate to="/login" />}
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

