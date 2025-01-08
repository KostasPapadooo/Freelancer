import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";
import { BrowserRouter } from "react-router-dom";

// Δημιουργία του root element
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render της εφαρμογής με τους παρόχους και το BrowserRouter
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <RoleProvider>
                    <App />
                </RoleProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);