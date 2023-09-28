import { useEffect } from "react"

import { VERCEL_ENV } from "@/lib/env"

type Callback = (event: KeyboardEvent) => void

const useWindowKeyDown = (callback: Callback): void => {
  useEffect(() => {
    if (VERCEL_ENV === "production") return

    const handleKeyDown = (event: KeyboardEvent) => callback(event)

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [callback])
}

export default useWindowKeyDown
