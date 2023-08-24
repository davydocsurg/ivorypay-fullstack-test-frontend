import { User, Wallet } from "../types";

const authToken = "auth-token";
const authUser = "auth-user";
const authUserWallet = "auth-user-wallet";

const AUTH_TOKEN = localStorage.getItem(authToken);
const AUTH_USER = localStorage.getItem(authUser);

const saveAuthUserToken = (token: string) => {
    localStorage.setItem(authToken, token);
};

const saveAuthUserDetails = (user: User) => {
    localStorage.setItem(authUser, JSON.stringify(user));
};

const saveAuthUserWallet = (wallet: Wallet) => {
    localStorage.setItem(authUserWallet, JSON.stringify(wallet));
};

const removeAuthUserToken = () => {
    localStorage.removeItem(authToken);
};

const removeAuthUserDetails = () => {
    localStorage.removeItem(authUser);
};

const authCheck = (): boolean => {
    if (AUTH_TOKEN) {
        return true;
    }
    return false;
};

const adminCheck = (): boolean => {
    if (AUTH_USER) {
        const user = JSON.parse(AUTH_USER);
        if (user.role === "admin") {
            return true;
        }
    }
    return false;
};

export {
    AUTH_TOKEN,
    AUTH_USER,
    authToken,
    authUser,
    saveAuthUserToken,
    saveAuthUserDetails,
    removeAuthUserDetails,
    removeAuthUserToken,
    authCheck,
    adminCheck,
    saveAuthUserWallet,
};
