import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
    firstName: Yup.string().required().min(3).max(150),
    lastName: Yup.string().required().min(3).max(150),
    email: Yup.string().required().email().min(3).max(150),
    // password must contain at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long
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
    // passwordConfirmation: Yup.string()
    //     .oneOf([Yup.ref("password")], "Passwords must match")
    //     .required(),
});

export { registrationSchema };
