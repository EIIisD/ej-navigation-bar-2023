"use client"

import React, { type CSSProperties } from "react"

import { LOCAL_ENV } from "@/lib/env"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"

export const LadleSimulator: React.FC<
  React.PropsWithoutRef<{
    screen: React.ReactNode
    print?: React.ReactNode
    container?: boolean
  }>
> = ({ screen, print, container = true }) => {
  const [enabled, setEnabled] = React.useState(false)
  const [width, setWidth] = React.useState(1)

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "e" && !shiftKey && !metaKey) {
      setEnabled(!enabled)
    }

    if (key === "E" && !metaKey) {
      setWidth(1)
    }

    if (key === "w" && !metaKey) {
      setWidth((prevWidth) => {
        const newWidth = prevWidth > 0.05 ? prevWidth - 0.05 : 1
        return parseFloat(newWidth.toFixed(2))
      })
    }

    if (key === "W" && !metaKey) {
      setWidth((prevWidth) => {
        const newWidth = prevWidth < 0.95 ? prevWidth + 0.05 : 1
        return parseFloat(newWidth.toFixed(2))
      })
    }
  })

  if (LOCAL_ENV && enabled && !!print) {
    return (
      <div id="simulator" className="bg-[#2b2d31]" style={{ "--width-mod": width } as CSSProperties}>
        {container ? (
          <div className={cn("mx-auto my-[10mm] w-full max-w-[calc((790px+20mm)_*_var(--width-mod))] flex-auto overflow-y-scroll bg-white p-[10mm]")}>
            {print}
          </div>
        ) : (
          <div className="w-full max-w-[calc((790px-20mm)_*_var(--width-mod))]">{print}</div>
        )}
      </div>
    )
  } else {
    return (
      <div className="w-full max-w-[calc(var(--page-maxWidth)_*_var(--width-mod))]" style={{ "--width-mod": width } as CSSProperties}>
        {screen}
        <div className="fixed bottom-4 left-4 rounded-full bg-black px-3 py-1 font-mono text-sm text-white">{width}px</div>
      </div>
    )
  }
}

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
      <div id="simulator" className="bg-[#2b2d31]">
        {container ? (
          <div className={cn("mx-auto my-[10mm] w-full max-w-[calc(790px-20mm)] flex-auto overflow-y-scroll bg-white p-[10mm]")}>{print}</div>
        ) : (
          <div className="w-full max-w-[calc(790px-20mm)]">{print}</div>
        )}
      </div>
    )
  } else {
    return <div className="contents">{screen}</div>
  }
}
