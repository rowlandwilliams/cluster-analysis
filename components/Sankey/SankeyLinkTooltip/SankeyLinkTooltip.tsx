import classNames from 'classnames';
import { sankeyStore } from '../../../store/sankey';
import { formatTooltipValue } from '../utils/general';
import { sankeyMargin } from '../utils/plot';

export const SankeyLinkTooltip = () => {
    const { linkIsHovered, linkTooltipData } = sankeyStore();
    const { x, y, sourceProvince, targetProvince, linkValue } = linkTooltipData;

    return (
        <div
            className={classNames(
                'absolute bg-gray-900 text-xs shadow-lg p-2 pointer-events-none transform ',
                {
                    hidden: !linkIsHovered,
                },
            )}
            style={{
                left: x,
                top: y + sankeyMargin.top - 50,
            }}
        >
            <div className="flex">
                <div>{sourceProvince}</div>
                <div className="px-1">{'>'}</div>
                <div>{targetProvince}</div>
            </div>
            <div className="flex items-end pt-2">
                <div>{formatTooltipValue(linkValue)}</div>
                <div className="ml-1 text-gray-400 text-2xs">PEOPLE</div>
            </div>
        </div>
    );
};
