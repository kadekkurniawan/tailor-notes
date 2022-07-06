import React from "react";
import { ButtonPrimary } from "../Button";

interface UndobarProps {
    onClickUndo: () => void;
    message: React.ReactNode;
}

const Undobar: React.FC<UndobarProps> = ({ onClickUndo, message }) => {
    return (
        <div className="z-30 fixed bottom-0 left-0 py-3 px-4 w-screen shadow-xl backdrop-blur-md">
            <div className="flex justify-between items-center">
                {message}
                <ButtonPrimary onClick={onClickUndo} text="Undo" />
            </div>
        </div>
    );
};

export default Undobar;
