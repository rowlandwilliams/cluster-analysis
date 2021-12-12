import { GraphHeader } from './GraphHeader/GraphHeader';
import { Graphs } from './Graphs/Graphs';
import { GroupSelectors } from './GroupSelectors/GroupSelectors';

export const ClusterAnalysis = () => {
    return (
        <div className="h-full bg-chart-gray text-white rounded-md flex flex-col">
            <GraphHeader />
            <Graphs />
            <GroupSelectors />
        </div>
    );
};
