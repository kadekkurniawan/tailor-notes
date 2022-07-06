import React from "react";

interface IconProps {
    type: string;
    className?: string;
}

const Icon: React.FC<IconProps> = ({ type, className }) => {
    return (
        <>
            <span
                className={`material-symbols-outlined notranslate select-none text-slate-400 ${className}`}
            >
                {type}
            </span>
        </>
    );
};

export default Icon;
