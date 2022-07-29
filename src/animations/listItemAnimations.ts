import { MotionProps } from "framer-motion";

const listItemVariants = {
    show: {
        y: 0,
        opacity: 1,
    },
    hidden: { y: "-100%", opacity: 0 },
    exit: { y: "100%", opacity: 0 },
};

const listItemAnimations: MotionProps = {
    variants: listItemVariants,
    initial: "hidden",
    animate: "show",
    exit: "exit",
};

export default listItemAnimations;
