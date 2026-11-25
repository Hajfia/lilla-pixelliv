import type { CSSProperties } from "react"
import background from "./assets/images/background-640.png"
import windowLeftDay from "./assets/images/window1-day.png"
import windowLeftNight from "./assets/images/window1-night.png"
import windowRightDay from "./assets/images/window2-day.png"
import windowRightNight from "./assets/images/window2-night.png"
import lampOn from "./assets/images/lamp-on.png"
import lampOff from "./assets/images/lamp-off.png"
import painting from "./assets/images/painting-chick.png"
import sofa from "./assets/images/sofa.png"
import doorFrame from "./assets/images/door-frame.png"
import doorClosed from "./assets/images/door-closed.png"
import doorOpenImg from "./assets/images/door-open.png"
import switchOn from "./assets/images/switch-on.png"
import switchOff from "./assets/images/switch-off.png"
import RoomObject from "./components/RoomObject"
import LampGlow from "./components/LampGlow"
import CrossFadeObject from "./components/CrossFadeObject"
import Clock from "./components/Clock"
import BigClock from "./components/BigClock"
import { useRoomScale } from "./hooks/useRoomScale"
import { useRoomStore } from "./store/roomStore"
import { useUiStore } from "../../shared/store/uiStore"
import ZoomModal from "../../shared/components/ZoomModal"
import "./assets/scss/Room.scss"

const SCENE_WIDTH = 640
const SCENE_HEIGHT = 360

const Room = () => {
  const scale = useRoomScale(SCENE_WIDTH, SCENE_HEIGHT)
  const lightsOn = useRoomStore((state) => state.lightsOn)
  const toggleLights = useRoomStore((state) => state.toggleLights)
  const doorOpen = useRoomStore((state) => state.doorOpen)
  const toggleDoor = useRoomStore((state) => state.toggleDoor)
  const openItem = useUiStore((state) => state.openItem)
  const originRect = useUiStore((state) => state.originRect)
  const openModal = useUiStore((state) => state.openModal)
  const closeModal = useUiStore((state) => state.closeModal)

  return (
    <div className="room" style={{ "--scale": scale } as CSSProperties}>
        <img src={background} alt="Ett rosa rum i pixelgrafik" className="room-bg" />
        <CrossFadeObject
          src={windowLeftDay}
          fadeSrc={windowLeftNight}
          faded={!lightsOn}
          alt={lightsOn ? "Fönster med sol" : "Fönster med stjärnhimmel"}
          x={261}
          y={108}
          width={98}
        />
        <CrossFadeObject
          src={windowRightDay}
          fadeSrc={windowRightNight}
          faded={!lightsOn}
          alt={lightsOn ? "Fönster med moln" : "Fönster med stjärnhimmel"}
          x={440}
          y={108}
          width={98}
        />
        <RoomObject
          src={painting}
          alt="Tavla med en kyckling"
          x={91}
          y={130}
          width={49}
          onClick={(event) => openModal("painting", event.currentTarget.getBoundingClientRect())}
        />
        <Clock
          x={383}
          y={120}
          onClick={(event) => openModal("clock", event.currentTarget.getBoundingClientRect())}
        />
        <LampGlow cx={190} cy={74} on={lightsOn} />
        <LampGlow cx={410} cy={74} on={lightsOn} />
        <RoomObject
          src={lightsOn ? lampOn : lampOff}
          alt="Taklampa"
          x={175}
          y={10}
          width={30}
          onClick={toggleLights}
          pressed={lightsOn}
        />
        <RoomObject
          src={lightsOn ? lampOn : lampOff}
          alt="Taklampa"
          x={395}
          y={10}
          width={30}
          onClick={toggleLights}
          pressed={lightsOn}
        />
        <RoomObject src={sofa} alt="Ljusblå soffa" x={52} y={220} width={125} />
        <RoomObject src={doorFrame} alt="" x={607} y={147} width={33} />
        <RoomObject
          src={doorOpen ? doorOpenImg : doorClosed}
          alt="Dörr"
          x={611}
          y={153}
          width={25}
          onClick={toggleDoor}
          pressed={doorOpen}
        />
        <RoomObject
          src={lightsOn ? switchOn : switchOff}
          alt="Lampknapp för taklamporna"
          x={587}
          y={192}
          width={9}
          onClick={toggleLights}
          pressed={lightsOn}
        />
        <div className={lightsOn ? "room-night" : "room-night room-night--on"} />
        <ZoomModal open={openItem === "painting"} origin={originRect} label="Tavlan förstorad" onClose={closeModal}>
          <img src={painting} alt="Tavla med en kyckling" className="painting-zoom" />
        </ZoomModal>
        <ZoomModal open={openItem === "clock"} origin={originRect} label="Klockan förstorad" onClose={closeModal}>
          <BigClock />
        </ZoomModal>
    </div>
  )
}

export default Room
