const endPoints = {
    login: "/login",
    logout: "/logout",
    register: "/register",
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
    home: "/",
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    unknown: "*",
};

export { endPoints, messages, navbarLinks };
