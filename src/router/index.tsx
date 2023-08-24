import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Login, Register } from "../pages";
import {
    Dashboard,
    DashboardLayout,
    InviteAdmin,
    InviteUsers,
    ManageUsers,
} from "../pages/auth";
import { adminCheck, authCheck } from "../constants";
import { navbarLinks } from "../services";

const isAuthenticated = authCheck();
const isAdmin = adminCheck();

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route
                path={navbarLinks.login}
                element={
                    <CheckAuth>
                        <Login />
                    </CheckAuth>
                }
            />
            <Route
                path={navbarLinks.register}
                element={
                    <CheckAuth>
                        <Register />
                    </CheckAuth>
                }
            />

            {/* Protected routes */}
            <Route
                path={navbarLinks.dashboard}
                element={
                    <RequireAuth>
                        <DashboardLayout />
                    </RequireAuth>
                }
                children={[
                    <Route
                        key={"dshindex"}
                        path={navbarLinks.dashboard}
                        element={
                            <RequireAuth>
                                <Dashboard />
                            </RequireAuth>
                        }
                    />,
                    <Route
                        key={"invite-users"}
                        path={navbarLinks.inviteUsers}
                        element={
                            <RequireAuth>
                                <InviteUsers />
                            </RequireAuth>
                        }
                    />,
                    <Route
                        key={"manage-users"}
                        path={navbarLinks.manageUsers}
                        element={
                            <RequireAuth>
                                <CheckAdmin>
                                    <ManageUsers />
                                </CheckAdmin>
                            </RequireAuth>
                        }
                    />,
                    <Route
                        key={"invite-admin"}
                        path={navbarLinks.inviteAdmin}
                        element={
                            <RequireAuth>
                                <CheckAdmin>
                                    <InviteAdmin />
                                </CheckAdmin>
                            </RequireAuth>
                        }
                    />,
                ]}
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
        return <Navigate to={location.state?.from || navbarLinks.dashboard} />;
    }

    return children;
};

const CheckAdmin = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();

    // if (!isAuthenticated) {
    //     return <Navigate to="/" state={{ from: location }} replace />;
    // }
    if (!isAdmin) {
        return (
            <Navigate
                to={location.state?.from || navbarLinks.dashboard}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default AppRoutes;
