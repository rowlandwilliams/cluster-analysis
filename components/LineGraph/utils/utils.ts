import { randomUniform } from 'd3-random';
import { ScaleLinear, ScaleTime } from 'd3-scale';
import { area, curveNatural, line } from 'd3-shape';
import { LineGraphPair } from '../../../types/types';

export const areaPurple = '#7263F1';

const nYears = 80;
const today = new Date();
export const startYear = today.getFullYear() - nYears;
export const endYear = startYear + nYears;
export const yMin = 0;
export const yMax = 20;
const offset = 5;

const getLineGraphData = () => {
    const random = randomUniform(yMin + offset, yMax - offset);
    const lineGraphData = [...Array(nYears + 1)].map((x, i) => ({
        year: startYear + i,
        yValue: random(),
    }));

    return lineGraphData;
};

export const lineGraphData: LineGraphPair[] = getLineGraphData();

export const getLineGenerator = (
    xScale: ScaleTime<number, number, never> | ScaleLinear<number, number, never>,
    yScale: ScaleLinear<number, number, never>,
) => {
    return line<LineGraphPair>()
        .x((d: LineGraphPair) => xScale(d.year))
        .y((d: LineGraphPair) => yScale(d.yValue))
        .curve(curveNatural);
};

export const getAreaGenerator = (
    xScale: ScaleTime<number, number, never> | ScaleLinear<number, number, never>,
    yScale: ScaleLinear<number, number, never>,
) => {
    return area<LineGraphPair>()
        .x((d: LineGraphPair) => xScale(d.year))
        .y0(yScale(0))
        .y1((d: LineGraphPair) => yScale(d.yValue))
        .curve(curveNatural);
};
