import React from "react";

import { Sizing } from "../../store/clothing";
import { Input } from "../../components/Input";
import Label from "../../components/Label";

interface SizingListItemProps {
    sizing: Sizing;
    onChangeSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
    measurementType: string;
}

const SizingListItem: React.FC<SizingListItemProps> = ({
    sizing,
    onChangeSize,
    measurementType,
}) => {
    return (
        <li className="flex flex-col gap-0.5">
            <Label
                text={sizing.measuredPart}
                className="mb-0.5"
                htmlFor={sizing.measuredPart}
            />

            <div className="relative">
                <Input
                    onChange={onChangeSize}
                    value={sizing.size}
                    className="bg-slate-800 pr-16"
                    type="number"
                    id={sizing.measuredPart}
                />
                <aside className="absolute top-0 right-0 h-full px-3 center-children">
                    <span className="semibold-text"> {measurementType}</span>
                </aside>
            </div>
        </li>
    );
};

export default SizingListItem;
