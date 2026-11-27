import { create } from "zustand"

export const LANES = [272, 305, 338]
export const LANE_BOUNDS = [
  { min: 210, max: 580 },
  { min: 40, max: 600 },
  { min: 40, max: 600 },
]
export const PET_SIZE = 50
export const PET_FEET_Y = 47
export const WALK_SPEED = 30
export const HOP_DURATION = 450
export const FALL_TIME_FACTOR = 40
export const ROOM_WIDTH = 640
export const ROOM_HEIGHT = 360

export type PetActivity = "idle" | "walk" | "hop" | "held" | "fall" | "land" | "eat" | "hungry" | "sleep"
export type Facing = "left" | "right"

type PetState = {
  lane: number
  x: number
  heldY: number
  facing: Facing
  activity: PetActivity
  moveMs: number
  walkTo: (target: number) => void
  hopTo: (lane: number) => void
  arrive: () => void
  pickUp: () => void
  moveHeld: (x: number, feetY: number) => void
  drop: () => void
  land: () => void
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const clampToLane = (lane: number, x: number) => {
  const { min, max } = LANE_BOUNDS[lane]
  return Math.round(clamp(x, min, max))
}

export const findLandingLane = (x: number, feetY: number) => {
  const lane = LANES.findIndex(
    (laneY, index) => laneY >= feetY && x >= LANE_BOUNDS[index].min && x <= LANE_BOUNDS[index].max,
  )
  return lane === -1 ? LANES.length - 1 : lane
}

export const usePetStore = create<PetState>()((set) => ({
  lane: 1,
  x: 300,
  heldY: 0,
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

  pickUp: () => set({ activity: "held", moveMs: 0 }),

  moveHeld: (x, feetY) =>
    set({
      x: clamp(x, PET_SIZE / 2, ROOM_WIDTH - PET_SIZE / 2),
      heldY: clamp(feetY, PET_FEET_Y, ROOM_HEIGHT),
    }),

  drop: () =>
    set((state) => {
      const lane = findLandingLane(state.x, state.heldY)
      const x = clampToLane(lane, state.x)
      const distance = Math.abs(LANES[lane] - state.heldY)
      if (distance < 1) return { lane, x, activity: "land", moveMs: 0 }
      return {
        lane,
        x,
        activity: "fall",
        moveMs: Math.sqrt(distance) * FALL_TIME_FACTOR,
      }
    }),

  land: () => set({ activity: "land", moveMs: 0 }),
}))
