import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { AxisLines } from '../MainGraph/AxisLines/AxisLines';
import { graphMargin } from '../MainGraph/utils/general';
import { plotZoomGraph } from './utils/plot';

export const ZoomGraph = () => {
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
        plotZoomGraph(parentWidth, parentHeight);
    }, [parentWidth, parentHeight]);
    return (
        <div className="w-1/2" ref={parentRef}>
            <svg width="100%" height="100%">
                <g
                    id="x-axis-zoom"
                    transform={`translate(0,${parentHeight - graphMargin.top})`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular stroke-0"
                ></g>
                <g
                    id="y-axis-zoom"
                    transform={`translate(${graphMargin.left}, 0)`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular stroke-0"
                ></g>
                <AxisLines parentWidth={parentWidth} parentHeight={parentHeight} />
            </svg>
        </div>
    );
};
