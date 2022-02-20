import create from 'zustand';
import { graphMargin } from '../components/utils/plot';
import { Point } from './../types/types';

interface AppState {
    zoomGraphDomains: (number | Date)[][];
    setZoomGraphDomains: (zoomGraphDomains: (number | Date)[][]) => void;
    pointsData: Point[];
    activeSelector: string;
    setActiveSelector: (selectorText: string) => void;
}

const points = [...Array(300)].map(() => ({
    x: Math.random() < 0.5 ? Math.random() * 2 : -Math.random() * 2,
    y: Math.random() < 0.5 ? Math.random() * 2 : -Math.random() * 2,
    group: Math.floor(Math.random() * 4),
}));

export const useStore = create<AppState>((set) => ({
    zoomGraphDomains: [
        [graphMargin.left, graphMargin.top],
        [graphMargin.left + 100, graphMargin.top + 100],
    ],
    setZoomGraphDomains: (zoomGraphDomains: (number | Date)[][]) => set({ zoomGraphDomains }),
    pointsData: points,
    activeSelector: 'PCA',
    setActiveSelector: (activeSelector: string) => set({ activeSelector }),
}));
