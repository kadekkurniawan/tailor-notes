import React from "react";

interface ButtonPrimaryProps {
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    text: string;
    onClick?: () => void | undefined;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
    type,
    text,
    onClick,
    className,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`font-sans flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-slate-300 bg-indigo outline-none hover:bg-dark-indigo ${className}`}
        >
            {text}
        </button>
    );
};

export default ButtonPrimary;
