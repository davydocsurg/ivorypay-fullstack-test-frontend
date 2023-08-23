import AppRouter from "./router";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <BrowserRouter>
                    <AppRouter />
                </BrowserRouter>
            </AuthProvider>
        </>
    );
}

export default App;
