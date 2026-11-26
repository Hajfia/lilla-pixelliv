import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type SyntheticEvent } from "react"
import "../assets/scss/ZoomModal.scss"

type ZoomModalProps = {
  open: boolean
  origin: DOMRect | null
  label: string
  onClose: () => void
  children: ReactNode
}

const DURATION = 350
const EASING = "cubic-bezier(0.2, 0.8, 0.2, 1)"

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

const transformFrom = (origin: DOMRect, target: DOMRect) => {
  const x = origin.left - target.left
  const y = origin.top - target.top
  const scaleX = origin.width / target.width
  const scaleY = origin.height / target.height
  return `translate(${x}px, ${y}px) scale(${scaleX}, ${scaleY})`
}

const ZoomModal = ({ open, origin, label, onClose, children }: ZoomModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    const content = contentRef.current
    if (!dialog || !content) return

    if (!open) {
      if (dialog.open) dialog.close()
      return
    }

    if (!dialog.open) dialog.showModal()

    const target = content.getBoundingClientRect()
    if (!origin || target.width === 0 || prefersReducedMotion()) return

    const animation = content.animate(
      [{ transform: transformFrom(origin, target) }, { transform: "none" }],
      { duration: DURATION, easing: EASING },
    )
    return () => animation.cancel()
  }, [open, origin])

  const requestClose = () => {
    const dialog = dialogRef.current
    const content = contentRef.current
    if (!dialog || !content || closing) return

    content.getAnimations().forEach((animation) => animation.cancel())
    const target = content.getBoundingClientRect()

    if (!origin || target.width === 0 || prefersReducedMotion()) {
      dialog.close()
      return
    }

    setClosing(true)
    const animation = content.animate(
      [{ transform: "none" }, { transform: transformFrom(origin, target) }],
      { duration: DURATION, easing: EASING, fill: "forwards" },
    )
    animation.onfinish = () => {
      dialog.close()
      animation.cancel()
    }
  }

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault()
    requestClose()
  }

  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) requestClose()
  }

  const handleClose = () => {
    setClosing(false)
    onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={closing ? "zoom-modal zoom-modal--closing" : "zoom-modal"}
      aria-label={label}
      onCancel={handleCancel}
      onClose={handleClose}
      onClick={handleClick}
    >
      <div ref={contentRef} className="zoom-modal__content">
        {open && children}
      </div>
    </dialog>
  )
}

export default ZoomModal
