import React from "react";

import { motion } from "framer-motion";

import { Delay, listItemAnimations } from "../../lib/animations";
import { Sizing } from "../../store/clothing";
import Icon from "../../components/Icon";

interface SizingListItemProps {
    sizing: Sizing;
    sizingIndex: number;
    onClickDelete: () => void;
}

const SizingListItem: React.FC<SizingListItemProps> = ({
    sizing,
    sizingIndex,
    onClickDelete,
}) => {
    return (
        <Delay itemIndex={sizingIndex} delay={100}>
            <motion.li
                {...listItemAnimations}
                className="list-item-with-icon-at-right-side"
            >
                <span className="semibold-text">{sizing.measuredPart}</span>
                <button className="group button-icon" onClick={onClickDelete}>
                    <Icon
                        className="text-red group-hover:text-dark-red"
                        type="clear"
                    />
                </button>
            </motion.li>
        </Delay>
    );
};

export default SizingListItem;
