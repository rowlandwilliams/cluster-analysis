import { SankeyNodeTooltipMigrationText } from './SankeyNodeTooltipMigrationText/SankeyNodeTooltipMigrationText';
import { SankeyNodeTooltipPeopleStat } from './SankeyNodeTooltipPeopleStat/SankeyNodeTooltipPeopleStat';
import { SankeyNodeTooltipDonut } from './SankeyNodeTooltipDonut/SankeyNodeTooltipDonut';

interface Props {
    nodeSum: number;
    direction: string;
    provinceName: string;
    nodePercentage: number;
    nodeColor: string;
}

export const SankeyNodeTooltipBody = ({
    nodeSum,
    direction,
    provinceName,
    nodePercentage,
    nodeColor,
}: Props) => {
    return (
        <div className="p-2 ">
            <SankeyNodeTooltipPeopleStat nodeSum={nodeSum} />
            <div className="text-2xs text-gray-400">
                <SankeyNodeTooltipMigrationText direction={direction} provinceName={provinceName} />
                <SankeyNodeTooltipDonut nodePercentage={nodePercentage} nodeColor={nodeColor} />
            </div>
        </div>
    );
};
