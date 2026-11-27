import { useEffect } from "react"
import { LANES, LANE_BOUNDS, usePetStore } from "../store/petStore"

const HOP_CHANCE = 0.3
const MIN_WALK = 20

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

export const usePetRoaming = () => {
  const activity = usePetStore((state) => state.activity)

  useEffect(() => {
    if (activity !== "idle") return

    const timer = window.setTimeout(() => {
      const { lane, x, walkTo, hopTo } = usePetStore.getState()

      if (Math.random() < HOP_CHANCE) {
        const neighbours = [lane - 1, lane + 1].filter((next) => next >= 0 && next < LANES.length)
        hopTo(neighbours[Math.floor(Math.random() * neighbours.length)])
        return
      }

      const { min, max } = LANE_BOUNDS[lane]
      let target = randomBetween(min, max)
      while (Math.abs(target - x) < MIN_WALK) {
        target = randomBetween(min, max)
      }
      walkTo(target)
    }, randomBetween(2000, 5000))

    return () => window.clearTimeout(timer)
  }, [activity])
}
