import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import { api, endPoints } from "../services";
import { Transaction, TransactionInput } from "../types";
import { getAuthUserWallet, saveAuthUserWallet } from "../constants/authConfig";

interface WalletContextData {
    transactions: Transaction[];
    walletBalance: number;
    createWallet(): Promise<number>;
    depositAmount(amount: number): Promise<number>;
    transferFunds(data: TransactionInput): Promise<number>;
    withdrawFunds(amount: number): Promise<number>;
    fetchTransactions(): Promise<void>;
}

interface WalletProviderProps {
    children: ReactNode;
}

const WalletContext = createContext<WalletContextData>({} as WalletContextData);
const wallet = getAuthUserWallet();

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
    const [walletBalance, setWalletBalance] = useState<number>(wallet.balance);
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    const createWallet = useCallback(async () => {
        try {
            const response = await api.post(endPoints.wallets.create);

            saveAuthUserWallet(response.data.wallet);
            setWalletBalance(response.data.wallet.balance);
            return response.status;
        } catch (error) {
            console.error("Error while creating wallet: ", error);
            throw error;
        }
    }, []);

    const depositAmount = useCallback(async (amount: number) => {
        try {
            const response = await api.post(endPoints.wallets.deposit, {
                amount,
            });
            saveAuthUserWallet(response.data.wallet);
            setWalletBalance(response.data.wallet.balance);
            return response.status;
        } catch (error) {
            console.error("Error while depositing to wallet: ", error);
            throw error;
        }
    }, []);

    const transferFunds = useCallback(async (data: TransactionInput) => {
        try {
            const response = await api.post(endPoints.wallets.transfer, {
                ...data,
            });
            saveAuthUserWallet(response.data.wallet);
            setWalletBalance(response.data.wallet.balance);
            return response.status;
        } catch (error) {
            console.error("Error while transferring funds: ", error);
            throw error;
        }
    }, []);

    const withdrawFunds = useCallback(async (amount: number) => {
        try {
            const response = await api.post(endPoints.wallets.withdraw, {
                amount,
            });
            saveAuthUserWallet(response.data.wallet);
            setWalletBalance(response.data.wallet.balance);
            return response.status;
        } catch (error) {
            console.error("Error while withdrawing funds: ", error);
            throw error;
        }
    }, []);

    const fetchTransactions = useCallback(async () => {
        try {
            const response = await api.get(endPoints.wallets.transactions);
            console.log(response.data.transactions);

            setTransactions(response.data.transactions);
        } catch (error) {
            console.error("Error while fetching transactions: ", error);
            throw error;
        }
    }, []);

    return (
        <WalletContext.Provider
            value={{
                transactions,
                walletBalance,
                createWallet,
                depositAmount,
                transferFunds,
                withdrawFunds,
                fetchTransactions,
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
