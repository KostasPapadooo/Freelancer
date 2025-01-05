import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { RoleProvider } from "./context/RoleContext";

// Το BrowserRouter πρέπει να περιβάλλει μόνο την εφαρμογή, όχι τα context providers
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <BrowserRouter> {/* Εδώ είναι το μόνο σημείο που το BrowserRouter πρέπει να υπάρχει */}
            <AuthProvider>
                <RoleProvider>
                    <App />
                </RoleProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
