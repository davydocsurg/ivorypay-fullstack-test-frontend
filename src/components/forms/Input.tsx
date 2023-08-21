import React, { useEffect, useRef } from "react";
import { Input as AInput } from "antd";
import { useField } from "@unform/core";

interface InputProps {
    name: string;
    label: string;
    type?: string;
    value?: string;
    size?: "large" | "small";
    icon?: React.ReactNode;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    name,
    label,
    type = "text",
    value,
    size,
    icon,
    onChange,
}) => {
    // const inputRef = useRef<HTMLInputElement>(null);
    // const { fieldName, registerField } = useField(name);

    // useEffect(() => {
    //     registerField({
    //         name: fieldName,
    //         ref: inputRef.current,
    //         path: "value",
    //         setValue(value: string) {
    //             if (inputRef.current) {
    //                 inputRef.current.value = value ?? "";
    //             }
    //         },
    //     });
    // }, [fieldName, registerField]);

    return (
        <>
            <label htmlFor={name}>{label}</label>

            <AInput
                id={name}
                name={name}
                type={type}
                value={value}
                size={size}
                prefix={icon}
                onChange={onChange}
            />
        </>
    );
};

export default Input;
