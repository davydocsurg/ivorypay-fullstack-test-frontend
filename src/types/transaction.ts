import { Wallet } from "./wallet";

export enum TransactionEnumType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
    TRANSFER = "transfer",
}

export interface Transaction {
    id: string;
    createdAt: string;
    updatedAt?: string;
    amount: string;
    type: string;
    senderWallet: Wallet;
    receiverWallet: Wallet;
}

export interface TransactionInput {
    amount: number;
    recipientEmail: string;
}
