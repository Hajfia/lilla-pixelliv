import type { CSSProperties } from "react"
import "../assets/scss/CrossFadeObject.scss"

type CrossFadeObjectProps = {
  src: string
  fadeSrc: string
  faded: boolean
  alt: string
  x: number
  y: number
  width: number
}

const CrossFadeObject = ({ src, fadeSrc, faded, alt, x, y, width }: CrossFadeObjectProps) => {
  const style = { "--x": x, "--y": y, "--width": width } as CSSProperties

  return (
    <div className="room-object cross-fade" style={style} role="img" aria-label={alt}>
      <img src={src} alt="" />
      <img
        src={fadeSrc}
        alt=""
        className={faded ? "cross-fade__top cross-fade__top--visible" : "cross-fade__top"}
      />
    </div>
  )
}

export default CrossFadeObject
