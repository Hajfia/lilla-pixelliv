import type { CSSProperties } from "react"
import glow from "../assets/images/lamp-glow.png"
import "../assets/scss/LampGlow.scss"

const GLOW_SIZE = 104

type LampGlowProps = {
  cx: number
  cy: number
  on: boolean
}

const LampGlow = ({ cx, cy, on }: LampGlowProps) => {
  const style = {
    "--x": cx - GLOW_SIZE / 2,
    "--y": cy - GLOW_SIZE / 2,
    "--width": GLOW_SIZE,
  } as CSSProperties

  return (
    <img
      src={glow}
      alt=""
      className={on ? "room-object lamp-glow lamp-glow--on" : "room-object lamp-glow"}
      style={style}
    />
  )
}

export default LampGlow
