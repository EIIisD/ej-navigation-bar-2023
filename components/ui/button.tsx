"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex gap-2 items-center justify-center rounded transition-colors whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-orange text-white hover:bg-orange/90",
        outline: "border border-orange bg-white text-orange hover:bg-orange/5",
        reversed:
          "bg-white text-orange hover:bg-white/80 shadow shadow-black/5",
        ghost: "hover:bg-gray-100 hover:text-primary",
        link: "text-orange hover:text-orange/60",
        linkReversed: "text-white hover:opacity-60 transition-opacity",
      },
      size: {
        text: "text-sm font-bold",
        sm: "h-8 rounded px-4 text-sm font-bold",
        default: "h-10 px-6 text-sm",
        lg: "h-12 rounded px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
