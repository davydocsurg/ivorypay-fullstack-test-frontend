import { createBrowserRouter } from "react-router-dom";
import { Login, Register } from "../pages";

const AppRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default AppRouter;
