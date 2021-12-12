import { useStore } from './../../../../../store/store';
import { getXAxis, getYScale, getYAxis, getGraphSelections } from '../../utils/shared';
import { selectAll } from 'd3-selection';
import { getXScale } from '../../utils/shared';

export const plotZoomGraph = (
    parentWidth: number,
    parentHeight: number,
    zoomGraphDomains: number[][],
) => {
    const { pointsData } = useStore.getState();
    const { xAxisGroup, yAxisGroup, pointsGroup } = getGraphSelections('zoom');

    const xDomain = [zoomGraphDomains[0][0], zoomGraphDomains[1][0]];
    const yDomain = [zoomGraphDomains[0][1], zoomGraphDomains[1][1]];

    const xAxisScale = getXScale(parentWidth, xDomain);
    const xAxis = getXAxis(parentHeight, xAxisScale);
    xAxisGroup.call(xAxis);

    const yAxisScale = getYScale(parentHeight, yDomain);
    const yAxis = getYAxis(parentWidth, yAxisScale);

    selectAll('.tick > line, .domain').attr('stroke-width', '0.1');

    yAxisGroup.call(yAxis);

    pointsGroup
        .selectAll('circle')
        .data(pointsData)
        .join('circle')
        .attr('cx', (d) => xAxisScale(d.x))
        .attr('cy', (d) => yAxisScale(d.y))
        .attr('r', 2)
        .attr('fill', 'red');
};
