import { debounce } from 'lodash';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { Selection } from 'd3-selection';
import { brush, BrushBehavior } from 'd3-brush';
import { useStore } from '../../../../../store/store';
import { getClusterXAxis, getClusterYAxis, plotPoints } from '../../utils/shared';
import { getGraphSelections, getXScale, getYScale, graphMargin } from '../../../../utils/plot';

export const brushGreen = '#9FFF8F';

export const getZoomGraphDomainsFromContainerDims = (parentWidth: number, parentHeight: number) => {
    return [
        [graphMargin.left, graphMargin.top],
        [
            graphMargin.left + (parentWidth - graphMargin.left - graphMargin.right) / 2,
            graphMargin.top + (parentHeight - graphMargin.bottom - graphMargin.top) / 2,
        ],
    ];
};

export const updateZoomGraphDomains = (
    event: { selection: number[][] },
    xScale: ScaleTime<number, number, never> | ScaleLinear<number, number, never>,
    yScale: ScaleLinear<number, number, never>,
) => {
    const selection = { event };
    const extent = selection.event.selection;

    if (!extent) return;

    const brushedDatesDomain = extent.map((extentValueArr: number[]) =>
        extentValueArr.map((extentValue, i) =>
            i > 0 ? yScale.invert(extentValue) : xScale.invert(extentValue),
        ),
    );

    const { setZoomGraphDomains } = useStore.getState();

    const handleBrushUpdate = debounce(() => {
        setZoomGraphDomains(brushedDatesDomain as number[][]);
    }, 50);

    handleBrushUpdate();
};

export const setInitialBrush = (
    brushGroup: Selection<SVGGElement, unknown, HTMLElement, never>,
    brushGenerator: BrushBehavior<unknown>,
) => {
    const { zoomGraphDomains } = useStore.getState();

    // call brush function and set initial position / position on time label click
    brushGroup
        .call(brushGenerator)
        .call(brushGenerator.move, zoomGraphDomains)
        .select('.selection') // color brush
        .attr('fill', brushGreen)
        .attr('stroke', brushGreen);
};

export const plotMainGraph = (parentWidth: number, parentHeight: number) => {
    const { pointsData } = useStore.getState();
    const { xAxisGroup, yAxisGroup, brushGroup, pointsGroup } = getGraphSelections();

    const xAxisScale = getXScale(parentWidth);
    const xAxis = getClusterXAxis(parentHeight, xAxisScale);
    xAxisGroup.call(xAxis);

    const yAxisScale = getYScale(parentHeight);
    const yAxis = getClusterYAxis(parentWidth, yAxisScale);
    yAxisGroup.call(yAxis);

    const brushGenerator = brush()
        .extent([
            [graphMargin.left, graphMargin.top],
            [parentWidth - graphMargin.right, parentHeight - graphMargin.bottom],
        ])
        .on('brush', (event) => {
            updateZoomGraphDomains(event, xAxisScale, yAxisScale);
        });

    setInitialBrush(brushGroup, brushGenerator);

    plotPoints(pointsGroup, pointsData, xAxisScale, yAxisScale);
};
