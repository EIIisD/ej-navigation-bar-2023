"use client"

import React from "react"

import { cn } from "@/lib/utils"

export const AnimatedArrowIcon = React.forwardRef<
  SVGSVGElement,
  {
    className?: string
    show?: boolean
    size?: "sm" | "base"
  }
>(({ className = null, show = false, size = "sm", ...props }, forwardedRef) => {
  return (
    <svg
      ref={forwardedRef}
      viewBox="0 0 10 10"
      data-show={show ? "false" : "true"}
      className={cn(
        "group absolute ml-[calc(var(--arrow-size)/2)] inline-block h-[--arrow-size] w-[--arrow-size] mt-[calc((var(--leading-offset)*-1)+(var(--arrow-size)/5))] overflow-hidden",
        "data-[show=false]:opacity-100 data-[show=true]:opacity-0",
        "transition-opacity ease-arrow",
        size === "sm" && "[--arrow-size:10px]",
        size === "base" && "[--arrow-size:12px]",
        className
      )}
      stroke="none"
      fill="none"
      {...props}
    >
      <g fillRule="evenodd">
        <path
          d="M1 5H7.5"
          className="transition-opacity ease-arrow group-data-[show=false]:opacity-100 group-data-[show=true]:opacity-0"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.75px"
        />
        <path
          d="M2 1.5L5.25 5L2 8.5"
          className="transition-transform ease-arrow group-data-[show=false]:translate-x-[3px] group-data-[show=true]:translate-x-0"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.75px"
        />
      </g>
    </svg>
  )
})

AnimatedArrowIcon.displayName = "AnimatedArrowIcon"
