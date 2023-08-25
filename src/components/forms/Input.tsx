import React, { useCallback, useEffect, useRef } from "react";
import { Input as AInput, InputRef } from "antd";
import { useField } from "@unform/core";
import { maskUp } from "./hooks";

interface InputProps {
    mask?: string;
    info?: string;
    name: string;
    label?: string;
    type?: string;
    value?: string;
    size?: "large" | "small";
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    placeholder?: string;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
    mask,
    info,
    name,
    label,
    type = "text",
    value,
    size,
    icon,
    style,
    placeholder,
    required,
    onChange,
}) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRef = useRef<React.Ref<InputRef> | any>(null);
    const { fieldName, defaultValue, registerField } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current.input,
            path: "value",

            // @ts-ignore
            //  eslint-disable-next-line @typescript-eslint/no-explicit-any
            setValue(ref: any, value: string) {
                if (inputRef.current) {
                    inputRef.current.input.value = value ?? "";
                }
            },
        });
    }, [fieldName, registerField]);

    /**
     * Handle key down event
     * Put mask on input if its designed to
     */
    const handleMaskEvents = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (e: any) => {
            if (mask) {
                maskUp(e, mask);
            }
        },
        [mask]
    );

    return (
        <div style={style}>
            <label htmlFor={name}>{label}</label>

            <AInput
                id={name}
                defaultValue={defaultValue}
                name={name}
                type={type}
                value={value}
                size={size}
                prefix={icon}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                onKeyDown={handleMaskEvents}
                onKeyUp={handleMaskEvents}
                ref={inputRef}
            />
            <small className="text-sm text-indigo-700">{info}</small>
        </div>
    );
};

export default Input;
