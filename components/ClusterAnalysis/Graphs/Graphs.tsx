import { MainGraph } from './MainGraph/MainGraph';
import { ZoomGraph } from './ZoomGraph/ZoomGraph';

export const Graphs = () => {
    return (
        <div className="flex-grow md:h-96 px-4 md:flex">
            <MainGraph />
            <ZoomGraph />
        </div>
    );
};
