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
import desk from "./assets/images/desk.png"
import computerTower from "./assets/images/computer-tower.png"
import computerOnImg from "./assets/images/computer-on.png"
import computerOff from "./assets/images/computer-off.png"
import butterflyChair from "./assets/images/butterfly-chair.png"
import flowerRug from "./assets/images/flower-rug.png"
import sideTable from "./assets/images/side-table.png"
import tableLampOn from "./assets/images/table-lamp-on.png"
import tableLampOff from "./assets/images/table-lamp-off.png"
import foodShelf from "./assets/images/food-shelf.png"
import foodPicture from "./assets/images/food-picture.png"
import seedBag from "./assets/images/seed-bag.png"
import bowlEmpty from "./assets/images/bowl-empty.png"
import bookShelf from "./assets/images/book-shelf.png"
import books from "./assets/images/books.png"
import lavaLampOff from "./assets/images/lava-lamp-off.png"
import lavaLampOn from "./assets/images/lava-lamp-on.png"
import vaseLilies from "./assets/images/vase-lilies.png"
import radioOff from "./assets/images/radio-off.png"
import clothesRack from "./assets/images/clothes-rack.png"
import boots from "./assets/images/boots.png"
import heels from "./assets/images/heels.png"
import fishCabinet from "./assets/images/fish-cabinet.png"
import fishbowl from "./assets/images/fishbowl.png"
import fishbowlFed from "./assets/images/fishbowl-fed.png"
import fishFood from "./assets/images/fish-food.png"
import RoomObject from "./components/RoomObject"
import LampGlow from "./components/LampGlow"
import SoftGlow from "./components/SoftGlow"
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
  const computerOn = useRoomStore((state) => state.computerOn)
  const toggleComputer = useRoomStore((state) => state.toggleComputer)
  const sideLampOn = useRoomStore((state) => state.sideLampOn)
  const toggleSideLamp = useRoomStore((state) => state.toggleSideLamp)
  const lavaOn = useRoomStore((state) => state.lavaLampOn)
  const toggleLavaLamp = useRoomStore((state) => state.toggleLavaLamp)
  const fishFed = useRoomStore((state) => state.fishFed)
  const feedFish = useRoomStore((state) => state.feedFish)
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
        <RoomObject src={fishFood} alt="Burk med fiskmat, mata fiskarna" x={318} y={188} width={10} onClick={feedFish} />
        <RoomObject
          src={painting}
          alt="Tavla med en kyckling"
          x={68}
          y={135}
          width={49}
          onClick={(event) => openModal("painting", event.currentTarget.getBoundingClientRect())}
        />
        <RoomObject src={bookShelf} alt="Vit vägghylla" x={128} y={192} width={48} />
        <RoomObject src={books} alt="Fem böcker i pastellfärger" x={146} y={177} width={25} />
        <RoomObject
          src={lavaOn ? lavaLampOn : lavaLampOff}
          alt="Rosa lavalampa"
          x={133}
          y={167}
          width={13}
          onClick={toggleLavaLamp}
          pressed={lavaOn}
          frames={lavaOn ? 12 : undefined}
          duration={3000}
        />
        <RoomObject src={bookShelf} alt="Vit vägghylla" x={128} y={155} width={48} />
        <RoomObject src={radioOff} alt="Mintgrön radio" x={135} y={138} width={36} />
        <RoomObject src={clothesRack} alt="Klädstång med kläder" x={195} y={170} width={60} />
        <Clock
          x={383}
          y={120}
          onClick={(event) => openModal("clock", event.currentTarget.getBoundingClientRect())}
        />
        <RoomObject src={foodPicture} alt="Tavla med tallrik och bestick" x={547} y={131} width={27} />
        <RoomObject src={foodShelf} alt="Vit vägghylla" x={542} y={180} width={36} />
        <RoomObject src={seedBag} alt="Fröpåse med ett hjärta" x={552} y={160} width={15} />
        <LampGlow cx={190} cy={84} on={lightsOn} />
        <LampGlow cx={410} cy={84} on={lightsOn} />
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
        <RoomObject src={flowerRug} alt="Lila matta formad som en blomma" x={55} y={270} width={122} />
        <RoomObject src={sofa} alt="Ljusblå soffa" x={52} y={220} width={125} />
        <RoomObject src={sideTable} alt="Runt vitt sidobord med tre fack" x={184} y={234} width={24} />
        <RoomObject
          src={sideLampOn ? tableLampOn : tableLampOff}
          alt="Rosa bordslampa"
          x={186}
          y={218}
          width={18}
          onClick={toggleSideLamp}
          pressed={sideLampOn}
        />
        <RoomObject src={boots} alt="Svarta stövlar med pälskant" x={211} y={235} width={23} />
        <RoomObject src={heels} alt="Rosa klackskor" x={235} y={246} width={18} />
        <RoomObject src={fishCabinet} alt="Rosa plastskåp med två dörrar" x={276} y={228} width={48} />
        <RoomObject
          src={fishFed ? fishbowlFed : fishbowl}
          alt={fishFed ? "Fiskskål där guldfiskarna får mat" : "Fiskskål med två guldfiskar"}
          x={285}
          y={205}
          width={30}
          frames={24}
          duration={3000}
        />
        <RoomObject src={desk} alt="Vitt skrivbord med lådor" x={353} y={228} width={96} />
        <RoomObject
          src={computerTower}
          alt="Datorlåda"
          x={404}
          y={241}
          width={15}
          onClick={toggleComputer}
          pressed={computerOn}
        />
        <RoomObject
          src={computerOn ? computerOnImg : computerOff}
          alt="Rosa dator"
          x={361}
          y={199}
          width={41}
          onClick={toggleComputer}
          pressed={computerOn}
        />
        <RoomObject src={vaseLilies} alt="Glasvas med rosa liljor" x={405} y={186} width={32} />
        <RoomObject src={butterflyChair} alt="Rosa fjärilsstol" x={358} y={225} width={36} />
        <RoomObject src={bowlEmpty} alt="Tom matskål" x={547} y={253} width={26} />
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
        <SoftGlow cx={381} cy={211} on={computerOn && !lightsOn} />
        <LampGlow cx={195} cy={228} on={sideLampOn} />
        <SoftGlow cx={139} cy={177} on={lavaOn && !lightsOn} width={56} height={56} color="lilac" />
        <SoftGlow cx={300} cy={218} on={!lightsOn} width={56} height={48} />
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
