import { Transaction } from "./transaction";

export interface Wallet {
    id: string;
    balance: number;
    address: string;
    outgoingTransactions?: Transaction[];
    incomingTransactions?: Transaction[];
    createdAt?: string;
    updatedAt?: string;
}
