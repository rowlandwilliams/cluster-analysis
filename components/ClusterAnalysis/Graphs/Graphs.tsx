import { MainGraph } from './MainGraph/MainGraph';
import { ZoomGraph } from './ZoomGraph/ZoomGraph';

export const Graphs = () => {
    return (
        <div className="h-96 p-4 flex">
            <MainGraph />
            <ZoomGraph />
        </div>
    );
};
