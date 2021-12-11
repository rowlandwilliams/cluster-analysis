import { graphMargin } from './general';
import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';

export const getMainGraphSelections = () => {
    return {
        xAxisGroup: select<SVGGElement, unknown>('#x-axis-main'),
        yAxisGroup: select<SVGGElement, unknown>('#y-axis-main'),
    };
};

export const getXAxis = (parentWidth: number, parentHeight: number) => {
    const xScale = scaleLinear()
        .domain([-2, 2])
        .range([graphMargin.left, parentWidth - graphMargin.right]);

    const xAxis = axisBottom(xScale)
        .ticks(5)
        .tickSize(-(parentHeight - graphMargin.top - graphMargin.bottom));

    return xAxis;
};

export const getYAxis = (parentWidth: number, parentHeight: number) => {
    const yScale = scaleLinear()
        .domain([2, -2])
        .range([graphMargin.top, parentHeight - graphMargin.bottom]);

    const yAxis = axisLeft(yScale)
        .ticks(5)
        .tickSize(-(parentWidth - graphMargin.left - graphMargin.right));

    return yAxis;
};
