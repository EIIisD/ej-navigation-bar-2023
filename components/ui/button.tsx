"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded font-bold shadow-[inset_0_1.5px_0_theme('colors.white/0.1')]",
    // Adds a dynamic contrast ring around the button
    "before:absolute before:inset-0 before:rounded-[inherit] before:mix-blend-multiply before:shadow-sm before:ring-1 before:ring-[var(--contrast-outline-color,transparent)]",
    // Adds a background overlay to the button contents on hover
    "after:hover:absolute after:hover:inset-0 after:hover:rounded-[inherit] after:hover:bg-[var(--hover-bg-overlay,transparent)]"
  ),
  {
    variants: {
      variant: {
        default:
          "bg-orange text-white [--contrast-outline-color:theme('colors.orange.darker/0.9')] [--hover-bg-overlay:theme('colors.white/0.1')]",
        outline:
          "bg-white text-orange [--contrast-outline-color:theme('colors.orange.DEFAULT')] [--hover-bg-overlay:theme('colors.orange.DEFAULT/0.05')]",
        ghost:
          "bg-white text-orange shadow-none [--hover-bg-overlay:theme('colors.orange.DEFAULT/0.05')] [--contrast-outline-color:theme('colors.white')] before:mix-blend-normal before:shadow-none",
      },
      size: {
        sm: "h-8 px-4 text-sm",
        default: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// const buttonVariants = cva(
//   "inline-flex gap-2 items-center justify-center transition-colors whitespace-nowrap disabled:pointer-events-none disabled:opacity-50",
//   {
//     variants: {
//       variant: {
//         default: "bg-orange text-white hover:bg-orange/90",
//         outline: "border border-orange bg-white text-orange hover:bg-orange/5",
//         reversed:
//           "bg-white text-orange hover:bg-white/80 shadow shadow-black/5",
//         ghost: "hover:bg-gray-100 hover:text-primary",
//         link: "text-orange hover:text-orange/60",
//         linkReversed: "text-white hover:opacity-60 transition-opacity",
//       },
//       size: {
//         text: "text-sm font-bold",
//         sm: "h-8 rounded px-4 text-sm font-bold",
//         default: "h-10 px-6 text-sm rounded",
//         lg: "h-12 rounded px-8 text-base",
//         icon: "h-10 w-10 rounded-full",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//       size: "default",
//     },
//   }
// )

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
