import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import { AxiosResponse } from "axios";
import { AuthState, LoginCredentials, LoginRequest, User } from "../types";
import {
    AUTH_TOKEN,
    AUTH_USER,
    removeAuthUserDetails,
    removeAuthUserToken,
    saveAuthUserDetails,
    saveAuthUserToken,
} from "../constants";
import { api, endPoints, navbarLinks } from "../services";

interface ApiResponse {
    status: number;
    data: AxiosResponse["data"];
}

interface AuthContextData {
    user: User;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    // eslint
    login(credentials: LoginCredentials): Promise<ApiResponse>;
    logout(): void;
    prepUserDetails: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const token = AUTH_TOKEN;
const user = AUTH_USER;
const parsedUser = JSON.parse(user?.toString() || "{}");

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<AuthState>(() => {
        if (token && user) {
            return { token, user: parsedUser };
        }
        return {} as AuthState;
    });

    const prepUserDetails = () => {
        setData({
            ...data,
            token: token?.toString() || "",
            user: parsedUser,
        });
    };

    const login = useCallback(
        async ({ email, password }: LoginRequest): Promise<ApiResponse> => {
            try {
                const response = await api.post(endPoints.login, {
                    email,
                    password,
                });
                console.log(response);

                const { token, user } = response.data;

                saveAuthUserToken(token);
                saveAuthUserDetails(user);

                setData({ token, user });

                const { status, data } = response;
                return {
                    status,
                    data,
                };
            } catch (error) {
                console.error("Login error:", error);
                throw error; // Rethrow the error for the caller to handle
            }
        },
        []
    );

    const logout = useCallback(() => {
        removeAuthUserToken();
        removeAuthUserDetails();
        setData({} as AuthState);

        window.location.replace(navbarLinks.login);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                loading,
                setLoading,
                login,
                logout,
                prepUserDetails,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext);

    if (!context)
        throw new Error("useAuth must be used within an AuthProvider");

    return context;
}
