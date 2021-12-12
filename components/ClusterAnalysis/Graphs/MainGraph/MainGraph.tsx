import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { getZoomGraphDomainsFromContainerDims, plotMainGraph } from './utils/plot';
import { AxisLines } from './AxisLines/AxisLines';
import { useStore } from '../../../../store/store';
import { graphMargin } from '../utils/shared';

export const MainGraph = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);
    const { setZoomGraphDomains } = useStore();

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

    // set intial brush domain based on container dims
    useEffect(() => {
        const zoomGraphDomains = getZoomGraphDomainsFromContainerDims(parentWidth, parentHeight);
        setZoomGraphDomains(zoomGraphDomains);
    }, [parentHeight, parentWidth, setZoomGraphDomains]);

    useEffect(() => {
        plotMainGraph(parentWidth, parentHeight);
    }, [parentWidth, parentHeight]);

    return (
        <div className="w-full md:w-1/2 h-1/2 md:h-full" ref={parentRef}>
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
                <g id="points-main"></g>
                <g id="brush-main"></g>
            </svg>
        </div>
    );
};
