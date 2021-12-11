import { getXAxis, getYAxis, getGraphSelections } from './../../MainGraph/utils/plot';
import { getXScale } from '../../MainGraph/utils/plot';

export const plotZoomGraph = (parentWidth: number, parentHeight: number) => {
    const { xAxisGroup, yAxisGroup } = getGraphSelections('zoom');

    const xAxisScale = getXScale(parentWidth);
    const xAxis = getXAxis(parentHeight, xAxisScale);
    xAxisGroup.call(xAxis);

    const yAxis = getYAxis(parentWidth, parentHeight);
    yAxisGroup.call(yAxis);
};
