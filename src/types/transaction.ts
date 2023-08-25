import { User } from "./user";
import { Wallet } from "./wallet";

export enum TransactionEnumType {
    DEPOSIT = "deposit",
    WITHDRAW = "withdraw",
    TRANSFER = "transfer",
}

export interface Transaction {
    id: string;
    amount: number;
    type: TransactionEnumType;
    user: User;
    senderWallet: Wallet;
    receiverWallet: Wallet;
}

export interface TransactionInput {
    amount: number;
    recipientEmail: string;
}
