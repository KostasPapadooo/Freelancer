import React, { createContext, useContext, useState } from 'react';

// Δημιουργία του RoleContext
export const RoleContext = createContext();

// Δημιουργία του RoleProvider
export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(null);  // Αποθηκεύει τον ρόλο του χρήστη

    const setUserRole = (roleData) => setRole(roleData);  // Συνάρτηση για καθορισμό ρόλου
    const removeUserRole = () => setRole(null);  // Συνάρτηση για αφαίρεση ρόλου

    return (
        <RoleContext.Provider value={{ role, setUserRole, removeUserRole }}>
            {children}
        </RoleContext.Provider>
    );
};

// Custom hook για εύκολη χρήση του RoleContext
export const useRole = () => {
    return useContext(RoleContext);
};
