import type { CSSProperties } from "react"
import "../assets/scss/ScreenGlow.scss"

const GLOW_WIDTH = 120
const GLOW_HEIGHT = 80

type ScreenGlowProps = {
  cx: number
  cy: number
  on: boolean
}

const ScreenGlow = ({ cx, cy, on }: ScreenGlowProps) => {
  const style = {
    "--x": cx - GLOW_WIDTH / 2,
    "--y": cy - GLOW_HEIGHT / 2,
    "--width": GLOW_WIDTH,
    "--height": GLOW_HEIGHT,
  } as CSSProperties

  return (
    <div
      className={on ? "room-object screen-glow screen-glow--on" : "room-object screen-glow"}
      style={style}
      aria-hidden="true"
    />
  )
}

export default ScreenGlow
