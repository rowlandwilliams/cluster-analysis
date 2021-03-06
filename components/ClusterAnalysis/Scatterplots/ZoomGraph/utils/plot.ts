import { selectAll } from 'd3-selection';
import { getClusterYAxis } from './../../utils/shared';
import { getClusterXAxis, plotPoints } from '../../utils/shared';
import { useStore } from '../../../../../store/store';
import { getGraphSelections, getXScale, getYScale } from '../../../../utils/plot';

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
    const xAxis = getClusterXAxis(parentHeight, xAxisScale, true);
    xAxisGroup.call(xAxis);

    const yAxisScale = getYScale(parentHeight, yDomain);
    const yAxis = getClusterYAxis(parentWidth, yAxisScale, true);

    selectAll('.tick > line, .domain').attr('stroke-width', '0.1');

    yAxisGroup.call(yAxis);

    plotPoints(pointsGroup, pointsData, xAxisScale, yAxisScale);
};
