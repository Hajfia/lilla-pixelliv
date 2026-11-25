import { create } from "zustand"

type RoomState = {
  lightsOn: boolean
  doorOpen: boolean
  toggleLights: () => void
  toggleDoor: () => void
}

export const useRoomStore = create<RoomState>()((set) => ({
  lightsOn: true,
  doorOpen: false,
  toggleLights: () => set((state) => ({ lightsOn: !state.lightsOn })),
  toggleDoor: () => set((state) => ({ doorOpen: !state.doorOpen })),
}))
