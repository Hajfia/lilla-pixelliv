import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react"
import clockFace from "../assets/images/clock-face.png"
import { useNow } from "../hooks/useNow"
import { drawClockHands, formatTime } from "../utils/clockHands"
import "../assets/scss/Clock.scss"

const SIZE = 35

const HANDS = {
  size: SIZE,
  center: 17,
  hourLength: 7,
  minuteLength: 11,
  thickness: 1,
  pinSize: 3,
  handColor: "#2b2233",
  pinColor: "#8a5cc4",
}

type ClockProps = {
  x: number
  y: number
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const Clock = ({ x, y, onClick }: ClockProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const now = useNow()
  const hours = now.getHours()
  const minutes = now.getMinutes()

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return
    drawClockHands(ctx, hours, minutes, HANDS)
  }, [hours, minutes])

  const style = { "--x": x, "--y": y, "--width": SIZE } as CSSProperties

  return (
    <button
      type="button"
      className="room-object room-object--button clock"
      style={style}
      onClick={onClick}
      aria-label={`Klockan är ${formatTime(hours, minutes)}`}
    >
      <img src={clockFace} alt="" />
      <canvas ref={canvasRef} width={SIZE} height={SIZE} className="clock__hands" />
    </button>
  )
}

export default Clock
