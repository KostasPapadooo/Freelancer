import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Εισαγωγή του AuthContext
import { loginUser } from "../services/authService"; // Εισαγωγή της συνάρτησης loginUser

const LoginPage = () => {
    const [emailOrUsername, setEmailOrUsername] = useState(""); // Χρησιμοποιούμε το πεδίο emailOrUsername
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Χρησιμοποιούμε το AuthContext για να αποθηκεύσουμε τον χρήστη

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginUser({ email: emailOrUsername, password });
            // Αποθήκευση του χρήστη στο AuthContext
            login(data.user, data.token);
            navigate("/dashboard"); // Μεταφορά στη σελίδα dashboard
        } catch (err) {
            console.error('Error:', err);
            setError("Σφάλμα επικοινωνίας με τον διακομιστή"); // Σφάλμα δικτύου ή επικοινωνίας με τον server
        }
    };

    return (
        <div>
            <h2>Σύνδεση</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email ή Username:</label>
                    <input
                        type="text" // Χρησιμοποιούμε το πεδίο "text" για να υποστηρίζει και τα δύο
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