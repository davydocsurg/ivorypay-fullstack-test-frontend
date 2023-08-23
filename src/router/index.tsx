import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages";

const AppRouter = createBrowserRouter([{ path: "/", element: <Login /> }]);

export default AppRouter;
