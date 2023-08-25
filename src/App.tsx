import AppRouter from "./router";
import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider, UserProvider, WalletProvider } from "./context";
import { BrowserRouter } from "react-router-dom";

function App() {
    return (
        <>
            <ToastContainer />
            <AuthProvider>
                <UserProvider>
                    <WalletProvider>
                        <BrowserRouter>
                            <AppRouter />
                        </BrowserRouter>
                    </WalletProvider>
                </UserProvider>
            </AuthProvider>
        </>
    );
}

export default App;
