import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { plotMainGraph } from './utils/plot';
import { graphMargin } from './utils/general';
import { AxisLines } from './AxisLines/AxisLines';

export const MainGraph = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(100);
    const [parentHeight, setParentHeight] = useState(100);

    const handleWindowResize = debounce((current: HTMLDivElement) => {
        setParentWidth(current.offsetWidth);
        setParentHeight(current.offsetHeight);
    }, 100);

    useEffect(() => {
        const { current } = parentRef;

        if (current) {
            const setDimensions = () => handleWindowResize(current);
            setDimensions();
            window.addEventListener('resize', setDimensions);
            return () => window.removeEventListener('resize', setDimensions);
        }
    }, [handleWindowResize, parentWidth, parentHeight]);

    useEffect(() => {
        plotMainGraph(parentWidth, parentHeight);
    }, [parentWidth, parentHeight]);

    return (
        <div className="w-1/2" ref={parentRef}>
            <svg width="100%" height="100%">
                <g
                    id="x-axis-main"
                    transform={`translate(0,${parentHeight - graphMargin.top})`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular stroke-0"
                ></g>
                <g
                    id="y-axis-main"
                    transform={`translate(${graphMargin.left}, 0)`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular stroke-0"
                ></g>
                <AxisLines parentWidth={parentWidth} parentHeight={parentHeight} />
                <g id="brush-main"></g>
            </svg>
        </div>
    );
};
