import { create } from "zustand"

export const LANES = [272, 305, 338]
export const PET_SIZE = 50
export const PET_FEET_Y = 47

export type PetActivity = "idle" | "walk" | "hop" | "eat" | "hungry" | "sleep"
export type Facing = "left" | "right"

type PetState = {
  lane: number
  x: number
  facing: Facing
  activity: PetActivity
}

export const usePetStore = create<PetState>()(() => ({
  lane: 1,
  x: 300,
  facing: "left",
  activity: "idle",
}))
