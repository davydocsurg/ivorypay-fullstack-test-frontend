import React from "react";
import { UserOutlined, LockFilled } from "@ant-design/icons";
import { Button, Input } from "../../components";
import { Link } from "react-router-dom";

const loginFormFields = [
    {
        type: "email",
        name: "email",
        icon: <UserOutlined />,
        label: "Email",
        placeholder: "jondoe@example.com",
        required: true,
        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            console.log(event.target.value);
        },
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

const Login: React.FC = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form>
                    {loginFormFields.map((field) => (
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
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link
                        to={"/register"}
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
