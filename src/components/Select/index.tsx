import React from "react";

interface SelectProps {
    children: string[];
    className?: string;
    id?: string;
    name?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
    className,
    onChange,
    children,
    name,
    id,
    value,
}) => {
    return (
        <select
            onChange={onChange}
            className={`small-input ${className}`}
            name={name}
            id={id}
            value={value}
        >
            {children.map((child: string) => (
                <option key={child} value={child}>
                    {child}
                </option>
            ))}
        </select>
    );
};

export default Select;
