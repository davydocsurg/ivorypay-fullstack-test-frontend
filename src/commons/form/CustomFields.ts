export type CustomGridFields = {
    name: string;
    label: string;
    type:
        | "text"
        | "number"
        | "email"
        | "password"
        | "select"
        | "checkbox"
        | "radio";
    required?: boolean;
    options?: { label: string; value: string | number }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValue?: any;
    disabled?: boolean;
    placeholder?: string;
};
