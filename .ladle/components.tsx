import React from "react"
import { type GlobalProvider } from "@ladle/react"

import "@/styles/globals.css"

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {children}
    </div>
  )
}
