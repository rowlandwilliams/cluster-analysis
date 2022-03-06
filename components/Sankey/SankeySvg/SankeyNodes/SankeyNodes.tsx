import { SankeyNodeMinimal } from 'd3-sankey';
import { SankeyNode } from './SankeyNode/SankeyNode';

interface Props {
    nodes: SankeyNodeMinimal<Record<string, never>, Record<string, never>>[];
}

export const SankeyNodes = ({ nodes }: Props) => {
    return (
        <g id="nodes">
            {nodes.map((node: any) => (
                <SankeyNode
                    {...node}
                    color={node.nodeColor}
                    key={node.name + node.directionKey}
                    nodeIdKey={node.directionKey}
                />
            ))}
        </g>
    );
};
