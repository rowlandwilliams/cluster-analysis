import { GraphHeader } from './GraphHeader/GraphHeader';
import { Graphs } from './Graphs/Graphs';

export const ClusterAnalysis = () => {
    return (
        <div className="bg-chart-gray text-white rounded-md" style={{ width: 900 }}>
            <GraphHeader />
            <Graphs />
        </div>
    );
};
