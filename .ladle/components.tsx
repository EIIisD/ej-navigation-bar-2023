import React from "react"
import { type GlobalProvider } from "@ladle/react"

import "@/styles/globals.css"

export const Provider: GlobalProvider = ({
  children,
  globalState,
  storyMeta,
}) => {
  return <div className="flex items-center justify-center">{children}</div>
}
