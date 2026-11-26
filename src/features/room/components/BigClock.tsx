import { useEffect, useRef } from "react"
import clockFaceBig from "../assets/images/clock-face-big.png"
import { useNow } from "../hooks/useNow"
import { drawClockHands, formatTime } from "../utils/clockHands"
import "../assets/scss/BigClock.scss"

const SIZE = 97

const HANDS = {
  size: SIZE,
  center: 48,
  hourLength: 20,
  minuteLength: 31,
  thickness: 2,
  pinSize: 5,
  handColor: "#2b2233",
  pinColor: "#8a5cc4",
}

const BigClock = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const now = useNow()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    drawClockHands(ctx, hours, minutes, HANDS)
  }, [hours, minutes])

  return (
    <div className="big-clock" role="img" aria-label={`Klockan är ${formatTime(hours, minutes)}`}>
      <img src={clockFaceBig} alt="" />
      <canvas ref={canvasRef} width={SIZE} height={SIZE} className="big-clock__hands" />
    </div>
  )
}

export default BigClock
