import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { getMainGraphSelections, getXAxis, getYAxis } from './utils/plot';
import { graphMargin } from './utils/general';
import { selectAll } from 'd3-selection';
import { AxisLines } from './AxisLines/AxisLines';

export const MainGraph = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);

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
        const plotMainGraph = () => {
            const { xAxisGroup, yAxisGroup } = getMainGraphSelections();

            const xAxis = getXAxis(parentWidth, parentHeight);
            xAxisGroup.call(xAxis);

            const yAxis = getYAxis(parentWidth, parentHeight);
            yAxisGroup.call(yAxis);

            selectAll('.tick > line, .domain').attr('stroke-width', '0.1');
        };

        plotMainGraph();
    }, [parentWidth, parentHeight]);

    return (
        <div className="w-1/2" ref={parentRef}>
            <svg width="100%" height="100%">
                <g
                    id="x-axis-main"
                    transform={`translate(0,${parentHeight - graphMargin.top})`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular"
                ></g>
                <g
                    id="y-axis-main"
                    transform={`translate(${graphMargin.left}, 0)`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular"
                ></g>
                <AxisLines parentWidth={parentWidth} parentHeight={parentHeight} />
            </svg>
        </div>
    );
};
