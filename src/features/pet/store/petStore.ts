import { create } from "zustand"

export const LANES = [272, 305, 338]
export const LANE_BOUNDS = [
  { min: 200, max: 580 },
  { min: 40, max: 600 },
  { min: 40, max: 600 },
]
export const PET_SIZE = 50
export const PET_FEET_Y = 47
export const WALK_SPEED = 30
export const HOP_DURATION = 450

export type PetActivity = "idle" | "walk" | "hop" | "eat" | "hungry" | "sleep"
export type Facing = "left" | "right"

type PetState = {
  lane: number
  x: number
  facing: Facing
  activity: PetActivity
  moveMs: number
  walkTo: (target: number) => void
  hopTo: (lane: number) => void
  arrive: () => void
}

const clampToLane = (lane: number, x: number) => {
  const { min, max } = LANE_BOUNDS[lane]
  return Math.round(Math.min(max, Math.max(min, x)))
}

export const usePetStore = create<PetState>()((set) => ({
  lane: 1,
  x: 300,
  facing: "left",
  activity: "idle",
  moveMs: 0,

  walkTo: (target) =>
    set((state) => {
      const x = clampToLane(state.lane, target)
      if (x === state.x) return {}
      return {
        x,
        facing: x < state.x ? "left" : "right",
        activity: "walk",
        moveMs: (Math.abs(x - state.x) / WALK_SPEED) * 1000,
      }
    }),

  hopTo: (lane) =>
    set((state) => {
      if (lane === state.lane || lane < 0 || lane >= LANES.length) return {}
      return {
        lane,
        x: clampToLane(lane, state.x),
        activity: "hop",
        moveMs: HOP_DURATION,
      }
    }),

  arrive: () => set({ activity: "idle", moveMs: 0 }),
}))
