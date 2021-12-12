import { Point } from './../types/types';
import create from 'zustand';
import { graphMargin } from '../components/ClusterAnalysis/Graphs/utils/shared';

interface AppState {
    zoomGraphDomains: number[][];
    setZoomGraphDomains: (zoomGraphDomains: number[][]) => void;
    pointsData: Point[];
}

const points = [...Array(1000)].map(() => ({
    x: Math.random() < 0.5 ? Math.random() * 2 : -Math.random() * 2,
    y: Math.random() < 0.5 ? Math.random() * 2 : -Math.random() * 2,
    group: Math.floor(Math.random() * 4),
}));

export const useStore = create<AppState>((set) => ({
    zoomGraphDomains: [
        [graphMargin.left, graphMargin.top],
        [graphMargin.left + 100, graphMargin.top + 100],
    ],
    setZoomGraphDomains: (zoomGraphDomains: number[][]) => set({ zoomGraphDomains }),
    pointsData: points,
}));
