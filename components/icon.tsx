import { type SVGProps } from "react"

import { type iconNames } from "@/config/icons.json"
import { cn } from "@/lib/utils"

export type TIconName = keyof typeof iconNames

export function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: TIconName
}) {
  return (
    <svg className={cn("h-full w-full", className)} {...props}>
      <use href={`/icon.svg#${name}`} />
    </svg>
  )
}
