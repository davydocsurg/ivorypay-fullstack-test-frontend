import { Space, Select as ASelect } from "antd";
import React from "react";

interface SelectProps {
    name?: string;
    label: string;
    defaultValue?: string;
    style?: React.CSSProperties;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options?: any;
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
    name,
    label,
    defaultValue,
    style,
    options,
    onChange,
}) => {
    return (
        <>
            <label htmlFor={name}>{label}</label>
            <Space wrap>
                <ASelect
                    defaultValue={defaultValue}
                    style={style}
                    options={options}
                    onChange={onChange}
                />
            </Space>
        </>
    );
};

export default Select;
