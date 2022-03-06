import { TransformedLink } from '../../../../types/sankey';
import { SankeyLinkGradient } from './SankeyLinkGradient/SankeyLinkGradient';

interface Props {
    links: TransformedLink[];
}
export const SankeyLinkGradients = ({ links }: Props) => {
    return (
        <defs>
            {links.map((link) => (
                <SankeyLinkGradient
                    {...link}
                    key={
                        link.source.name +
                        '-' +
                        link.source.key +
                        link.target.name +
                        '-' +
                        link.target.key
                    }
                />
            ))}
        </defs>
    );
};
