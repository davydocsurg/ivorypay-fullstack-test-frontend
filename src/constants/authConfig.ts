import { User } from "../types";

const authToken = "auth-token";
const authUser = "auth-user";

const localStorageChecks =
    typeof window !== "undefined" && typeof localStorage !== "undefined";
const AUTH_TOKEN = localStorageChecks && localStorage.getItem(authToken);
const AUTH_USER = localStorageChecks && localStorage.getItem(authUser);

const saveAuthUserToken = (token: string) => {
    localStorage.setItem(authToken, token);
};

const saveAuthUserDetails = (user: User) => {
    localStorage.setItem(authUser, JSON.stringify(user));
};

const removeAuthUserToken = () => {
    localStorage.removeItem(authToken);
};

const removeAuthUserDetails = () => {
    localStorage.removeItem(authUser);
};

const authCheck = (): boolean => {
    // console.log(AUTH_TOKEN, "from source");

    if (AUTH_TOKEN) {
        return true;
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
};
