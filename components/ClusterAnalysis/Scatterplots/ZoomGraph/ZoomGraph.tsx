import classNames from 'classnames';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { useStore } from '../../../../store/store';
import { graphMargin } from '../../../utils/plot';
import { plotZoomGraph } from './utils/plot';

export const ZoomGraph = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);
    const isLoading = parentWidth === 0;

    const { zoomGraphDomains } = useStore();

    const handleWindowResize = debounce((current: HTMLDivElement) => {
        setParentWidth(current.offsetWidth);
        setParentHeight(current.offsetHeight);
    }, 100);

    useEffect(() => {
        const { current } = parentRef;

        if (current) {
            const setDimensions = () => handleWindowResize(current);
            setDimensions();
            window.addEventListener('resize', setDimensions);
            return () => window.removeEventListener('resize', setDimensions);
        }
    }, [handleWindowResize, parentWidth, parentHeight]);

    useEffect(() => {
        plotZoomGraph(parentWidth, parentHeight, zoomGraphDomains);
    }, [parentWidth, parentHeight, zoomGraphDomains]);

    return (
        <div
            className={classNames(
                'w-full md:w-1/2 h-1/2 md:h-full transition-opacity duration-200',
                {
                    'opacity-0': isLoading,
                    'opacity-100': !isLoading,
                },
            )}
            ref={parentRef}
        >
            <svg width="100%" height="100%">
                <clipPath id="myClip">
                    <rect
                        transform={`translate(${graphMargin.left}, ${graphMargin.top})`}
                        width={parentWidth - graphMargin.left - graphMargin.right}
                        height={parentHeight - graphMargin.top - graphMargin.bottom}
                    ></rect>{' '}
                </clipPath>
                <g
                    id="x-axis-zoom"
                    transform={`translate(0,${parentHeight - graphMargin.top})`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular stroke-0"
                ></g>
                <g
                    id="y-axis-zoom"
                    transform={`translate(${graphMargin.left}, 0)`}
                    className="stroke-current text-chart-grid-grey font-inconsolata-regular stroke-0"
                ></g>
                <g id="points-zoom" clipPath="url(#myClip)"></g>
            </svg>
        </div>
    );
};
