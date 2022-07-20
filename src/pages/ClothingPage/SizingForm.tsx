import React from "react";

import { Input } from "../../components/Input";
import Icon from "../../components/Icon";

interface SizingFormProps {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    measuredPart: string;
    setMeasuredPart: React.Dispatch<React.SetStateAction<string>>;
}

const SizingForm: React.FC<SizingFormProps> = ({
    onSubmit,
    measuredPart,
    setMeasuredPart,
}) => {
    return (
        <form
            className="w-screen py-2 fixed bottom-0 right-0 lg:bottom-"
            onSubmit={onSubmit}
        >
            <div className="flex gap-2 small-padding">
                <Input
                    className="bg-slate-900"
                    value={measuredPart}
                    onChange={(e) => setMeasuredPart(e.target.value)}
                    placeholder="Add measured part of body here... (e.g. neck around, chest around, etc)"
                />
                <button className="button-icon h-11 group">
                    <Icon
                        type="add"
                        className="text-teal text-3xl group-hover:text-dark-teal"
                    />
                </button>
            </div>
        </form>
    );
};

export default SizingForm;
