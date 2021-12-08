import { numberWithCommas } from '../../utils/general';
import { sankeyMargin, nodeTooltipPadding, nodeWidth } from './../../utils/plot';

export const getLeftValueBasedOnNodePosition = (xCoord: number) => {
    const xWithMargin = xCoord + sankeyMargin.left;

    // if node is on the right side zCoord >0
    const rightHandNode = xCoord > 0;
    return rightHandNode
        ? xWithMargin - nodeTooltipPadding
        : xWithMargin + nodeWidth + nodeTooltipPadding;
};

export const formatTooltipValue = (value: number) => {
    return numberWithCommas(Math.floor(value)).replace('.00', '');
};
