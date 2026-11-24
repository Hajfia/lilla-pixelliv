import { useEffect, useState } from "react"

const getScale = (width: number, height: number) => {
  const pixelRatio = window.devicePixelRatio || 1
  const fit = Math.min(window.innerWidth / width, window.innerHeight / height)
  return Math.max(1, Math.floor(fit * pixelRatio) / pixelRatio)
}

export const useRoomScale = (width: number, height: number) => {
  const [scale, setScale] = useState(() => getScale(width, height))

  useEffect(() => {
    const handleResize = () => setScale(getScale(width, height))
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [width, height])

  return scale
}
