"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const textButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-opacity hover:opacity-60",
  {
    variants: {
      variant: {
        default: "font-normal",
        bold: "font-bold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof textButtonVariants> {
  asChild?: boolean
}

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(textButtonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
TextButton.displayName = "TextButton"

export { TextButton, textButtonVariants }
