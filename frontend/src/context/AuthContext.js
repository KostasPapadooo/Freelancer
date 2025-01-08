import React, { createContext, useContext, useState, useEffect } from 'react';

// Δημιουργία του AuthContext
export const AuthContext = createContext();

// Δημιουργία του AuthProvider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Αποθηκεύει τον χρήστη που είναι συνδεδεμένος
    const [loading, setLoading] = useState(true); // Κατάσταση φόρτωσης, για να περιμένουμε την αναγνώριση του χρήστη

    // Συνάρτηση για σύνδεση
    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token); // Αποθήκευση του token στο localStorage
        localStorage.setItem('user', JSON.stringify(userData)); // Αποθήκευση των στοιχείων του χρήστη στο localStorage
    };

    // Συνάρτηση για αποσύνδεση
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token'); // Αφαίρεση του token από το localStorage
        localStorage.removeItem('user'); // Αφαίρεση των στοιχείων του χρήστη από το localStorage
    };

    // Ανάκτηση του token και του χρήστη από το localStorage κατά την εκκίνηση
    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            setUser(JSON.parse(user)); // Ανάκτηση των στοιχείων του χρήστη από το localStorage
        }
        setLoading(false); // Τερματισμός της φόρτωσης
    }, []);

    // Αν η εφαρμογή φορτώνει, επιστρέφουμε μια ένδειξη φόρτωσης
    if (loading) {
        return <div>Φόρτωση...</div>;
    }

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