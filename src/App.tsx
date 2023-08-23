import { RouterProvider } from "react-router-dom";
import AppRouter from "./router";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context";

function App() {
    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <RouterProvider router={AppRouter} />
            </AuthProvider>
        </>
    );
}

export default App;
