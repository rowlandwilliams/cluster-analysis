import { graphMargin } from '../utils/general';

interface Props {
    parentWidth: number;
    parentHeight: number;
}

export const AxisLines = ({ parentWidth, parentHeight }: Props) => {
    return (
        <g className="stroke-current text-chart-grid-grey font-inconsolata-regular">
            <line
                x1={graphMargin.left}
                x2={parentWidth - graphMargin.right}
                y1={parentHeight / 2}
                y2={parentHeight / 2}
            ></line>
            <line
                y1={graphMargin.left}
                y2={parentHeight - graphMargin.right}
                x1={parentWidth / 2}
                x2={parentWidth / 2}
            ></line>
        </g>
    );
};
