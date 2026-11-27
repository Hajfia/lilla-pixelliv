import type { CSSProperties, MouseEvent } from "react"
import "../assets/scss/RoomObject.scss"

type RoomObjectProps = {
  src: string
  alt: string
  x: number
  y: number
  width: number
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  pressed?: boolean
  frames?: number
  duration?: number
  depth?: number
}

const RoomObject = ({ src, alt, x, y, width, onClick, pressed, frames, duration = 1000, depth }: RoomObjectProps) => {
  const style = { "--x": x, "--y": y, "--width": width, "--z": depth } as CSSProperties
  const spriteStyle = { "--frames": frames, "--duration": `${duration}ms` } as CSSProperties

  const sprite = frames ? (
    <span className="sprite" style={spriteStyle}>
      <img src={src} alt="" className="sprite__strip" />
    </span>
  ) : null

  if (!onClick) {
    if (sprite) {
      return (
        <span className="room-object" style={style} role="img" aria-label={alt}>
          {sprite}
        </span>
      )
    }
    return <img src={src} alt={alt} className="room-object" style={style} />
  }

  return (
    <button
      type="button"
      className="room-object room-object--button"
      style={style}
      onClick={onClick}
      aria-pressed={pressed}
      aria-label={alt}
    >
      {sprite ?? <img src={src} alt="" />}
    </button>
  )
}

export default RoomObject
