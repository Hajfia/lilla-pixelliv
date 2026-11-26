import type { CSSProperties } from "react"
import "../assets/scss/SoftGlow.scss"

type SoftGlowProps = {
  cx: number
  cy: number
  on: boolean
  width?: number
  height?: number
  color?: "blue" | "lilac"
}

const SoftGlow = ({ cx, cy, on, width = 120, height = 80, color = "blue" }: SoftGlowProps) => {
  const style = {
    "--x": cx - width / 2,
    "--y": cy - height / 2,
    "--width": width,
    "--height": height,
  } as CSSProperties

  return (
    <div
      className={`room-object soft-glow soft-glow--${color}${on ? " soft-glow--on" : ""}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export default SoftGlow
