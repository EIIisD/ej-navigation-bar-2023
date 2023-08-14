import { useEffect } from "react"

type Callback = (event: KeyboardEvent) => void

const useWindowKeyDown = (callback: Callback): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => callback(event)

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [callback])
}

export default useWindowKeyDown
