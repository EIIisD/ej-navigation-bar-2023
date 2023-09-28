"use client"

import React from "react"

import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"
import ThresholdFilter from "@/components/threshold-filter"

export const Simulator: React.FC<
  React.PropsWithoutRef<{
    screen: React.ReactNode
    print?: React.ReactNode
    container?: boolean
  }>
> = ({ screen, print, container = true }) => {
  const [enabled, setEnabled] = React.useState(true)

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "e" && !shiftKey && !metaKey) {
      setEnabled(!enabled)
    }
  })

  if (enabled && !!print) {
    return (
      <body
        className="threshold bg-[#2b2d31]"
        // style={{ filter: "saturate(0) url(#threshold)" }}
        // style={{
        //   filter: "contrast(120%) saturate(0)",
        // }}
      >
        {container ? (
          <div className={cn("mx-auto my-[10mm] h-[max-content] w-full max-w-[calc(790px-20mm)] flex-auto overflow-y-scroll bg-white")}>{print}</div>
        ) : (
          <div className="w-full max-w-[calc(790px-20mm)]">{print}</div>
        )}
        {/* <ThresholdFilter id="threshold" strength={1} blur={0} /> */}
      </body>
    )
  } else {
    return <body>{screen}</body>
  }
}
