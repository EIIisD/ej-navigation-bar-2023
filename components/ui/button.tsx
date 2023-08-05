"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  cn(
    // Base sizing/layout
    "relative isolate inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold",
    // Inner highlight shadow + outer drop shadow
    "after:shadow-[shadow:inset_0_1px_theme(colors.white/15%),theme(boxShadow.DEFAULT)]",
    // Invisible border for high-contrast mode compatibility
    "border border-transparent",
    // Optical border, implemented as background layer to avoid corner artifacts
    "before:absolute before:-inset-px before:-z-10 before:rounded-[inherit] before:bg-[--button-border]",
    // Button background, implemented as foreground layer to stack on top of pseudo-border layer
    "after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.DEFAULT)-1px)] after:bg-[--button-bg] [&.rounded-full]:after:rounded-[calc(theme(borderRadius.full)-1px)]",
    // White overlay on hover
    "after:hover:bg-[color-mix(in_srgb,var(--button-bg),var(--button-bg-hover,theme(colors.white))_10%)]"
  ),
  {
    variants: {
      mode: {
        default: "text-white [--button-bg:theme(colors.orange.DEFAULT)] [--button-border:theme(colors.orange.dark/90%)]",
        outline:
          "text-orange [--button-bg-hover:theme(colors.orange.DEFAULT)] [--button-bg:theme(colors.white)] [--button-border:theme(colors.orange.DEFAULT)]",
        ghost:
          "text-orange [--button-bg-hover:theme(colors.orange.DEFAULT)] [--button-bg:theme(colors.white)] [--button-border:none] after:shadow-none",
      },
      size: {
        sm: "text-sm/6 [--button-padding-x:theme(spacing.4)] [--button-padding-y:theme(spacing.1)]",
        default: "text-sm/6 [--button-padding-x:theme(spacing.6)] [--button-padding-y:theme(spacing.2)]",
        lg: "text-base/6 [--button-padding-x:theme(spacing.8)] [--button-padding-y:theme(spacing.3)]",
      },
      variant: {
        default: "rounded px-[calc(var(--button-padding-x)-1px)] py-[calc(var(--button-padding-y)-1px)]",
        icon: "aspect-square h-[max-content] rounded-full py-[calc(var(--button-padding-y)-1px)]",
      },
    },
    defaultVariants: {
      mode: "default",
      size: "default",
      variant: "default",
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

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, mode, size, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  return <Comp className={cn(buttonVariants({ mode, size, variant, className }))} ref={ref} {...props} />
})

Button.displayName = "Button"

export { Button, buttonVariants }
