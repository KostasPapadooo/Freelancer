import React, { useState, useContext } from "react";
import { loginUser } from "../services/authService"; // Σιγουρέψου ότι η λειτουργία loginUser είναι σωστή
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Εισαγωγή του AuthContext

const LoginPage = () => {
    const [emailOrUsername, setEmailOrUsername] = useState(""); // Χρησιμοποιούμε το πεδίο emailOrUsername
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Χρησιμοποιούμε το AuthContext για να αποθηκεύσουμε τον χρήστη

    const handleLogin = async (e) => {
        e.preventDefault();

        const loginRequest = {
            username: emailOrUsername,  // Ονομάζεται emailOrUsername για να υποστηρίζει και τα δύο
            password: password
        };

        try {
            const user = await loginUser(loginRequest); // Στείλτε το loginRequest στο backend
            console.log("User logged in:", user);
            login(user); // Αποθήκευση του χρήστη στο AuthContext
            navigate("/dashboard"); // Μεταφορά στη σελίδα dashboard
        } catch (err) {
            setError("Τα στοιχεία σας είναι λανθασμένα!"); // Εμφάνιση σφάλματος αν δεν βρεθεί ο χρήστης
        }
    };

    return (
        <div>
            <h2>Σύνδεση</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email ή Username:</label>
                    <input
                        type="text"  // Χρησιμοποιούμε το πεδίο "text" για να υποστηρίζει και τα δύο
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Κωδικός:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Σύνδεση</button>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Εμφάνιση μηνύματος σφάλματος */}
            </form>
        </div>
    );
};

export default LoginPage;
