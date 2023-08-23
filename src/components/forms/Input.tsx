import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input as AInput, InputRef } from "antd";
import { useField } from "@unform/core";
import { maskUp } from "./hooks";

interface InputProps {
    mask?: string;
    name: string;
    label: string;
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
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current.input,
            path: "value",

            //  eslint-disable-next-line @typescript-eslint/no-explicit-any
            setValue(ref: any, value: string) {
                if (inputRef.current) {
                    inputRef.current.input.value = value ?? "";
                }
                setIsFilled(!!value);
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

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
        setIsFilled(!!inputRef.current?.value);
    }, []);

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
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
            />
        </div>
    );
};

export default Input;
