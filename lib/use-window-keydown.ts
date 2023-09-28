import { useEffect } from "react"

import { LOCAL_ENV } from "@/lib/env"

type Callback = (event: KeyboardEvent) => void

const useWindowKeyDown = (callback: Callback): void => {
  useEffect(() => {
    if (LOCAL_ENV) {
      const handleKeyDown = (event: KeyboardEvent) => callback(event)

      window.addEventListener("keydown", handleKeyDown)

      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [callback])
}

export default useWindowKeyDown
