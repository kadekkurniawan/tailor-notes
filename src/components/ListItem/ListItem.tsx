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
            className="flex justify-between small-padding items-center slate-700-border bg-slate-800 rounded-lg"
        >
            <div>
                <h2 className="text-base">{title}</h2>
                <p className="text-sm">{description || ""}</p>
            </div>
            {rightSide}
        </li>
    );
};

export default ListItem;
