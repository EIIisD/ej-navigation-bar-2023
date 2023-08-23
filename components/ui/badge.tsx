import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva("inline-flex h-5 items-center rounded-full border border-gray-200 px-2 pt-[1px] text-xs/5 font-semibold", {
  variants: {
    variant: {
      default: "border-transparent bg-primary text-gray-50",
      secondary: "border-transparent bg-gray-100 text-primary",
      destructive: "border-transparent bg-red-500 text-gray-50",
      outline: "text-gray-950",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div"

  return <Comp className={cn(badgeVariants({ variant }), className)} ref={ref} {...props} />
})

Badge.displayName = "Badge"

export { Badge, badgeVariants }
