import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button, AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
    const { user } = useContext(AuthContext);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Freelancer System
                </Typography>
                <div>
                    {user ? (
                        <>
                            {user.role === "admin" && (
                                <>
                                    <Button color="inherit" component={Link} to="/admin/dashboard">
                                        Admin Dashboard
                                    </Button>
                                    <Button color="inherit" component={Link} to="/admin/manage-users">
                                        Manage Users
                                    </Button>
                                    <Button color="inherit" component={Link} to="/admin/manage-projects">
                                        Manage Projects
                                    </Button>
                                </>
                            )}
                            {user.role === "client" && (
                                <>
                                    <Button color="inherit" component={Link} to="/client/dashboard">
                                        My Projects
                                    </Button>
                                    <Button color="inherit" component={Link} to="/client/create-project">
                                        Create Project
                                    </Button>
                                    <Button color="inherit" component={Link} to="/client/view-applications">
                                        View Applications
                                    </Button>
                                </>
                            )}
                            {user.role === "freelancer" && (
                                <>
                                    <Button color="inherit" component={Link} to="/freelancer/dashboard">
                                        My Applications
                                    </Button>
                                    <Button color="inherit" component={Link} to="/freelancer/profile">
                                        Freelancer Profile
                                    </Button>
                                    <Button color="inherit" component={Link} to="/freelancer/available-projects">
                                        Available Projects
                                    </Button>
                                </>
                            )}
                            <Button color="inherit" onClick={() => {}}>Logout</Button>
                        </>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
