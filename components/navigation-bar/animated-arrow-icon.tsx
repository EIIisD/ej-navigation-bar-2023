"use client"

import React from "react"

import { cn } from "@/lib/utils"

export interface AnimatedArrowIconProps {
  className?: string
  show?: boolean
  leading?: "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"
}

export const AnimatedArrowIcon = React.forwardRef<SVGSVGElement, AnimatedArrowIconProps>(
  ({ className = null, show = false, leading = "6", ...props }, forwardedRef) => {
    return (
      <svg
        ref={forwardedRef}
        viewBox="0 0 10 10"
        data-show={show ? "false" : "true"}
        className={cn(
          {
            "3": "[--lineHeight:theme('lineHeight[3]')]",
            "4": "[--lineHeight:theme('lineHeight[4]')]",
            "5": "[--lineHeight:theme('lineHeight[5]')]",
            "6": "[--lineHeight:theme('lineHeight[6]')]",
            "7": "[--lineHeight:theme('lineHeight[7]')]",
            "8": "[--lineHeight:theme('lineHeight[8]')]",
            "9": "[--lineHeight:theme('lineHeight[9]')]",
            "10": "[--lineHeight:theme('lineHeight[10]')]",
          }[leading],
          "[--arrow-lineHeight-offset:calc((var(--lineHeight)-1em)/2)]",
          "[--arrow-offset-start:calc(var(--arrow-lineHeight-offset)+var(--font-offset-start))]",
          "[--arrow-offset-end:calc(var(--arrow-lineHeight-offset)+var(--font-offset-end))]",
          "[--arrow-capHeight:calc(var(--lineHeight)-var(--arrow-offset-start)-var(--arrow-offset-end))]",
          "group/arrow absolute ml-[0.65ch] mt-[--arrow-offset-start] inline-block h-[--arrow-capHeight] w-[--arrow-capHeight] overflow-hidden fill-none stroke-none",
          "transition-opacity ease-arrow-in-out data-[show=false]:opacity-100 data-[show=true]:opacity-0",
          className
        )}
        {...props}
      >
        <g fillRule="evenodd">
          <path
            d="M1 5H7.5"
            className="transition-opacity ease-arrow-in-out group-data-[show=false]/arrow:opacity-100 group-data-[show=true]/arrow:opacity-0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75px"
            shapeRendering="geometricPrecision"
          />
          <path
            d="M2 1.5L5.25 5L2 8.5"
            className="transition-transform ease-arrow-in-out group-data-[show=false]/arrow:translate-x-[3px] group-data-[show=true]/arrow:translate-x-0"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.75px"
            shapeRendering="geometricPrecision"
          />
        </g>
      </svg>
    )
  }
)

AnimatedArrowIcon.displayName = "AnimatedArrowIcon"
