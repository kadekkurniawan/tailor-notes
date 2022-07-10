const initialAnimation = {
    y: "-100%",
    opacity: 0,
};

const openAnimation = {
    y: 0,
    opacity: 1,
};

const exitAnimation = {
    y: "100%",
    opacity: 0,
};

const listItemAnimations = {
    initial: initialAnimation,
    animate: openAnimation,
    exit: exitAnimation,
};

export default listItemAnimations;
