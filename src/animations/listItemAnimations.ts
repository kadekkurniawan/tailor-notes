const listItemVariants = {
    show: {
        y: 0,
        opacity: 1,
    },
    hidden: { y: "-100%", opacity: 0 },
    removed: { y: "100%", opacity: 0 },
};

const listItemAnimations = {
    variants: listItemVariants,
    initial: "hidden",
    animate: "show",
    exit: "removed",
};

export default listItemAnimations;
