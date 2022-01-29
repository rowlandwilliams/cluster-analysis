import { GraphHeader } from './GraphHeader/GraphHeader';
import { ClusterAnalysis } from './ClusterAnalysis/ClusterAnalysis';
import { useStore } from '../store/store';

export const VisualisationContainer = () => {
    const { activeSelector } = useStore();

    const isCluster = activeSelector === 'PCA';
    return (
        <div className="h-full bg-chart-gray text-white rounded-md flex flex-col">
            <GraphHeader />
            {isCluster ? <ClusterAnalysis /> : <article className="bg-white">line</article>}
        </div>
    );
};
