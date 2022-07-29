import { MotionProps } from "framer-motion";

const fadeVariants = {
    hidden: {
        opacity: 0,
        scale: 0.1,
    },
    show: {
        opacity: 1,
        scale: 1,
    },
};

const zoomAnimations: MotionProps = {
    variants: fadeVariants,
    initial: "hidden",
    animate: "show",
    exit: "hidden",
    transition: { delay: 0.1 },
};

export default zoomAnimations;
