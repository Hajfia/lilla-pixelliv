import type { CSSProperties } from "react"
import "../assets/scss/RoomObject.scss"

type RoomObjectProps = {
  src: string
  alt: string
  x: number
  y: number
  width: number
  onClick?: () => void
  pressed?: boolean
}

const RoomObject = ({ src, alt, x, y, width, onClick, pressed }: RoomObjectProps) => {
  const style = { "--x": x, "--y": y, "--width": width } as CSSProperties

  if (!onClick) {
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
      <img src={src} alt="" />
    </button>
  )
}

export default RoomObject
