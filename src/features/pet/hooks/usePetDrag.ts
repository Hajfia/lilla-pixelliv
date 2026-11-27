import { useRef } from "react"
import type { PointerEvent } from "react"
import { PET_FEET_Y, usePetStore } from "../store/petStore"
import type { PetActivity } from "../store/petStore"

const LIFT_THRESHOLD = 4
const GRABBABLE: PetActivity[] = ["idle", "walk", "hop"]

type Grab = {
  startX: number
  startY: number
  offsetX: number
  offsetY: number
  lifted: boolean
}

const toRoomPoint = (pet: HTMLElement, clientX: number, clientY: number) => {
  const room = pet.offsetParent
  if (!room) return null
  const rect = room.getBoundingClientRect()
  const scale = Number(getComputedStyle(room).getPropertyValue("--scale")) || 1
  return { x: (clientX - rect.left) / scale, y: (clientY - rect.top) / scale }
}

export const usePetDrag = () => {
  const grab = useRef<Grab | null>(null)
  const pickUp = usePetStore((state) => state.pickUp)
  const moveHeld = usePetStore((state) => state.moveHeld)
  const drop = usePetStore((state) => state.drop)

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (!GRABBABLE.includes(usePetStore.getState().activity)) return
    event.currentTarget.setPointerCapture(event.pointerId)
    grab.current = {
      startX: event.clientX,
      startY: event.clientY,
      offsetX: 0,
      offsetY: 0,
      lifted: false,
    }
  }

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    const current = grab.current
    if (!current) return

    const pointer = toRoomPoint(event.currentTarget, event.clientX, event.clientY)
    if (!pointer) return

    if (!current.lifted) {
      const moved = Math.hypot(event.clientX - current.startX, event.clientY - current.startY)
      if (moved < LIFT_THRESHOLD) return

      const rect = event.currentTarget.getBoundingClientRect()
      const pet = toRoomPoint(event.currentTarget, rect.left + rect.width / 2, rect.top)
      if (!pet) return

      current.offsetX = pointer.x - pet.x
      current.offsetY = pointer.y - (pet.y + PET_FEET_Y)
      current.lifted = true
      pickUp()
    }

    moveHeld(pointer.x - current.offsetX, pointer.y - current.offsetY)
  }

  const onPointerUp = () => {
    if (grab.current?.lifted) drop()
    grab.current = null
  }

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  }
}
