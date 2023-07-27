"use client"

import React from "react"
import Image from "next/image"

import { AnimatedArrowIcon } from "@/components/navigation-bar/animated-arrow-icon"

export const MarketingArea = () => {
  const [showArrow, setShowArrow] = React.useState(false)

  return (
    <div className="pr-[--page-inset]">
      <button
        type="button"
        onClick={() => console.log(`You clicked the Marketing Area`)}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
        onFocus={() => setShowArrow(true)}
        onBlur={() => setShowArrow(false)}
        className="group relative -m-2 space-y-6 rounded-lg p-2"
      >
        <div className="relative overflow-hidden rounded-lg shadow-md [aspect-ratio:16/9]">
          <Image
            src="/media/hero-3.jpg"
            width={2755 * 0.1}
            height={3415 * 0.1}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="relative max-w-max text-base font-bold text-primary">
            Deals of the Week
            <AnimatedArrowIcon show={showArrow} size="base" />
            <div className="absolute inset-0" />
          </h3>
          <div className="mt-1 text-sm text-secondary">
            Grab yourself a great deal and choose a perfect getaway.
          </div>
        </div>
      </button>
    </div>
  )
}
