import { scaleLinear } from 'd3-scale';
import { select } from 'd3-selection';

export const graphMargin = { top: 40, right: 40, bottom: 40, left: 40 };

export const getGraphSelections = (graphId = 'main') => {
    return {
        xAxisGroup: select<SVGGElement, unknown>(`#x-axis-${graphId}`),
        yAxisGroup: select<SVGGElement, unknown>(`#y-axis-${graphId}`),
        brushGroup: select<SVGGElement, unknown>(`#brush-${graphId}`),
        pointsGroup: select<SVGGElement, unknown>(`#points-${graphId}`),
    };
};

export const getXScale = (parentWidth: number, xDomain = [-2, 2]) => {
    const xScale = scaleLinear()
        .domain(xDomain)
        .range([graphMargin.left, parentWidth - graphMargin.right]);

    return xScale;
};

export const getYScale = (parentHeight: number, yDomain = [2, -2]) => {
    const yScale = scaleLinear()
        .domain(yDomain)
        .range([graphMargin.top, parentHeight - graphMargin.bottom]);

    return yScale;
};
