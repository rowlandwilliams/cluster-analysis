import { Line as LineType } from 'd3-shape';
import { LineGraphPair } from '../../../../types/types';
import { areaPurple, lineGraphData } from '../../utils/utils';

interface Props {
    lineGenerator: LineType<LineGraphPair>;
}

export const Line = ({ lineGenerator }: Props) => {
    return (
        <path
            id="line-line-graph"
            d={lineGenerator(lineGraphData) as string}
            fill="none"
            stroke={areaPurple}
            className="stroke-2"
        />
    );
};
