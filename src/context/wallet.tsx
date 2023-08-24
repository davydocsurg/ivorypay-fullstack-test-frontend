import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import { api, endPoints } from "../services";
import { Wallet } from "../types";
import { saveAuthUserWallet } from "../constants/authConfig";

interface WalletContextData {
    // wallet: Wallet;
    createWallet(): Promise<number>;
}

interface WalletProviderProps {
    children: ReactNode;
}

const WalletContext = createContext<WalletContextData>({} as WalletContextData);

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const createWallet = useCallback(async () => {
        try {
            const response = await api.post(endPoints.createWallet);
            saveAuthUserWallet(response.data.wallet);
            return response.status;
        } catch (error) {
            console.error("Error while creating wallet: ", error);
            throw error;
        }
    }, []);

    return (
        <WalletContext.Provider
            value={{
                createWallet,
            }}
        >
            {children}
        </WalletContext.Provider>
    );
};

export function useManageWallet(): WalletContextData {
    const context = useContext(WalletContext);

    if (!context)
        throw new Error("useManageWallet must be used within an UserProvider");

    return context;
}
