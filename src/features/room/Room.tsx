import type { CSSProperties } from "react"
import background from "./assets/images/background-640.png"
import { useRoomScale } from "./hooks/useRoomScale"
import "./assets/scss/Room.scss"

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360

const Room = () => {
  const scale = useRoomScale(SCENE_WIDTH, SCENE_HEIGHT)

  return (
    <div className="room" style={{ "--scale": scale } as CSSProperties}>
        <img src={background} alt="Ett rosa rum i pixelgrafik" className="room-bg" />
    </div>
  )
}

export default Room
