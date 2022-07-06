import React from "react";

interface ErrorProps {
    title: string;
    description?: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ title, description }) => {
    return (
        <div className="text-center py-3">
            <h2 className="text-red capitalize font-semibold font-sans text-xl">
                {title}
            </h2>
            {description || ""}
        </div>
    );
};

export default Error;
