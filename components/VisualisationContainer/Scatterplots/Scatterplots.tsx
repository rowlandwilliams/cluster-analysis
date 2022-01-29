import { MainGraph } from './MainGraph/MainGraph';
import { ZoomGraph } from './ZoomGraph/ZoomGraph';

export const Scatterplots = () => {
    return (
        <div className="flex-grow px-4 md:flex">
            <MainGraph />
            <ZoomGraph />
        </div>
    );
};
