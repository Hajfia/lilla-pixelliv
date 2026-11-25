import { useEffect, useState } from "react"

const MINUTE = 60_000

const msToNextMinute = () => MINUTE - (Date.now() % MINUTE)

export const useNow = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let timeoutId = window.setTimeout(tick, msToNextMinute())

    function tick() {
      setNow(new Date())
      timeoutId = window.setTimeout(tick, msToNextMinute())
    }

    return () => window.clearTimeout(timeoutId)
  }, [])

  return now
}
