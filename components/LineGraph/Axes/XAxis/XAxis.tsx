import React from 'react';
import { graphMargin } from '../../../utils/plot';
import { axisTextClass } from '../utils';

interface Props {
    parentHeight: number;
}

export const XAxis = ({ parentHeight }: Props) => {
    return (
        <g
            id="x-axis-line-graph"
            transform={`translate(0, ${parentHeight - graphMargin.bottom})`}
            className={axisTextClass}
        />
    );
};
