import { create } from 'zustand'

const useConfiguratorStore = create((set) => ({
    colors: {
        base: '#56B7E6',
        black: '#56B7E6',
        white: '#CBC6B8',
    },
    modelPosition: [0, 0, 0],
    setPartColor: (part, color) => set((state) => ({
        colors: { ...state.colors, [part]: color }
    })),
    setModelPosition: (position) => set({ modelPosition: position }),
}))

export default useConfiguratorStore
