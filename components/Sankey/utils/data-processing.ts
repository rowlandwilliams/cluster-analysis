import colors from 'tailwindcss/colors';
import { NodeObj, NodeWithColor, Province, RawFlow, SankeyLinkObj } from '../../../types/sankey';

// nodes
const getTotalDataCount = (sankeyDataRaw: RawFlow[]) => {
    return sankeyDataRaw.map((flow) => flow.count).reduce((a, b) => a + b, 0);
};

// get all the unique nodes from raw data (origin or destination)
const getUniqueOriginsOrDestinations = (sankeyDataRaw: RawFlow[], key: string) => {
    return [...new Set(sankeyDataRaw.map((rawFlowObj) => rawFlowObj[key]))];
};

const getNodeTotals = (
    sankeyDataRaw: RawFlow[],
    nodeName: string,
    identifier: string,
    totalDataCount: number,
) => {
    // calculate total for the destination and source version of each node

    const relevantFlows = sankeyDataRaw
        .filter((flow: RawFlow) => flow[identifier] === nodeName)
        .map((flow) => flow.count);

    const nDestinations = relevantFlows.length;

    const nodeSum = relevantFlows.reduce((a, b) => a + b, 0);

    const nodePercentage = (((nodeSum / totalDataCount) * 100) / 2).toFixed(2);

    return { nodeSum, nDestinations, nodePercentage };
};

// use unique nodes to get array of nodes object with name (for chart) and key (for sorting - left vs right side of sankey)
const getOriginsAndDestinationsWithNames = (
    uniqueOriginsOrDestinations: string[],
    identifier: string,
    provinces: Province[],
    nodeColors: NodeWithColor[],
    sankeyDataRaw: RawFlow[],
    totalDataCount: number,
    offset = 0,
) => {
    return uniqueOriginsOrDestinations.map((nodeObj, i) => {
        const { nodeSum, nDestinations, nodePercentage } = getNodeTotals(
            sankeyDataRaw,
            nodeObj,
            identifier,
            totalDataCount,
        );
        return {
            node: i + offset,
            name: nodeObj,
            directionKey: identifier,
            province: provinces
                .filter((province) => province.code === nodeObj)[0]
                .name.toUpperCase(),
            nodeColor: nodeColors.filter((colObj) => colObj.node === nodeObj)[0].color,
            nodeSum: nodeSum,
            nDestinations: nDestinations,
            nodePercentage: nodePercentage,
        };
    });
};

const badColors = ['warmGray', 'trueGray', 'gray', 'coolGray', 'blueGray', 'white', 'black'];

const getAllNodesWithColors = (origins: (string | number)[], destinations: (string | number)[]) => {
    const allNodes = [...new Set(origins.concat(destinations))];

    const colorKeys = Object.keys(colors)
        .filter((col) => !badColors.includes(col))
        .reverse();

    const nodesWithColors = allNodes.map((node, i) => ({
        node: node,
        color: colors[colorKeys[i]][400],
    }));

    return nodesWithColors as NodeWithColor[];
};

// get full node sets with unique id for each node on left or right of sankey
export const getNodesFromRawData = (sankeyDataRaw: RawFlow[], provinces: Province[]) => {
    const totalDataCount = getTotalDataCount(sankeyDataRaw);

    const origins = getUniqueOriginsOrDestinations(sankeyDataRaw, 'origin');
    const destinations = getUniqueOriginsOrDestinations(sankeyDataRaw, 'dest');

    const nodeColors = getAllNodesWithColors(origins, destinations);

    const originsWithNames = getOriginsAndDestinationsWithNames(
        origins as string[],
        'origin',
        provinces,
        nodeColors,
        sankeyDataRaw,
        totalDataCount,
    );

    const destinationsWithNames = getOriginsAndDestinationsWithNames(
        destinations as string[],
        'dest',
        provinces,
        nodeColors,
        sankeyDataRaw,
        totalDataCount,
        originsWithNames.length,
    );

    const allNodes: NodeObj[] = originsWithNames.concat(destinationsWithNames);
    return allNodes;
};

// links

// get node for each raw flow based on which node is in source / destination keys
const getSourceOrDestinationNode = (
    nodes: NodeObj[],
    rawFlowObj: RawFlow,
    directionKey: string,
) => {
    return nodes.filter(
        (node) => node.name === rawFlowObj[directionKey] && node.directionKey === directionKey,
    )[0].node;
};

// get sankey ready link object with correct source / target node ids and corresponding value
export const getLinksFromRawData = (nodes: NodeObj[], sankeyDataRaw: RawFlow[]) => {
    const links: SankeyLinkObj[] = sankeyDataRaw.map((rawFlowObj) => ({
        source: getSourceOrDestinationNode(nodes, rawFlowObj, 'origin'),
        target: getSourceOrDestinationNode(nodes, rawFlowObj, 'dest'),
        value: rawFlowObj.count,
    }));
    return links;
};

export const getSankeyDataFromRaw = (sankeyDataRaw: RawFlow[], provinces: Province[]) => {
    const nodes = getNodesFromRawData(sankeyDataRaw, provinces);
    const links = getLinksFromRawData(nodes, sankeyDataRaw);

    const finalData = { nodes: nodes, links: links };

    return finalData;
};
