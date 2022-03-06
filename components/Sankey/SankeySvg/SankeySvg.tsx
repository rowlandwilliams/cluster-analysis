import { SankeyNodeMinimal } from 'd3-sankey';
import { SankeyLinkGradients } from './SankeyLinkGradients/SankeyLinkGradients';
import { sankeyMargin } from '../utils/plot';
import { SankeyNodes } from './SankeyNodes/SankeyNodes';
import { SankeyLinks } from './SankeyLinks/SankeyLinks';
import { TransformedLink } from '../../../types/sankey';

interface Props {
    links: TransformedLink[];
    nodes: SankeyNodeMinimal<Record<string, never>, Record<string, never>>[];
}

export const SankeySvg = ({ links, nodes }: Props) => {
    return (
        <svg width="100%" height="100%">
            <SankeyLinkGradients links={links as TransformedLink[]} />{' '}
            <g transform={`translate(${sankeyMargin.left}, ${sankeyMargin.top})`}>
                <SankeyLinks links={links} />
                <SankeyNodes nodes={nodes} />
            </g>
        </svg>
    );
};
