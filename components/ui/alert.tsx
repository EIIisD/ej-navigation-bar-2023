import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  // "relative w-full rounded-lg border border-gray-200 p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 [&>svg~*]:pl-7",
  "relative w-full max-w-prose rounded-md p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-current [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        card: "max-w-none rounded-[6px] bg-white text-primary shadow outline outline-1 outline-black/5 [&>svg]:text-orange",
        default: "border border-blue-200 bg-blue-50 text-primary [&>svg]:text-blue-600",
        warning: "border border-orange-200 bg-orange-50 text-primary [&>svg]:text-orange-600",
        destructive: "border border-red-500/50 text-red-500 [&>svg]:text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>>(
  ({ className, variant, ...props }, ref) => <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props} />
)

Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h5 ref={ref} className={cn("mb-2 text-sm font-bold leading-4", className)} {...props} />
))

AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-xs leading-relaxed", className)} {...props} />
))

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
