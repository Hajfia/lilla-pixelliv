import background from "./assets/images/background-640.png"
import "./assets/scss/Room.scss"
const Room = () => {
  return (
    <div className="room">
        <img src={background} alt="Ett rosa rum i pixelgrafik" className="room-bg" />
    </div>
  )
}

export default Room