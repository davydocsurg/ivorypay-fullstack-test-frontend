import React, { useEffect, useRef } from "react";
import { Input as AInput } from "antd";

interface InputProps {
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
    return (
        <div style={style}>
            <label htmlFor={name}>{label}</label>

            <AInput
                id={name}
                name={name}
                type={type}
                value={value}
                size={size}
                prefix={icon}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default Input;
