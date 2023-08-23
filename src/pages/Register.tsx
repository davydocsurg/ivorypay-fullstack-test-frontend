import React from "react";
import { UserOutlined, LockFilled } from "@ant-design/icons";
import { Button, Input } from "../components";
import { Link } from "react-router-dom";

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
        icon: <UserOutlined />,
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
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form>
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
                </form>

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
