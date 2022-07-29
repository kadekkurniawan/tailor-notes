import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { zoomAnimations } from "../../animations";

interface ErrorProps {
    title: string;
    open?: boolean;
    description?: React.ReactNode;
}

const Error: React.FC<ErrorProps> = ({ title, description, open = true }) => {
    return (
        <AnimatePresence>
            {open && (
                <motion.div {...zoomAnimations} className="text-center py-3">
                    <h2 className="text-red capitalize font-semibold font-sans text-xl">
                        {title}
                    </h2>
                    {description || ""}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Error;
