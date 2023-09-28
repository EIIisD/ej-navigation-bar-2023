"use client"

import React from "react"

const toggleRootClass = (className: string): void => {
  if (typeof window !== "object") return
  const rootElement = document.documentElement
  if (rootElement.classList.contains(className)) rootElement.classList.remove(className)
  else rootElement.classList.add(className)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "d") {
    toggleRootClass("debug")
  }
}

export const DevelopmentEffects = () => {
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return null
}
