import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react"
import clockFace from "../assets/images/clock-face.png"
import { useNow } from "../hooks/useNow"
import "../assets/scss/Clock.scss"

const SIZE = 35
const CENTER = 17
const HOUR_LENGTH = 7
const MINUTE_LENGTH = 11
const HAND_COLOR = "#2b2233"
const PIN_COLOR = "#8a5cc4"

type ClockProps = {
  x: number
  y: number
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

const handTip = (angle: number, length: number) => ({
  x: Math.round(CENTER + length * Math.sin(angle)),
  y: Math.round(CENTER - length * Math.cos(angle)),
})

const drawPixelLine = (ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number) => {
  const dx = Math.abs(x1 - x0)
  const dy = -Math.abs(y1 - y0)
  const stepX = x0 < x1 ? 1 : -1
  const stepY = y0 < y1 ? 1 : -1
  let error = dx + dy
  let x = x0
  let y = y0

  while (true) {
    ctx.fillRect(x, y, 1, 1)
    if (x === x1 && y === y1) break
    const doubled = 2 * error
    if (doubled >= dy) {
      error += dy
      x += stepX
    }
    if (doubled <= dx) {
      error += dx
      y += stepY
    }
  }
}

const Clock = ({ x, y, onClick }: ClockProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const now = useNow()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const time = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, SIZE, SIZE)
    ctx.fillStyle = HAND_COLOR

    const hourAngle = (((hours % 12) + minutes / 60) / 12) * 2 * Math.PI
    const hour = handTip(hourAngle, HOUR_LENGTH)
    drawPixelLine(ctx, CENTER, CENTER, hour.x, hour.y)

    const minuteAngle = (minutes / 60) * 2 * Math.PI
    const minute = handTip(minuteAngle, MINUTE_LENGTH)
    drawPixelLine(ctx, CENTER, CENTER, minute.x, minute.y)

    ctx.fillStyle = PIN_COLOR
    ctx.fillRect(CENTER - 1, CENTER - 1, 3, 3)
  }, [hours, minutes])

  const style = { "--x": x, "--y": y, "--width": SIZE } as CSSProperties

  return (
    <button
      type="button"
      className="room-object room-object--button clock"
      style={style}
      onClick={onClick}
      aria-label={`Klockan är ${time}`}
    >
      <img src={clockFace} alt="" />
      <canvas ref={canvasRef} width={SIZE} height={SIZE} className="clock__hands" />
      <span className="clock__digital" aria-hidden="true">
        {time}
      </span>
    </button>
  )
}

export default Clock
