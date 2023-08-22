"use client"

import React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const linkVariants = cva(
  cn("inline-flex cursor-pointer items-center gap-1.5 whitespace-nowrap text-orange hover:underline focus-visible:underline"),
  {
    variants: {},
    defaultVariants: {},
  }
)

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {
  asChild?: boolean
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"

  return <Comp className={cn(linkVariants({ className }))} ref={ref} {...props} />
})

Link.displayName = "Link"

export { Link, linkVariants }
