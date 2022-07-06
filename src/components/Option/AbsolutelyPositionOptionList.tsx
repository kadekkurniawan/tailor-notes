import React from "react";

interface AbsolutelyPositionOptionListProps {
    position: string;
    children: React.ReactNode;
}

const AbsolutelyPositionOptionList = React.forwardRef<
    HTMLDivElement,
    AbsolutelyPositionOptionListProps
>(({ position, children }, ref) => {
    return (
        <div
            ref={ref}
            className={`rounded absolute w-fit bg-slate-900 backdrop-blur slate-700-border ${position}`}
        >
            <ul className="divide-y rounded divide-slate-700">{children}</ul>
        </div>
    );
});

export default AbsolutelyPositionOptionList;
