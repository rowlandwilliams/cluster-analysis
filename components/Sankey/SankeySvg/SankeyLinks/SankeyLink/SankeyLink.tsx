import { useState } from 'react';
import { sankeyLinkHorizontal } from 'd3-sankey';
import classNames from 'classnames';
import { sankeyStore } from '../../../../../store/sankey';
import { TransformedLink } from '../../../../../types/sankey';

interface Props {
    link: TransformedLink;
    color: string;
}

export const SankeyLink = ({ link }: Props) => {
    const { activeNodes, setLinkIsHovered, setLinkTooltipData } = sankeyStore();

    const [thisLinkIsHovered, setThisLinkIsHovered] = useState(false);
    const { source, target } = link;
    const sourceNodeId = source.name + '-' + source.directionKey;
    const targetNodeId = target.name + '-' + target.directionKey;
    const gradientId = sourceNodeId + '-' + targetNodeId;

    const linkIsActive = activeNodes.includes(sourceNodeId) || activeNodes.includes(targetNodeId);

    const handleLinkEnter = () => {
        setLinkIsHovered(true);
        setThisLinkIsHovered(true);
        setLinkTooltipData({
            x: source.x1 + (target.x0 - source.x1) / 2,
            y: (link.y0 + (link.y1 - link.y0) / 2) as number,
            sourceProvince: source.province,
            targetProvince: target.province,
            linkValue: link.value,
        });
    };

    const handlLinkLeave = () => {
        setLinkIsHovered(false);
        setThisLinkIsHovered(false);
    };

    const nodesAreSelected = activeNodes.length > 0;
    return (
        <path
            onMouseEnter={() => handleLinkEnter()}
            onMouseLeave={() => handlLinkLeave()}
            className={classNames('stroke-current cursor-pointer', {
                'opacity-90': linkIsActive && thisLinkIsHovered,
                'opacity-70': linkIsActive || thisLinkIsHovered,
                'opacity-60': !nodesAreSelected && !linkIsActive,
                'opacity-5': nodesAreSelected && !linkIsActive,
            })}
            d={sankeyLinkHorizontal()(link) as string}
            style={{
                stroke: `url(#${gradientId})`,
                fill: 'none',
                strokeWidth: Math.max(1, link.width as number),
            }}
        />
    );
};
