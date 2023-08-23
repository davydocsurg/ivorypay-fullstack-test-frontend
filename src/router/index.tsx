import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "../pages";
import { Dashboard } from "../pages/auth";

const AppRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);

export default AppRouter;
