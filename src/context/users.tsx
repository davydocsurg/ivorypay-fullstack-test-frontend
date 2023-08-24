import React, {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react";
import { User } from "../types";
import { api, endPoints } from "../services";

interface UserContextData {
    users: User;
    fetchUsers(): Promise<void>;
    // disableUser(): Promise<User>;
    // enableUser: () => Promise<User>;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User>();
    const fetchUsers = useCallback(async () => {
        try {
            const response = await api.get(endPoints.fetchUsers);
            setUsers(response.data);
        } catch (error) {
            console.error("Error while fetching users: ", error);
            throw error;
        }
    }, []);

    return (
        <UserContext.Provider
            value={{
                users: users!,
                fetchUsers,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export function useManageUsers(): UserContextData {
    const context = useContext(UserContext);

    if (!context)
        throw new Error("useManageUsers must be used within an UserProvider");

    return context;
}
