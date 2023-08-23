const endPoints = {
    login: "/auth/login",
    logout: "/auth/logout",
    register: "/auth/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
    verifyEmail: "/verify-email",
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
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    unknown: "*",
};

export { endPoints, messages, navbarLinks };
