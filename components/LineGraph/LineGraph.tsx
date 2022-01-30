import classNames from 'classnames';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { getGraphSelections } from '../utils/plot';

export const LineGraph = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);
    const isLoading = parentWidth === 0;

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
        const plotLineGraph = () => {
            const { xAxisGroup } = getGraphSelections('line-graph');

            console.log(xAxisGroup);
        };

        plotLineGraph();
    }, [parentWidth, parentHeight]);
    return (
        <section
            className={classNames(
                'bg-white flex-grow p-2 text-black transition-opacity duration-200',
                {
                    'opacity-0': isLoading,
                    'opacity-100': !isLoading,
                },
            )}
            ref={parentRef}
        >
            <svg width="100%" height="100%">
                <rect width={parentWidth} height={parentHeight} fill="red"></rect>
                <g id="x-axis-line-graph" />
            </svg>
        </section>
    );
};
