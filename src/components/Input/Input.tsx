import React from "react";

interface InputProps {
    type?:
        | "button"
        | "checkbox"
        | "color"
        | "date"
        | "datetime-local"
        | "email"
        | "file"
        | "hidden"
        | "image"
        | "month"
        | "number"
        | "password"
        | "radio"
        | "range"
        | "reset"
        | "search"
        | "submit"
        | "tel"
        | "text"
        | "time"
        | "url"
        | "week"
        | undefined;
    className?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
}

const Input: React.FC<InputProps> = ({
    type,
    className,
    id,
    placeholder,
    value,
    onChange,
}) => {
    return (
        <input
            type={type}
            id={id}
            onChange={onChange}
            value={value}
            className={`${className} medium-input`}
            placeholder={placeholder}
        />
    );
};

export default Input;
