import type { CSSProperties } from "react"
import "../assets/scss/RoomObject.scss"

type RoomObjectProps = {
  src: string
  alt: string
  x: number
  y: number
  width: number
}

const RoomObject = ({ src, alt, x, y, width }: RoomObjectProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className="room-object"
      style={{ "--x": x, "--y": y, "--width": width } as CSSProperties}
    />
  )
}

export default RoomObject
