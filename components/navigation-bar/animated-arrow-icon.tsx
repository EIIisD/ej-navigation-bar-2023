"use client"

import React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

export const AnimatedArrowIcon = React.forwardRef<HTMLSpanElement, any>(
  ({ className = null, show = false, ...props }, forwardedRef) => {
    return (
      <span
        ref={forwardedRef}
        className={cn(
          "absolute ml-[.375ch] inline-flex h-[1em] w-[1em] translate-y-[0.125ex] scale-90 items-center justify-center overflow-hidden",
          className
        )}
        {...props}
      >
        <motion.div
          variants={{
            in: {
              opacity: 1,
              x: 0,
            },
            out: {
              opacity: 0,
              x: "-1em",
            },
          }}
          initial={false}
          animate={show ? "in" : "out"}
          className="h-[1em] w-[1em]"
        >
          <Icon
            name="lucideArrowRight"
            className="h-[1em] w-[1em] stroke-[3]"
          />
        </motion.div>
      </span>
    )
  }
)

AnimatedArrowIcon.displayName = "AnimatedArrowIcon"
