import React, { useRef, useState } from "react";

import { useClickAway } from "react-use";
import { motion } from "framer-motion";

import Icon from "../../components/Icon";
import { AbsolutelyPositionOptionList } from "../../components/Option";
import { listItemAnimations } from "../../lib/animations";
import { Clothing } from "../../store/clothing";
import { Delay } from "../../lib/animations";

interface ClothingListItemProps {
    onClickListItem: () => void;
    clothing: Clothing;
    clothingIndex: number;
    clothingOptions: React.ReactNode;
}

const ClothingListItem: React.FC<ClothingListItemProps> = ({
    onClickListItem,
    clothing,
    clothingIndex,
    clothingOptions,
}) => {
    const handleToggleClothingOptionsVisibility = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        setIsClothingOptionsOpen(!isClothingOptionsOpen);
    };

    const [isClothingOptionsOpen, setIsClothingOptionsOpen] =
        useState<boolean>(false);

    const clothingOptionsRef = useRef<HTMLDivElement>(null);

    useClickAway(clothingOptionsRef, () => setIsClothingOptionsOpen(false));

    return (
        <Delay itemIndex={clothingIndex} delay={100}>
            <motion.li
                {...listItemAnimations}
                onClick={onClickListItem}
                className="list-item-with-icon-at-right-side h-12"
            >
                <span className="semibold-text text-slate-300">
                    {clothing.type}
                </span>

                <div ref={clothingOptionsRef}>
                    <button
                        className={`${
                            !isClothingOptionsOpen && "py-1"
                        } center-children group-hover:text-slate-50 rounded-md hover:bg-slate-600`}
                        onClick={handleToggleClothingOptionsVisibility}
                    >
                        <Icon
                            type={isClothingOptionsOpen ? "clear" : "more_vert"}
                        />
                    </button>
                    {isClothingOptionsOpen && (
                        <AbsolutelyPositionOptionList position="top-1/2 transform -translate-y-1/2 right-10">
                            {clothingOptions}
                        </AbsolutelyPositionOptionList>
                    )}
                </div>
            </motion.li>
        </Delay>
    );
};

export default ClothingListItem;
