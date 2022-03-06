interface Props {
    source: any;
    target: any;
}

export const SankeyLinkGradient = ({ source, target }: Props) => {
    const sourceNodeId = source.name + '-' + source.directionKey;
    const targetNodeId = target.name + '-' + target.directionKey;
    const gradientId = sourceNodeId + '-' + targetNodeId;

    const sourceNodeColor = source.nodeColor;
    const targetNodeColor = target.nodeColor;

    return (
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
            <stop offset="5%" stopColor={sourceNodeColor} />
            <stop offset="95%" stopColor={targetNodeColor} />
        </linearGradient>
    );
};
