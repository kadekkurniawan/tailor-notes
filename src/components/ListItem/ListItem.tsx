import React from "react";

interface ListItemProps {
    title: string;
    description?: string;
    rightSide?: React.ReactNode;
    onClickListItem?: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
    title,
    description,
    rightSide,
    onClickListItem,
}) => {
    return (
        <li
            onClick={onClickListItem}
            className="flex cursor-default px-3 py-2 items-center justify-between"
        >
            <div>
                <p className="overflow-x whitespace-nowrap max-w-sm">{title}</p>
                <p className="text-slate-500 font-sm">{description || ""}</p>
            </div>
            {rightSide}
        </li>
    );
};

export default ListItem;
