import { Invitation } from "./invitation";
import { Transaction } from "./transaction";
import { Wallet } from "./wallet";

export enum RoleEnumType {
    USER = "user",
    ADMIN = "admin",
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: RoleEnumType;
    referralCode?: string | null;
    passwordChangedAt?: Date | null;
    verificationStatus: string;
    verifiedAt?: Date | null;
    verificationToken?: string | null;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
    isActive: boolean;
    // otp: Otp[];
    referredUsers: User[];
    wallet: Wallet;
    referrals: Invitation[];
    transactions: Transaction[];
    referredBy?: User;
    invitedBy?: User;
}
