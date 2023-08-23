import { RouterProvider } from "react-router-dom";
import AppRouter from "./router";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <ToastContainer />
            <RouterProvider router={AppRouter} />
        </>
    );
}

export default App;
