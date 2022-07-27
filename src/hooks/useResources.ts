import { Cryptocurrency } from "types"
import create from "zustand"

interface UseResources {
  cryptocurrencies: Cryptocurrency[]
  setCryptocurrencies: (data: Cryptocurrency[]) => void
}

export const useResources = create<UseResources>((set) => ({
  cryptocurrencies: [],
  setCryptocurrencies: (cryptocurrencies) => set(() => ({ cryptocurrencies })),
}))
