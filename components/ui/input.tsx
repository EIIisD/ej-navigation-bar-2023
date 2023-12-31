"use client"

import React from "react"

import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconElement?: IconName
  iconElementAfter?: IconName
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, iconElement, iconElementAfter, ...props }, ref) => {
  return (
    <div className="relative flex w-full items-center text-sm">
      <input
        className={cn(
          "flex h-11 w-full rounded border-none bg-transparent px-5 py-2 text-primary ring-1 ring-gray-300 [font:inherit] placeholder:text-tertiary focus-visible:ring-gray-400",
          !!iconElement && "pl-[calc(theme('spacing.3')+theme('spacing.5')+theme('spacing.2'))]",
          className
        )}
        ref={ref}
        {...props}
      />
      {iconElement && <Icon name={iconElement} className="pointer-events-none absolute left-3 w-5 text-orange" />}
      {iconElementAfter && <Icon name={iconElementAfter} className="absolute right-3 w-5 cursor-pointer text-orange" />}
    </div>
  )
})

Input.displayName = "Input"

export { Input }
