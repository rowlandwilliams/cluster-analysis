import create from 'zustand';
import { LinkTooltip, NodeTooltip } from './../types/sankey';

interface SankeyState {
    nodeIsHovered: boolean;
    setNodeIsHovered: (nodeIsHovered: boolean) => void;
    linkIsHovered: boolean;
    setLinkIsHovered: (nodeIsHovered: boolean) => void;
    nodeTooltipData: NodeTooltip;
    setNodeTooltipData: (nodeTooltipData: NodeTooltip) => void;
    linkTooltipData: LinkTooltip;
    setLinkTooltipData: (linkTooltipData: LinkTooltip) => void;
    activeNodes: string[];
    addActiveNode: (node: string) => void;
    removeActiveNode: (node: string) => void;
}

export const sankeyStore = create<SankeyState>((set) => ({
    nodeIsHovered: false,
    setNodeIsHovered: (nodeIsHovered: boolean) => set({ nodeIsHovered }),
    linkIsHovered: false,
    setLinkIsHovered: (linkIsHovered: boolean) => set({ linkIsHovered }),
    nodeTooltipData: {} as NodeTooltip,
    setNodeTooltipData: (nodeTooltipData: NodeTooltip) => set({ nodeTooltipData }),
    linkTooltipData: {} as LinkTooltip,
    setLinkTooltipData: (linkTooltipData: LinkTooltip) => set({ linkTooltipData }),
    activeNodes: [],
    addActiveNode: (node: string) => {
        set((state) => ({
            activeNodes: [...state.activeNodes, node],
        }));
    },
    removeActiveNode: (node: string) => {
        set((state) => ({
            activeNodes: state.activeNodes.filter((nodeName) => nodeName !== node),
        }));
    },
}));
