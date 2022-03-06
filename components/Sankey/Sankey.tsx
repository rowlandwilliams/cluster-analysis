/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { southAfricaRaw } from './data/southAfrica/southAfricaRaw';
import { getSankeyDataFromRaw } from './utils/data-processing';
import { southAfricaProvinces } from './data/southAfrica/provinces';
import { getSankeyGenerator } from './utils/plot';
import { SankeyNodeTooltip } from './SankeyNodeTooltip/SankeyNodeTooltip';
import { SankeySvg } from './SankeySvg/SankeySvg';
import { SankeyLinkTooltip } from './SankeyLinkTooltip/SankeyLinkTooltip';
import { TransformedLink } from '../../types/sankey';

const reqProvinces = Array.from(Array(9).keys()).map((x) => 'ZAF:' + (x + 1));

const filterData = southAfricaRaw.filter(
    (province) => reqProvinces.includes(province.dest) || reqProvinces.includes(province.origin),
);

const uniqueProvinces = [...new Set(filterData.map((x) => x.dest || x.origin))];
console.log(uniqueProvinces);
const filteredProvinces = southAfricaProvinces.filter((province) =>
    uniqueProvinces.includes(province.code),
);

console.log(filteredProvinces);
const sankeyData = getSankeyDataFromRaw(filterData, filteredProvinces);

const Sankey = () => {
    const parentRef = useRef<HTMLDivElement>(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);

    const handleWindowResize = debounce((current: HTMLDivElement) => {
        setParentWidth(current.offsetWidth);
        setParentHeight(current.offsetHeight);
    }, 100);

    useEffect(() => {
        const { current } = parentRef;

        if (current) {
            handleWindowResize(current);
            const setResize = () => handleWindowResize(current);
            window.addEventListener('resize', setResize);
            return () => window.removeEventListener('resize', setResize);
        }
    }, [parentHeight, parentWidth, handleWindowResize]);

    // generate nodes and links from data
    const { nodes, links } = getSankeyGenerator(parentWidth, parentHeight, sankeyData);

    return (
        <div className="relative flex-grow py-8" ref={parentRef}>
            <div className="w-full h-full">
                <SankeySvg links={links as TransformedLink[]} nodes={nodes} />
                <SankeyNodeTooltip />
                <SankeyLinkTooltip />
            </div>
        </div>
    );
};

export default Sankey;
