import RoomObject from "../../room/components/RoomObject"
import chickIdle from "../assets/images/chick-idle.png"
import { LANES, PET_FEET_Y, PET_SIZE, usePetStore } from "../store/petStore"

const Pet = () => {
  const lane = usePetStore((state) => state.lane)
  const x = usePetStore((state) => state.x)

  return (
    <RoomObject
      src={chickIdle}
      alt="Kyckling"
      x={x - PET_SIZE / 2}
      y={LANES[lane] - PET_FEET_Y}
      width={PET_SIZE}
      frames={4}
      duration={2400}
    />
  )
}

export default Pet
