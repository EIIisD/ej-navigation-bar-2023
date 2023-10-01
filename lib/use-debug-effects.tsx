import React from "react"

import { LOCAL_ENV } from "@/lib/env"

export const useDebugEffects = (): void => {
  React.useEffect(() => {
    if (LOCAL_ENV) {
      const toggleRootClass = (className: string): void => {
        if (typeof window !== "object") return
        const rootElement = document.documentElement
        if (rootElement.classList.contains(className)) rootElement.classList.remove(className)
        else rootElement.classList.add(className)
      }

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "d" && !event.metaKey) {
          toggleRootClass("debug")
        }

        if (event.key === "D" && !event.metaKey) {
          toggleRootClass("pdf")
        }
      }

      window.addEventListener("keydown", handleKeyDown)

      return () => window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
}
