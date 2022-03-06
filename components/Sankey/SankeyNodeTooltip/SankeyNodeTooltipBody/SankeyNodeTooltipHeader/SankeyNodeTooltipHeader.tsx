interface Props {
    provinceName: string;
    backgroundColor: string;
}

export const SankeyNodeTooltipHeader = ({ provinceName, backgroundColor }: Props) => {
    return (
        <div
            className="p-2 font-readexpro-medium text-gray-900"
            style={{ backgroundColor: backgroundColor }}
        >
            {provinceName}
        </div>
    );
};
