import type { CSSProperties, TransitionEvent } from "react"
import chickIdle from "../assets/images/chick-idle.png"
import chickWalk from "../assets/images/chick-walk.png"
import { LANES, PET_FEET_Y, PET_SIZE, usePetStore } from "../store/petStore"
import type { PetActivity } from "../store/petStore"
import { usePetRoaming } from "../hooks/usePetRoaming"
import "../assets/scss/Pet.scss"

type Sprite = {
  src: string
  frames: number
  duration: number
}

const IDLE_SPRITE: Sprite = { src: chickIdle, frames: 4, duration: 2400 }

const SPRITES: Partial<Record<PetActivity, Sprite>> = {
  idle: IDLE_SPRITE,
  walk: { src: chickWalk, frames: 4, duration: 800 },
  hop: { src: chickWalk, frames: 4, duration: 800 },
}

const Pet = () => {
  const lane = usePetStore((state) => state.lane)
  const x = usePetStore((state) => state.x)
  const facing = usePetStore((state) => state.facing)
  const activity = usePetStore((state) => state.activity)
  const moveMs = usePetStore((state) => state.moveMs)
  const arrive = usePetStore((state) => state.arrive)

  usePetRoaming()

  const sprite = SPRITES[activity] ?? IDLE_SPRITE

  const style = {
    "--x": x - PET_SIZE / 2,
    "--y": LANES[lane] - PET_FEET_Y,
    "--width": PET_SIZE,
    "--z": LANES[lane],
    "--move": `${moveMs}ms`,
  } as CSSProperties

  const spriteStyle = {
    "--frames": sprite.frames,
    "--duration": `${sprite.duration}ms`,
  } as CSSProperties

  const handleTransitionEnd = (event: TransitionEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget) return
    const finishedProperty = activity === "hop" ? "top" : "left"
    if (event.propertyName === finishedProperty) arrive()
  }

  return (
    <span
      className={`pet pet--${activity}`}
      style={style}
      role="img"
      aria-label="Kyckling"
      onTransitionEnd={handleTransitionEnd}
    >
      <span className={facing === "right" ? "pet__body pet__body--right" : "pet__body"}>
        <span className="sprite" style={spriteStyle}>
          <img src={sprite.src} alt="" className="sprite__strip" />
        </span>
      </span>
    </span>
  )
}

export default Pet
