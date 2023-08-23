import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authCheck } from "../constants";

const AuthGuard = ({ children }: { children: JSX.Element }) => {
    const navigate = useNavigate();
    const isAuthenticated = authCheck();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            // Redirect to the desired page if the user is logged in
            const from = location.state?.from || "/dashboard";
            navigate(from);
        }
    }, [isAuthenticated, navigate, location]);

    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Allow access to the protected route if the user is authenticated
    return children;
};

export default AuthGuard;
