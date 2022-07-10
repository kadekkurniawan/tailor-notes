import React from "react";

import { AnimatePresence, motion } from "framer-motion";

import { ButtonPrimary } from "../Button";

interface UndobarProps {
    onClickUndo: () => void;
    message: React.ReactNode;
    isUndobarOpen?: boolean;
}

const Undobar: React.FC<UndobarProps> = ({
    onClickUndo,
    message,
    isUndobarOpen,
}) => {
    return (
        <AnimatePresence>
            {isUndobarOpen && (
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    exit={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="z-30 fixed bottom-0 left-0 py-3 px-4 w-screen shadow-xl backdrop-blur-md"
                >
                    <div className="flex justify-between items-center">
                        {message}
                        <ButtonPrimary onClick={onClickUndo} text="Undo" />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Undobar;
