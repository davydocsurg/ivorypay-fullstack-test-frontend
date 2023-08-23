import { Transaction } from "./transaction";
import { User } from "./user";

export interface Wallet {
    id: string;
    user: User;
    balance: number;
    address: string;
    outgoingTransactions: Transaction[];
    incomingTransactions: Transaction[];
}
