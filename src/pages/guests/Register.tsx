import React, { useCallback, useState } from "react";
import { UserOutlined, InboxOutlined, LockFilled } from "@ant-design/icons";
import { Button, Input } from "../../components";
import { Link, useNavigate } from "react-router-dom";
import {
    api,
    endPoints,
    errorHandler,
    messages,
    navbarLinks,
} from "../../services";
import { useAuth } from "../../context";
import { Toast } from "../../utils";
import { useForm } from "../../commons/form";
import { registrationSchema } from "./validations";
import { Form } from "@unform/web";

interface RegistrationFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

const registerFormFields = [
    {
        type: "text",
        name: "firstName",
        icon: <UserOutlined />,
        label: "First Name",
        placeholder: "John",
        required: true,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);
        },
    },
    {
        type: "text",
        name: "lastName",
        icon: <UserOutlined />,
        label: "Last Name",
        placeholder: "Doe",
        required: true,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);
        },
        style: { marginTop: 20 },
    },
    {
        type: "email",
        name: "email",
        icon: <InboxOutlined />,
        label: "Email",
        placeholder: "jondoe@example.com",
        required: true,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);
        },
        style: { marginTop: 20 },
    },
    {
        type: "password",
        name: "password",
        icon: <LockFilled />,
        label: "Password",
        placeholder: "********",
        required: true,
        style: { marginTop: 20 },
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);
        },
    },
];

const Register: React.FC = () => {
    const form = useForm({ schema: registrationSchema });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = useCallback(
        async (data: RegistrationFormData) => {
            const toast = new Toast();
            try {
                setLoading(true);
                toast.loading("Registering...");

                await form.validation(data);
                return;
                const res = await api.post(endPoints.register, data);

                if (res.status === 200) {
                    toast.success(messages.registerSuccess);

                    toast.loading(messages.logginIn);
                    await login({
                        email: data.email,
                        password: data.password,
                    });
                }

                form.clear();

                toast.dismiss();
                setLoading(false);
                navigate(navbarLinks.home);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                const { message } = errorHandler(error);
                toast.error(message);
                setLoading(false);
            }
        },
        [form, setLoading, login, navigate]
    );

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form onSubmit={handleSubmit} ref={form.ref}>
                    {registerFormFields.map((field) => (
                        <Input
                            key={field.name}
                            type={field.type}
                            name={field.name}
                            label={field.label}
                            icon={field.icon}
                            placeholder={field.placeholder}
                            required={field.required}
                            style={field.style}
                        />
                    ))}

                    <div className="mt-5">
                        <Button type="submit" text="Sign in" />
                    </div>
                </Form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to={"/"}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
