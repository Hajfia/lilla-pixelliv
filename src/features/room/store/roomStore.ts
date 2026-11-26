import { create } from "zustand"

type RoomState = {
  lightsOn: boolean
  doorOpen: boolean
  computerOn: boolean
  sideLampOn: boolean
  toggleLights: () => void
  toggleDoor: () => void
  toggleComputer: () => void
  toggleSideLamp: () => void
}

export const useRoomStore = create<RoomState>()((set) => ({
  lightsOn: true,
  doorOpen: false,
  computerOn: false,
  sideLampOn: false,
  toggleLights: () => set((state) => ({ lightsOn: !state.lightsOn })),
  toggleDoor: () => set((state) => ({ doorOpen: !state.doorOpen })),
  toggleComputer: () => set((state) => ({ computerOn: !state.computerOn })),
  toggleSideLamp: () => set((state) => ({ sideLampOn: !state.sideLampOn })),
}))
