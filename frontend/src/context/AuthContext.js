import React, { createContext, useContext, useState } from 'react';

// Δημιουργία του AuthContext
export const AuthContext = createContext();

// Δημιουργία του AuthProvider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);  // Αποθηκεύει τον χρήστη που είναι συνδεδεμένος

    const login = (userData) => setUser(userData);  // Συνάρτηση για σύνδεση
    const logout = () => setUser(null);  // Συνάρτηση για αποσύνδεση

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook για εύκολη χρήση του AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
