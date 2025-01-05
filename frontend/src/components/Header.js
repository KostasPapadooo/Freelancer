import React, { useState, useEffect } from "react";
import { getCurrentUser, logoutUser } from "../services/authService";

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const currentUser = await getCurrentUser();
                setUser(currentUser);
            } catch (error) {
                console.error("Fetch user error:", error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            setUser(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <header>
            <h1>Freelancer Management System</h1>
            {user ? (
                <div>
                    <p>Καλώς ήρθες, {user.name}</p>
                    <button onClick={handleLogout}>Αποσύνδεση</button>
                </div>
            ) : (
                <p>Δεν είστε συνδεδεμένος</p>
            )}
        </header>
    );
};

export default Header;
