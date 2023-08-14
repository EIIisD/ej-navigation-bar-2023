"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { useFormField } from "@/components/ui/form"
import { Icon } from "@/components/icon"

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>>(
  ({ className, ...props }, ref) => {
    const { formItemId } = useFormField()

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        id={formItemId}
        className={cn(
          "peer h-5 w-5 shrink-0 rounded border-none ring-1 ring-gray-300 hover:ring-gray-400 data-[state=checked]:bg-orange data-[state=checked]:text-white data-[state=checked]:ring-orange-darker group-hover:data-[state=unchecked]:text-gray-200",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
          <Icon name="checkmark" className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    )
  }
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
