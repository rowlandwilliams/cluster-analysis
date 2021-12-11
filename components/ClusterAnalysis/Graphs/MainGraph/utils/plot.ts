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

export const updateBottomAreaWhileBrushing = (
    event: { selection: number[] },
    xBottom: ScaleLinear<number, number, never>,
) => {
    const selection = { event };
    console.log(selection);
    const extent = selection.event.selection;
    if (!extent) return;
    const brushedDatesDomain = extent.map((x: number) => xBottom.invert(x));
    console.log(extent, brushedDatesDomain);
    // clipBottomChartAreaToBrush(xBottom, brushedDatesDomain);
};

export const setInitialBrush = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    brushGroup: Selection<SVGGElement, unknown, HTMLElement, any>,
    brushGenerator: BrushBehavior<unknown>,
    parentWidth: number,
    parentHeight: number,
) => {
    // call brush function and set initial position / position on time label click
    brushGroup
        .call(brushGenerator)
        .transition()
        .call(brushGenerator.move, [
            [graphMargin.left, graphMargin.top],
            [
                graphMargin.left + (parentWidth - graphMargin.left - graphMargin.right) / 2,
                graphMargin.top + (parentHeight - graphMargin.bottom - graphMargin.top) / 2,
            ],
        ])
        .select('.selection') // color brush
        .attr('fill', brushGreen)
        .attr('stroke', brushGreen);
};

export const plotMainGraph = (parentWidth: number, parentHeight: number) => {
    const { xAxisGroup, yAxisGroup, brushGroup } = getGraphSelections();

    const xAxisScale = getXScale(parentWidth);
    const xAxis = getXAxis(parentHeight, xAxisScale);
    xAxisGroup.call(xAxis);

    const yAxis = getYAxis(parentWidth, parentHeight);
    yAxisGroup.call(yAxis);

    selectAll('.tick > line, .domain').attr('stroke-width', '0.1');

    const brushGenerator = brush().extent([
        [graphMargin.left, graphMargin.top],
        [parentWidth - graphMargin.right, parentHeight - graphMargin.bottom],
    ]);

    setInitialBrush(brushGroup, brushGenerator, parentWidth, parentHeight);
};
