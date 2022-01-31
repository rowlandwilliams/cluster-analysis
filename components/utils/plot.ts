import { scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';

export const graphMargin = { top: 80, right: 80, bottom: 80, left: 80 };

export const getGraphSelections = (graphId = 'main') => {
    return {
        xAxisGroup: select<SVGGElement, unknown>(`#x-axis-${graphId}`),
        yAxisGroup: select<SVGGElement, unknown>(`#y-axis-${graphId}`),
        brushGroup: select<SVGGElement, unknown>(`#brush-${graphId}`),
        pointsGroup: select<SVGGElement, unknown>(`#points-${graphId}`),
        lineGroup: select<SVGGElement, unknown>(`#line-${graphId}`),
    };
};

export const getXScale = (parentWidth: number, xDomain = [-2, 2], isTime = false) => {
    return isTime
        ? scaleTime()
              .domain(xDomain)
              .range([graphMargin.left * 2, parentWidth - graphMargin.right])
        : scaleLinear()
              .domain(xDomain)
              .range([graphMargin.left, parentWidth - graphMargin.right]);
};

export const getYScale = (parentHeight: number, yDomain = [2, -2]) => {
    const yScale = scaleLinear()
        .domain(yDomain)
        .range([graphMargin.top, parentHeight - graphMargin.bottom]);

    return yScale;
};
