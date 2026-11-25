type ClockHandsOptions = {
  size: number
  center: number
  hourLength: number
  minuteLength: number
  thickness: number
  pinSize: number
  handColor: string
  pinColor: string
}

const handTip = (center: number, angle: number, length: number) => ({
  x: Math.round(center + length * Math.sin(angle)),
  y: Math.round(center - length * Math.cos(angle)),
})

const drawPixelLine = (
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  thickness: number,
) => {
  const dx = Math.abs(x1 - x0)
  const dy = -Math.abs(y1 - y0)
  const stepX = x0 < x1 ? 1 : -1
  const stepY = y0 < y1 ? 1 : -1
  let error = dx + dy
  let x = x0
  let y = y0

  while (true) {
    ctx.fillRect(x, y, thickness, thickness)
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

export const formatTime = (hours: number, minutes: number) =>
  `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`

export const drawClockHands = (
  ctx: CanvasRenderingContext2D,
  hours: number,
  minutes: number,
  options: ClockHandsOptions,
) => {
  const { size, center, hourLength, minuteLength, thickness, pinSize, handColor, pinColor } = options

  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = handColor

  const hourAngle = (((hours % 12) + minutes / 60) / 12) * 2 * Math.PI
  const hour = handTip(center, hourAngle, hourLength)
  drawPixelLine(ctx, center, center, hour.x, hour.y, thickness)

  const minuteAngle = (minutes / 60) * 2 * Math.PI
  const minute = handTip(center, minuteAngle, minuteLength)
  drawPixelLine(ctx, center, center, minute.x, minute.y, thickness)

  const pinOffset = Math.floor(pinSize / 2)
  ctx.fillStyle = pinColor
  ctx.fillRect(center - pinOffset, center - pinOffset, pinSize, pinSize)
}
