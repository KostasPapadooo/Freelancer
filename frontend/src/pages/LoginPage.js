import React, { useState, useContext } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Εισαγωγή του AuthContext

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Χρησιμοποιούμε το AuthContext

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await loginUser({ email, password });
            console.log("User logged in:", user);
            login(user); // Αποθήκευση του χρήστη στο AuthContext
            navigate("/dashboard"); // Μεταφορά στη σελίδα dashboard
        } catch (err) {
            setError("Τα στοιχεία σας είναι λανθασμένα!");
        }
    };

    return (
        <div>
            <h2>Σύνδεση</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
