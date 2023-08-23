import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login, Register } from "../pages";
import { Dashboard } from "../pages/auth";
import { authCheck } from "../constants";

const isAuthenticated = authCheck();

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route
                path="/"
                element={
                    <CheckAuth>
                        <Login />
                    </CheckAuth>
                }
            />
            <Route
                path="/register"
                element={
                    <CheckAuth>
                        <Register />
                    </CheckAuth>
                }
            />

            {/* Protected routes */}
            <Route
                path="/dashboard"
                element={
                    <RequireAuth>
                        <Dashboard />
                    </RequireAuth>
                }
            />
        </Routes>
    );
};

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

const CheckAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();

    if (isAuthenticated) {
        // Go back
        return <Navigate to={location.state?.from || "/dashboard"} />;
    }

    return children;
};

export default AppRoutes;
