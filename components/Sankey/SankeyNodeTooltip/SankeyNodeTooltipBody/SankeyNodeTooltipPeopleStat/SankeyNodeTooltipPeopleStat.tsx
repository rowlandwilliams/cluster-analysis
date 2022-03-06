import { formatTooltipValue } from '../../../utils/general';

interface Props {
    nodeSum: number;
}

export const SankeyNodeTooltipPeopleStat = ({ nodeSum }: Props) => {
    return (
        <div className="flex items-end">
            <div className="text-gray-50 text-base mr-1">
                {nodeSum && formatTooltipValue(nodeSum)}
            </div>
            <div className="text-2xs text-gray-300">PEOPLE</div>
        </div>
    );
};
