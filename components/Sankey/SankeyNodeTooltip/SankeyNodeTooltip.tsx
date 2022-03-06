import classNames from 'classnames';
import { sankeyMargin } from '../utils/plot';
import { getLeftValueBasedOnNodePosition } from './utils/utils';
import { SankeyNodeTooltipHeader } from './SankeyNodeTooltipBody/SankeyNodeTooltipHeader/SankeyNodeTooltipHeader';
import { SankeyNodeTooltipBody } from './SankeyNodeTooltipBody/SankeyNodeTooltipBody';
import { sankeyStore } from '../../../store/sankey';

export const SankeyNodeTooltip = () => {
    const { nodeIsHovered, nodeTooltipData } = sankeyStore();

    const { x, y, province, nodeColor, nodeSum, nodePercentage } = nodeTooltipData;

    const getToOrFromIfNodeIsLeftOrRight = (xCoord: number) => {
        return xCoord > 0 ? 'TO' : 'FROM';
    };

    const direction = getToOrFromIfNodeIsLeftOrRight(x);
    return (
        <div
            className={classNames('absolute bg-gray-900 text-xs shadow-lg', {
                hidden: !nodeIsHovered,
                'transform -translate-x-full': x > 0,
            })}
            style={{
                left: getLeftValueBasedOnNodePosition(x),
                top: y + sankeyMargin.top,
            }}
        >
            <SankeyNodeTooltipHeader provinceName={province} backgroundColor={nodeColor} />
            <SankeyNodeTooltipBody
                nodeSum={nodeSum}
                direction={direction}
                provinceName={province}
                nodeColor={nodeColor}
                nodePercentage={nodePercentage}
            />
        </div>
    );
};
