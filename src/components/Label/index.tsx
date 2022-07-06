import React from "react";

interface LabelProps {
    htmlFor: string;
    className?: string;
    text: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, className, text }) => {
    return (
        <label className={`semibold-text ${className || ""}`} htmlFor={htmlFor}>
            {text}
        </label>
    );
};

export default Label;
