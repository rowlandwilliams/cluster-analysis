import { ScaleLinear, scaleLinear } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

export const graphMargin = { top: 40, right: 40, bottom: 40, left: 40 };

export const getGraphSelections = (graphId = 'main') => {
    return {
        xAxisGroup: select<SVGGElement, unknown>(`#x-axis-${graphId}`),
        yAxisGroup: select<SVGGElement, unknown>(`#y-axis-${graphId}`),
        brushGroup: select<SVGGElement, unknown>(`#brush-${graphId}`),
    };
};

export const getXScale = (parentWidth: number, xDomain = [-2, 2]) => {
    const xScale = scaleLinear()
        .domain(xDomain)
        .range([graphMargin.left, parentWidth - graphMargin.right]);

    return xScale;
};

export const getXAxis = (parentHeight: number, xScale: ScaleLinear<number, number, never>) => {
    const xAxis = axisBottom(xScale)
        .ticks(10)
        .tickSize(-(parentHeight - graphMargin.top - graphMargin.bottom));

    return xAxis;
};

export const getYScale = (parentHeight: number, yDomain = [2, -2]) => {
    const yScale = scaleLinear()
        .domain(yDomain)
        .range([graphMargin.top, parentHeight - graphMargin.bottom]);

    return yScale;
};

export const getYAxis = (parentWidth: number, yScale: ScaleLinear<number, number, never>) => {
    const yAxis = axisLeft(yScale)
        .ticks(10)
        .tickSize(-(parentWidth - graphMargin.left - graphMargin.right));

    return yAxis;
};
