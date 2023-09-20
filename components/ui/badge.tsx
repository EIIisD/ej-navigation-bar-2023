import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"

const badgeVariants = cva("inline-flex h-5 items-center gap-1.5 rounded-full border border-gray-200 px-2 text-xs/5 font-normal", {
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
  icon?: IconName
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, children, icon, ...props }, ref) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} ref={ref} {...props}>
      {icon && <Icon name={icon} className="h-3.5 w-3.5" />}
      {children}
    </div>
  )
})

Badge.displayName = "Badge"

export { Badge, badgeVariants }
