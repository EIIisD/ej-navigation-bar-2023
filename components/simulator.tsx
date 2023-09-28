"use client"

import React from "react"

import { LOCAL_ENV } from "@/lib/env"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"

export const Simulator: React.FC<
  React.PropsWithoutRef<{
    screen: React.ReactNode
    print?: React.ReactNode
    container?: boolean
  }>
> = ({ screen, print, container = true }) => {
  const [enabled, setEnabled] = React.useState(false)

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "e" && !shiftKey && !metaKey) {
      setEnabled(!enabled)
    }
  })

  if (LOCAL_ENV && enabled && !!print) {
    return (
      <div id="simulator" className="threshold bg-[#2b2d31]">
        {container ? (
          <div className={cn("mx-auto my-[10mm] h-[max-content] w-full max-w-[calc(790px-20mm)] flex-auto overflow-y-scroll bg-white")}>{print}</div>
        ) : (
          <div className="w-full max-w-[calc(790px-20mm)]">{print}</div>
        )}
      </div>
    )
  } else {
    return <div className="contents">{screen}</div>
  }
}
