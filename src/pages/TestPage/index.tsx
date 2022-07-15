import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { Delay, listItemAnimations } from "../../lib/animations";

const TestPage: React.FC = () => {
    const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <ul>
            <AnimatePresence>
                {items.map((item: number, itemIndex: number) => (
                    <Item key={item} item={item} itemIndex={itemIndex} />
                ))}
            </AnimatePresence>
        </ul>
    );
};

export default TestPage;

interface ItemProps {
    item: number;
    itemIndex: number;
}

const Item: React.FC<ItemProps> = ({ item, itemIndex }) => {
    return (
        <Delay itemIndex={itemIndex} delay={500}>
            <motion.li className="text-red" {...listItemAnimations}>
                {item}
            </motion.li>
        </Delay>
    );
};
