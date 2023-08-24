import AppRouter from "./router";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, UserProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <UserProvider>
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                </UserProvider>
            </AuthProvider>
        </>
    );
}

export default App;
