import { ScaleLinear, ScaleTime,  } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import { Selection } from 'd3-selection';
import { Point } from '../../../../types/types';
import { graphMargin } from '../../../utils/plot';

const pointPurple = '#C479FF';
const pointRed = '#FF6868';
const pointYellow = '#FFFA7A';
const pointPink = '#f472b6';

const pointColors = { 0: pointYellow, 1: pointRed, 2: pointPurple, 3: pointPink };

export const getClusterXAxis = (
    parentHeight: number,
    xScale: ScaleTime<number, number, never> | ScaleLinear<number, number, never>,
    isZoom = false,
) => {
    const xAxis = axisBottom(xScale)
        .ticks(isZoom ? 15 : 10)
        .tickSize(-(parentHeight - graphMargin.top - graphMargin.bottom));

    return xAxis;
};

export const getClusterYAxis = (
    parentWidth: number,
    yScale: ScaleLinear<number, number, never>,
    isZoom = false,
) => {
    const yAxis = axisLeft(yScale)
        .ticks(isZoom ? 15 : 10)
        .tickSize(-(parentWidth - graphMargin.left - graphMargin.right));

    return yAxis;
};

export const plotPoints = (
    pointsGroup: Selection<SVGGElement, unknown, HTMLElement, unknown>,
    pointsData: Point[],
    xScale: ScaleTime<number, number, never> | ScaleLinear<number, number, never>,
    yScale: ScaleLinear<number, number, never>,
) => {
    return pointsGroup
        .selectAll('circle')
        .data(pointsData)
        .join('circle')
        .attr('class', (d) => 'group-' + d.group)
        .attr('cx', (d) => xScale(d.x))
        .attr('cy', (d) => yScale(d.y))
        .attr('r', 3)
        .attr('fill', (d) => pointColors[d.group]);
};
