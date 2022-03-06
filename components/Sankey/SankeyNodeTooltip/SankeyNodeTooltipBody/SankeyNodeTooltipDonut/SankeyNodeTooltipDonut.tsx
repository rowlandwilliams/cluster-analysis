interface Props {
    nodePercentage: number;
    nodeColor: string;
}

export const SankeyNodeTooltipDonut = ({ nodePercentage, nodeColor }: Props) => {
    return (
        <div className="flex items-center pt-2">
            <div>
                <svg className="w-12 h-12">
                    <circle
                        className="fill-current text-transparent transform translate-x-1/2 translate-y-1/2 opacity-30"
                        r="16"
                        fill="transparent"
                        strokeWidth="6"
                        strokeDashoffset="25"
                        stroke={nodeColor}
                    ></circle>
                    <circle
                        r="14"
                        className="fill-current text-gray-900 transform translate-x-1/2 translate-y-1/2 opacity-50"
                    ></circle>
                    <circle
                        className="fill-current text-transparent transform translate-x-1/2 translate-y-1/2"
                        r="16"
                        fill="transparent"
                        strokeWidth="8"
                        strokeDasharray={nodePercentage + ',' + (100 - nodePercentage)}
                        strokeDashoffset="25"
                        stroke={nodeColor}
                    ></circle>
                </svg>
            </div>
            <div className="ml-2 whitespace-nowrap text-gray-300">
                <div>ACCOUNTING FOR</div>
                <div>
                    <span className="text-gray-50">{nodePercentage}</span>% OF
                </div>
                <div>TOTAL INTERNAL MIGRATION</div>
            </div>
        </div>
    );
};
