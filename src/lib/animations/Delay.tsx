import React, { useState, useEffect } from "react";

interface DelayProps {
    children: React.ReactNode;
    delay: number;
    itemIndex: number;
}

const Delay: React.FC<DelayProps> = ({ children, delay, itemIndex }) => {
    const [isDelayFinished, setIsDelayFinished] = useState<boolean>(false);

    const delayDuration = itemIndex * delay;

    useEffect(() => {
        const delayHasFinished = setTimeout(
            () => setIsDelayFinished(true),
            delayDuration
        );
        return () => clearTimeout(delayHasFinished);
    });

    return <>{isDelayFinished && children}</>;
};

export default Delay;
