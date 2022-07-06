import React from "react";

interface ButtonSecondaryProps {
    type?: "button" | "submit" | "reset" | undefined;
    className?: string;
    text: string;
    onClick?: () => void | undefined;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
    type,
    text,
    onClick,
    className,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`font-sans flex justify-center py-2 px-4 rounded-md shadow-sm text-sm lg:text-base font-medium text-slate-400 bg-transparent hover:bg-slate-800 border border-slate-600 border-solid ${
                className || ""
            }`}
        >
            {text}
        </button>
    );
};

export default ButtonSecondary;
