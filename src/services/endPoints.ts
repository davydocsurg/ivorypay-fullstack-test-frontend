const endPoints = {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
    fetchUsers: "/admin/users",
};

const messages = {
    registerSuccess: "Registration successful. Loggin in...",
    loginSuccess: "Login successful. Redirecting...",
    loginError:
        "Invalid credentials. Check your email and password and try again.",
    defaultError: "Something went wrong. Please try again.",
    logginIn: "Logging in...",
};

const navbarLinks = {
    dashboard: "/dashboard",
    manageUsers: "/dashboard/admin/manage-users",
    inviteAdmin: "/dashboard/admin/invite-admin",
    inviteUsers: "/dashboard/admin/invite-users",
    wallets: {
        create: "/dashboard/wallets/create",
        deposit: "/dashboard/wallets/deposit",
        withdraw: "/dashboard/wallets/withdraw",
    },
    login: "/",
    register: "/register",
    forgotPassword: "/forgot-password",
    unknown: "*",
};

export { endPoints, messages, navbarLinks };
