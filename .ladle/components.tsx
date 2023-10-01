import React from "react"
import { type GlobalProvider } from "@ladle/react"

import { useDebugEffects } from "../lib/use-debug-effects"
import { cn } from "../lib/utils"

import "@/app/globals.css"

export const Provider: GlobalProvider = ({ children, globalState, storyMeta }) => {
  useDebugEffects()

  return (
    <div
      className={cn(
        storyMeta?.plain ? "relative p-8" : "relative flex min-h-full w-full items-center justify-center py-4 outline outline-4 outline-black"
      )}
    >
      {storyMeta?.withBg && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-full w-full bg-white" />
          <div className="h-full w-4 bg-gray-200" />
          <div className="h-full w-full bg-orange" />
        </div>
      )}
      {storyMeta?.withShade && <div className="absolute inset-0 bg-gray-100" />}
      {storyMeta?.pageWidth ? (
        <div className="isolate mx-auto w-full max-w-[--page-maxWidth]">{children}</div>
      ) : storyMeta?.fullWidth ? (
        <div className="isolate mx-auto w-full">{children}</div>
      ) : storyMeta?.plain ? (
        <div className="flex-auto flex-col items-center justify-start">{children}</div>
      ) : (
        <div className="isolate flex flex-col items-center justify-center gap-12 py-12 [&>section]:flex [&>section]:flex-col [&>section]:items-center [&>section]:justify-center [&>section]:gap-3">
          {children}
        </div>
      )}
    </div>
  )
}
