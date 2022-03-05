import classNames from 'classnames';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { getGraphSelections, getXScale, getYScale } from '../utils/plot';
import { AreaGradient } from './AreaGradient/AreaGradient';
import { axisFontSize } from './Axes/utils';
import { XAxis } from './Axes/XAxis/XAxis';
import { YAxis } from './Axes/YAxis/YAxis';
import { Area } from './Shapes/Area/Area';
import { Line } from './Shapes/Line/Line';
import {
    endYear,
    getAreaGenerator,
    getLineGenerator,
    lineGraphData,
    startYear,
    yMax,
    yMin,
} from './utils/utils';

export const LineGraph = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);
    const isLoading = parentWidth === 0;
    const xScale = getXScale(parentWidth, [startYear, endYear], true);
    const yScale = getYScale(parentHeight, [yMax, yMin]);
    const lineGenerator = getLineGenerator(xScale, yScale);
    const areaGenerator = getAreaGenerator(xScale, yScale);

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
            const { xAxisGroup, yAxisGroup } = getGraphSelections('line-graph');

            const xAxis = axisBottom(xScale)
                .tickSize(0)
                .ticks(endYear - startYear)
                .tickFormat((d, i) => String(lineGraphData[i].year));

            xAxisGroup
                .call(xAxis)
                .call(() => select('.domain').remove())
                .style('font-size', axisFontSize)
                .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end');

            const yAxis = axisLeft(yScale).tickSize(0);

            yAxisGroup
                .call(yAxis)
                .call(() => select('.domain').remove())
                .style('font-size', axisFontSize);
        };

        plotLineGraph();
    }, [parentWidth, parentHeight, yScale, xScale]);

    return (
        <section
            className={classNames(
                'bg-white flex-grow text-black transition-opacity duration-200 font-inter-regular',
                {
                    'opacity-0': isLoading,
                    'opacity-100': !isLoading,
                },
            )}
            ref={parentRef}
        >
            <svg width="100%" height="100%">
                <defs>
                    <AreaGradient />
                </defs>
                <g>
                    <XAxis parentHeight={parentHeight} />
                    <YAxis />
                    <Line lineGenerator={lineGenerator} />
                    <Area areaGenerator={areaGenerator} />
                </g>
            </svg>
        </section>
    );
};
