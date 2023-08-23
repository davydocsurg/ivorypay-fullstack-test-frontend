import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string().required().email().min(3).max(150),
    password: Yup.string()
        .required()
        .min(8)
        .max(150)
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character"
        ),
});

export default { loginSchema };
