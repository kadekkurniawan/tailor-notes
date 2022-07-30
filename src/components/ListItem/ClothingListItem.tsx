import React, { useRef, useState } from "react";

import { useClickAway } from "react-use";
import { motion } from "framer-motion";

import Icon from "../../components/Icon";
import { AbsolutelyPositionOptionList } from "../../components/Option";
import { listItemAnimations } from "../../animations";
import { Clothing } from "../../store/clothing";
import { Delay } from "../../animations";
import Highlighter from "react-highlight-words";

interface ClothingListItemProps {
    onClickListItem: () => void;
    querySearch: string;
    clothing: Clothing;
    clothingIndex: number;
    clothingOptions: React.ReactNode;
}

const ClothingListItem: React.FC<ClothingListItemProps> = ({
    onClickListItem,
    clothing,
    clothingIndex,
    clothingOptions,
    querySearch,
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
                <Highlighter
                    highlightStyle={{
                        color: "#f8fafc",
                        backgroundColor: "#d97706",
                    }}
                    highlightClassName="text-indigo"
                    className="semibold-text text-slate-300"
                    searchWords={[querySearch]}
                    autoEscape={true}
                    textToHighlight={clothing.type}
                />

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
