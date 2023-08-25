import * as Yup from "yup";

const passwordValidation = Yup.string()
    .required()
    .min(8)
    .max(150)
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character"
    );

const commonFields = {
    email: Yup.string().required().email().min(3).max(150),
    password: passwordValidation,
};

const commonWalletFields = {
    amount: Yup.number().required().min(1),
};

const registrationSchema = Yup.object().shape({
    firstName: Yup.string().required().min(3).max(150),
    lastName: Yup.string().required().min(3).max(150),
    ...commonFields,
});

const loginSchema = Yup.object().shape({
    ...commonFields,
});

const emailSchema = Yup.object().shape({
    email: commonFields.email,
});

const depositAmountSchema = Yup.object().shape({
    ...commonWalletFields,
});

const tFundsSchema = Yup.object().shape({
    ...commonWalletFields,
    recipientEmail: commonFields.email,
});

export {
    registrationSchema,
    loginSchema,
    emailSchema,
    depositAmountSchema,
    tFundsSchema,
};
