import create from 'zustand';

interface AppState {
    zoomGraphDomains: number[][];
    setZoomGraphDomains: (zoomGraohDomains: number[][]) => void;
}

export const useStore = create<AppState>((set) => ({
    zoomGraphDomains: [
        [0, 0],
        [0, 0],
    ],
    setZoomGraphDomains: (zoomGraphDomains: number[][]) => set({ zoomGraphDomains }),
}));
