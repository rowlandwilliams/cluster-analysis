import create from 'zustand';
import { graphMargin } from '../components/ClusterAnalysis/Graphs/utils/shared';

interface AppState {
    zoomGraphDomains: number[][];
    setZoomGraphDomains: (zoomGraphDomains: number[][]) => void;
}

export const useStore = create<AppState>((set) => ({
    zoomGraphDomains: [
        [graphMargin.left, graphMargin.top],
        [graphMargin.left + 100, graphMargin.top + 100],
    ],
    setZoomGraphDomains: (zoomGraphDomains: number[][]) => set({ zoomGraphDomains }),
}));
