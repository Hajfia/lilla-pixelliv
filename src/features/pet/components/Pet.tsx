import type { AnimationEvent, CSSProperties, TransitionEvent } from "react"
import chickIdle from "../assets/images/chick-idle.png"
import chickWalk from "../assets/images/chick-walk.png"
import chickFront from "../assets/images/chick-front.png"
import chickHeld from "../assets/images/chick-held.png"
import { LANES, PET_FEET_Y, PET_SIZE, usePetStore } from "../store/petStore"
import type { PetActivity } from "../store/petStore"
import { usePetRoaming } from "../hooks/usePetRoaming"
import { usePetDrag } from "../hooks/usePetDrag"
import "../assets/scss/Pet.scss"

type Sprite = {
  src: string
  frames: number
  duration: number
}

const IDLE_SPRITE: Sprite = { src: chickIdle, frames: 4, duration: 2400 }
const WALK_SPRITE: Sprite = { src: chickWalk, frames: 4, duration: 800 }
const FRONT_SPRITE: Sprite = { src: chickFront, frames: 1, duration: 1000 }
const HELD_SPRITE: Sprite = { src: chickHeld, frames: 4, duration: 600 }

const SPRITES: Partial<Record<PetActivity, Sprite>> = {
  idle: IDLE_SPRITE,
  walk: WALK_SPRITE,
  hop: WALK_SPRITE,
  held: HELD_SPRITE,
  fall: FRONT_SPRITE,
  land: FRONT_SPRITE,
}

const FINISHED_BY: Partial<Record<PetActivity, string>> = {
  walk: "left",
  hop: "top",
  fall: "top",
}

const HELD_Z = 999

const Pet = () => {
  const lane = usePetStore((state) => state.lane)
  const x = usePetStore((state) => state.x)
  const heldY = usePetStore((state) => state.heldY)
  const facing = usePetStore((state) => state.facing)
  const activity = usePetStore((state) => state.activity)
  const moveMs = usePetStore((state) => state.moveMs)
  const arrive = usePetStore((state) => state.arrive)
  const land = usePetStore((state) => state.land)

  usePetRoaming()
  const dragHandlers = usePetDrag()

  const sprite = SPRITES[activity] ?? IDLE_SPRITE
  const isHeld = activity === "held"
  const feetY = isHeld ? heldY : LANES[lane]

  const style = {
    "--x": x - PET_SIZE / 2,
    "--y": feetY - PET_FEET_Y,
    "--width": PET_SIZE,
    "--z": isHeld ? HELD_Z : LANES[lane],
    "--move": `${moveMs}ms`,
  } as CSSProperties

  const spriteStyle = {
    "--frames": sprite.frames,
    "--duration": `${sprite.duration}ms`,
  } as CSSProperties

  const handleTransitionEnd = (event: TransitionEvent<HTMLSpanElement>) => {
    if (event.target !== event.currentTarget) return
    if (event.propertyName !== FINISHED_BY[activity]) return
    if (activity === "fall") land()
    else arrive()
  }

  const handleAnimationEnd = (event: AnimationEvent<HTMLSpanElement>) => {
    if (event.animationName === "pet-land") arrive()
  }

  return (
    <span
      className={`pet pet--${activity}`}
      style={style}
      role="img"
      aria-label="Kyckling"
      onTransitionEnd={handleTransitionEnd}
      onAnimationEnd={handleAnimationEnd}
      {...dragHandlers}
    >
      <span className={facing === "right" ? "pet__body pet__body--right" : "pet__body"}>
        <span className="sprite" style={spriteStyle}>
          <img src={sprite.src} alt="" className="sprite__strip" draggable={false} />
        </span>
      </span>
    </span>
  )
}

export default Pet
