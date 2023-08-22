"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const placeholderVariants = cva(
  cn(
    "grid place-content-center rounded-2xl text-base font-bold",
    // "border-2 border-dashed border-blue-300 text-blue-400",
    "bg-gray-50 text-blue-500"
  ),
  {
    variants: {
      size: {
        "24": "[--placeholder-size:theme('height.24')]",
        "32": "[--placeholder-size:theme('height.32')]",
        "56": "[--placeholder-size:theme('height.56')]",
        "72": "[--placeholder-size:theme('height.72')]",
        "96": "[--placeholder-size:theme('height.96')]",
      },
      variant: {
        ratio: "w-full [aspect-ratio:var(--aspect-ratio)]",
        height: "h-[--placeholder-size] w-full",
        width: "w-[--placeholder-size]",
        size: "h-[--placeholder-size] w-[--placeholder-size]",
      },
    },
    defaultVariants: {
      size: "56",
      variant: "height",
    },
  }
)

export interface ButtonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof placeholderVariants> {}

const Placeholder = React.forwardRef<HTMLDivElement, ButtonProps>(({ className, size, variant, ...props }, ref) => {
  return <div className={cn(placeholderVariants({ size, variant }), className)} ref={ref} {...props} />
})

Placeholder.displayName = "Placeholder"

export { Placeholder, placeholderVariants as buttonVariants }
