import React from "react";
import SharedProps from "./SharedProps";
import { Option } from "../../types";
import { IconProps } from "react-toastify";

type CSelectProps = {
    icon?: React.ComponentType<IconProps>;
    multiple?: boolean;
    check?: boolean;
    chip?: boolean;
    label: string;
    readOnly?: boolean;
    maxOptionsLimit?: number;
    fieldDescription?: string;

    options: Option[];
} & SharedProps;

export default CSelectProps;
