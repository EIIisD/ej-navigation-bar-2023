import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"

const badgeVariants = cva(
  "inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-full border border-gray-200 px-2.5 text-[13px]/5 font-normal print:border-sm [&>svg]:ml-0.5 [&>svg]:scale-125",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-gray-50",
        secondary: "border-blue-950/[12%] bg-blue-950/[3%] text-primary",
        destructive: "border-transparent bg-red-500 text-gray-50",
        outline: "text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

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
