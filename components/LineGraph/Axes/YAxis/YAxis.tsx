import React from 'react';
import { graphMargin } from '../../../utils/plot';
import { axisTextClass } from '../utils';

export const YAxis = () => {
    return (
        <g
            id="y-axis-line-graph"
            transform={`translate(${graphMargin.left}, 0)`}
            className={axisTextClass}
        />
    );
};
