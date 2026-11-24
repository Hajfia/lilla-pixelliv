import type { CSSProperties } from "react"
import background from "./assets/images/background-640.png"
import windowLeft from "./assets/images/window1-day.png"
import windowRight from "./assets/images/window2-day.png"
import lamp from "./assets/images/lamp-on.png"
import painting from "./assets/images/painting-chick.png"
import sofa from "./assets/images/sofa.png"
import doorFrame from "./assets/images/door-frame.png"
import door from "./assets/images/door-closed.png"
import RoomObject from "./components/RoomObject"
import { useRoomScale } from "./hooks/useRoomScale"
import "./assets/scss/Room.scss"

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360

const Room = () => {
  const scale = useRoomScale(SCENE_WIDTH, SCENE_HEIGHT)

  return (
    <div className="room" style={{ "--scale": scale } as CSSProperties}>
        <img src={background} alt="Ett rosa rum i pixelgrafik" className="room-bg" />
        <RoomObject src={windowLeft} alt="Fönster med sol" x={60} y={98} width={98} />
        <RoomObject src={windowRight} alt="Fönster med moln" x={440} y={98} width={98} />
        <RoomObject src={painting} alt="Tavla med en kyckling" x={285} y={112} width={49} />
        <RoomObject src={lamp} alt="Taklampa" x={175} y={0} width={30} />
        <RoomObject src={lamp} alt="Taklampa" x={395} y={0} width={30} />
        <RoomObject src={sofa} alt="Ljusblå soffa" x={52} y={216} width={112} />
        <RoomObject src={doorFrame} alt="" x={607} y={147} width={33} />
        <RoomObject src={door} alt="Dörr" x={611} y={153} width={25} />
    </div>
  )
}

export default Room
