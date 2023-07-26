"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { Icon, TIconName } from "@/components/icon"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  iconElement?: TIconName
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconElement, ...props }, ref) => {
    return (
      <div className="relative flex w-full items-center text-sm">
        {iconElement && (
          <Icon
            name={iconElement}
            className="absolute left-4 w-4 text-orange"
          />
        )}
        <input
          className={cn(
            "flex h-11 w-full rounded-md border border-gray-300 bg-white px-5 py-2 text-[length:inherit] text-primary placeholder:text-secondary focus-visible:border-gray-400 focus-visible:outline-none",
            !!iconElement &&
              "pl-[calc(theme('spacing.4')+theme('spacing.4')+theme('spacing.3'))]",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
