import { useEffect, useState } from "react";
//import {useSi} from 'react-use'

type ElementSizeFunction = (
    elementRef: React.MutableRefObject<HTMLElement | null>
) => number[];

const useElementSize: ElementSizeFunction = (elementRef) => {
    const [elementHeight, setElementHeight] = useState<number>(0);
    const [elementWidth, setElementWidth] = useState<number>(0);

    useEffect(() => {
        setElementHeight(elementRef?.current?.clientHeight!);
        setElementWidth(elementRef?.current?.clientWidth!);
    }, [elementRef]);

    return [elementHeight, elementWidth];
};

export default useElementSize;
