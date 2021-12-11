import { GraphHeader } from './GraphHeader/GraphHeader';
import { MainGraph } from './MainGraph/MainGraph';

export const ClusterAnalysis = () => {
    return (
        <div className="bg-chart-gray text-white rounded-md" style={{ width: 900 }}>
            <GraphHeader />
            <div className="h-96 p-4 flex">
                <MainGraph />
                <div className="w-1/2">Graph 2</div>
            </div>
        </div>
    );
};
