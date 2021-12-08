export interface RawFlow {
    [key: string]: string | number;
    origin: string;
    dest: string;
    count: number;
}

export interface NodeWithColor {
    node: string;
    color: string;
}

export interface NodeObj {
    node: number;
    name: string;
    key: string;
}

export interface TransformedNode {
    depth: number;
    height: number;
    index: number;
    key: string;
    layer: number;
    name: string;
    node: number;
    sourceLinks: any;
    targetLinks: any;
    value: number;
    x0: number;
    x1: number;
    y0: number;
    y1: number;
}

export interface Province {
    name: string;
    code: string;
    latitude: number;
    longitude: number;
}

export interface SankeyLinkObj {
    source: number;
    target: number;
    value: number;
}

export interface RawData {
    nodes: NodeObj[];
    links: SankeyLinkObj[];
}

export interface NodeTooltip {
    x: number;
    y: number;
    province: string;
    nodeColor: string;
    nodeSum: number;
    nodePercentage: number;
}
