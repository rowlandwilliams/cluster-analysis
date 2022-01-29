import { GraphSelector } from './GraphSelector/GraphSelector';

const options = ['PCA', 'LDA'];

export const GraphSelectors = () => {
    return (
        <div className="flex gap-x-2 h-6">
            {options.map((option) => (
                <GraphSelector selectorText={option} key={option} />
            ))}
        </div>
    );
};
