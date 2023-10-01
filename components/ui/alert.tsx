import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  // "relative w-full rounded-lg border border-gray-200 p-4 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-gray-950 [&>svg~*]:pl-7",
  "relative w-full rounded-md p-6 [&>svg]:absolute [&>svg]:left-6 [&>svg]:top-6 [&>svg]:scale-[150%] [&>svg]:text-current [&>svg~*]:pl-8",
  {
    variants: {
      variant: {
        card: "max-w-none rounded-md bg-white text-primary shadow-lg [&>svg]:text-blue-500",
        default: "border border-blue-200 bg-blue-50 text-primary print:border-sm print:border-b-md [&>svg]:text-blue-500",
        warning: "border border-orange-200 bg-orange-50 text-primary print:border-sm print:border-b-md [&>svg]:text-orange-500",
        destructive: "border border-red-500/50 text-red-500 print:border-sm print:border-b-md [&>svg]:text-red-500",
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
  <div ref={ref} className={cn("max-w-prose text-sm leading-relaxed", className)} {...props} />
))

AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
