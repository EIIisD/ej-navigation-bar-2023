"use client"

import React from "react"

const toggleRootProperty = (propName: string, value: string): void => {
  if (typeof window !== "object") return
  const rootStyle = document.documentElement.style
  if (rootStyle.getPropertyValue(propName)) rootStyle.removeProperty(propName)
  else rootStyle.setProperty(propName, value)
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "d") {
    toggleRootProperty("--dev-1", "lch(95 20 .2turn)")
    toggleRootProperty("--dev-2", "lch(95 20 .6turn)")
  }
}

export const DevelopmentEffects = () => {
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return null
}
