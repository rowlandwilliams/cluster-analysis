import { GraphSelector } from './GraphSelector/GraphSelector';

export const GraphSelectors = () => {
    return (
        <div className="flex h-6">
            <GraphSelector isActive selectorText="PCA" />
            <div className="ml-1">
                <GraphSelector selectorText="LDA" />
            </div>
        </div>
    );
};
