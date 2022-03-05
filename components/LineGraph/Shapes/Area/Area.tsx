import { Area as AreaType } from 'd3-shape';
import React from 'react';
import { LineGraphPair } from '../../../../types/types';
import { lineGraphData } from '../../utils/utils';

interface Props {
    areaGenerator: AreaType<LineGraphPair>;
}

export const Area = ({ areaGenerator }: Props) => {
    return (
        <path
            id="area-line-graph"
            d={areaGenerator(lineGraphData) as string}
            fill="url(#area-gradient)"
            className="opacity-40"
        />
    );
};
