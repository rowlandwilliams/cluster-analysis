import { SankeyLinkMinimal } from 'd3-sankey';
import { TransformedLink } from '../../../../types/sankey';
import { SankeyLink } from './SankeyLink/SankeyLink';

interface Props {
    links: SankeyLinkMinimal<Record<string, never>, Record<string, never>>[];
}

export const SankeyLinks = ({ links }: Props) => {
    return (
        <g id="links">
            {links.map((link) => (
                <SankeyLink link={link as TransformedLink} color={'grey'} key={link.value} />
            ))}
        </g>
    );
};
