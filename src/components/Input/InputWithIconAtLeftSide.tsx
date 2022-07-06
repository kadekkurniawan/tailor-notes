import React from "react";

import Input from "./Input";
import Icon from "../Icon";

interface InputWithIconAtLeftSideProps {
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
    icon: string;
    onClickIcon?: () => void;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    id?: string;
}

const InputWithIconAtLeftSide: React.FC<InputWithIconAtLeftSideProps> = ({
    type,
    icon,
    onClickIcon,
    onChange,
    value,
    placeholder,
    id,
}) => {
    return (
        <div className="relative w-full">
            <button
                className="absolute left-0 top-0 center-children h-full aspect-square"
                onClick={onClickIcon}
            >
                <Icon className="text-lg" type={icon} />
            </button>
            <Input
                className="pl-9 bg-slate-800"
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                type={type}
                id={id}
            />
        </div>
    );
};

export default InputWithIconAtLeftSide;
