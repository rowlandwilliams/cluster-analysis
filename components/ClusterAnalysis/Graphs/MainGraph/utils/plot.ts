import { graphMargin, brushGreen } from './general';
import { ScaleLinear, scaleLinear } from 'd3-scale';
import { select, selectAll } from 'd3-selection';
import { axisBottom, axisLeft } from 'd3-axis';
import { brush, BrushBehavior } from 'd3-brush';

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
    xBottom: ScaleLinear<number, number, never>,
) => {
    const selection = { event };
    const extent = selection.event.selection;

    if (!extent) return;

    const brushedDatesDomain = extent.map((extentValueArr: number[]) =>
        extentValueArr.map((extentValue) => xBottom.invert(extentValue)),
    );

    console.log(brushedDatesDomain);
};

export const setInitialBrush = (
    brushGroup: Selection<SVGGElement, unknown, HTMLElement, never>,
    brushGenerator: BrushBehavior<unknown>,
    parentWidth: number,
    parentHeight: number,
    brushDomain: number[][],
) => {
    // call brush function and set initial position / position on time label click
    brushGroup
        .call(brushGenerator)
        .transition()
        .call(brushGenerator.move, brushDomain)
        .select('.selection') // color brush
        .attr('fill', brushGreen)
        .attr('stroke', brushGreen);
};

export const plotMainGraph = (
    parentWidth: number,
    parentHeight: number,
    brushDomain: number[][],
) => {
    const { xAxisGroup, yAxisGroup, brushGroup } = getGraphSelections();

    const xAxisScale = getXScale(parentWidth);
    const xAxis = getXAxis(parentHeight, xAxisScale);
    xAxisGroup.call(xAxis);

    const yAxis = getYAxis(parentWidth, parentHeight);
    yAxisGroup.call(yAxis);

    selectAll('.tick > line, .domain').attr('stroke-width', '0.1');

    const brushGenerator = brush()
        .extent([
            [graphMargin.left, graphMargin.top],
            [parentWidth - graphMargin.right, parentHeight - graphMargin.bottom],
        ])
        .on('brush', (event) => {
            updateZoomGraphDomains(event, xAxisScale);
        });

    setInitialBrush(brushGroup, brushGenerator, parentWidth, parentHeight, brushDomain);
};
