import classNames from 'classnames';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { LineGraphPair } from '../../types/types';
import { getGraphSelections, getXScale, getYScale, graphMargin } from '../utils/plot';
import {
    endYear,
    getAreaGenerator,
    getLineGenerator,
    getLineGraphData,
    startYear,
    yMax,
    yMin,
} from './utils/utils';

const areaPurple = '#7263F1';
const lineGraphData: LineGraphPair[] = getLineGraphData();
const axisTextClass = 'fill-current text-gray-400 text-xs font-inter-regular text-base';

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
                .style('font-size', '0.75rem')
                .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end');

            const yAxis = axisLeft(yScale).tickSize(0);

            yAxisGroup
                .call(yAxis)
                .call(() => select('.domain').remove())
                .style('font-size', '0.75rem');
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
                    <linearGradient id="area-gradient" gradientTransform="rotate(90)">
                        <stop offset="0%" stopColor={areaPurple} />
                        <stop offset="75%" stopColor="white" />
                    </linearGradient>
                </defs>
                <g>
                    <g
                        id="x-axis-line-graph"
                        transform={`translate(0, ${parentHeight - graphMargin.bottom})`}
                        className={axisTextClass}
                    />
                    <g
                        id="y-axis-line-graph"
                        transform={`translate(${graphMargin.left}, 0)`}
                        className={axisTextClass}
                    />
                    <path
                        id="line-line-graph"
                        d={lineGenerator(lineGraphData) as string}
                        fill="none"
                        stroke={areaPurple}
                        className="stroke-2"
                    />
                    <path
                        id="area-line-graph"
                        d={areaGenerator(lineGraphData) as string}
                        fill="url(#area-gradient)"
                        className="opacity-40"
                    />
                </g>
            </svg>
        </section>
    );
};
