import React from "react";

interface InputWithBottomBorderProps {
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
    autoFocus: boolean;
}

const InputWithBottomBorder: React.FC<InputWithBottomBorderProps> = ({
    value,
    onChange,
    placeholder,
    id,
    autoFocus = false,
    type,
    className,
}) => {
    return (
        <input
            autoFocus={autoFocus}
            type={type}
            id={id}
            className={`w-full focus:border-indigo text-lg text-slate-300 font-semibold border-slate-800 border-b border-solid outline-none py-2 px-1 transition placeholder-slate-500 bg-slate-900 font-sans ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder || ""}
        />
    );
};

export default InputWithBottomBorder;
