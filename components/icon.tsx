import { type SVGProps } from "react"

import { type iconNames } from "@/config/icons.json"
import { cn } from "@/lib/utils"

type StringWithAutoComplete<T> = T | (string & Record<never, never>)
type IconNames = keyof typeof iconNames

export type IconName = StringWithAutoComplete<IconNames> | undefined

export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName
}) {
  if (name) {
    return (
      <svg className={cn("h-full w-full", className)} {...props}>
        <use href={`/icon.svg#${name}`} />
      </svg>
    )
  }
  return null
}
