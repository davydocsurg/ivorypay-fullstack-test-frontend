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
    users: User[];
    fetchUsers(): Promise<void>;
    disableUser(email: string): Promise<number>;
    enableUser: (email: string) => Promise<number>;
    inviteAdmin: (email: string[]) => Promise<number>;
}

interface UserProviderProps {
    children: ReactNode;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const fetchUsers = useCallback(async () => {
        try {
            const response = await api.get(endPoints.fetchUsers);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error while fetching users: ", error);
            throw error;
        }
    }, []);

    const disableUser = useCallback(
        async (email: string) => {
            try {
                const response = await api.patch(endPoints.disableUser, {
                    email,
                });
                await fetchUsers();
                return response.status;
            } catch (error) {
                console.error("Error while disabling users: ", error);
                throw error;
            }
        },
        [fetchUsers]
    );

    const enableUser = useCallback(
        async (email: string) => {
            try {
                const response = await api.patch(endPoints.enableUser, {
                    email,
                });
                await fetchUsers();
                return response.status;
            } catch (error) {
                console.error("Error while fetching users: ", error);
                throw error;
            }
        },
        [fetchUsers]
    );

    const inviteAdmin = useCallback(async (emails: string[]) => {
        try {
            const response = await api.post(endPoints.inviteAdmin, {
                emails,
            });

            return response.status;
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
                disableUser,
                enableUser,
                inviteAdmin,
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
