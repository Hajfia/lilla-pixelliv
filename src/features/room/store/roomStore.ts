import { create } from "zustand"

type RoomState = {
  lightsOn: boolean
  doorOpen: boolean
  computerOn: boolean
  sideLampOn: boolean
  lavaLampOn: boolean
  fishFed: boolean
  toggleLights: () => void
  toggleDoor: () => void
  toggleComputer: () => void
  toggleSideLamp: () => void
  toggleLavaLamp: () => void
  feedFish: () => void
}

const FEEDING_TIME = 6000
let feedingTimer: ReturnType<typeof setTimeout> | undefined

export const useRoomStore = create<RoomState>()((set) => ({
  lightsOn: true,
  doorOpen: false,
  computerOn: false,
  sideLampOn: false,
  lavaLampOn: false,
  fishFed: false,
  toggleLights: () => set((state) => ({ lightsOn: !state.lightsOn })),
  toggleDoor: () => set((state) => ({ doorOpen: !state.doorOpen })),
  toggleComputer: () => set((state) => ({ computerOn: !state.computerOn })),
  toggleSideLamp: () => set((state) => ({ sideLampOn: !state.sideLampOn })),
  toggleLavaLamp: () => set((state) => ({ lavaLampOn: !state.lavaLampOn })),
  feedFish: () => {
    clearTimeout(feedingTimer)
    set({ fishFed: true })
    feedingTimer = setTimeout(() => set({ fishFed: false }), FEEDING_TIME)
  },
}))
