"use client"

import React from "react"

import { airports } from "@/config/airports"
import { createBooking, type Booking } from "@/config/booking"
import { Button } from "@/components/ui/button"

function formatBooking() {
  const booking = createBooking()

  function formatValue(value: any): string {
    if (value === undefined || value === null) {
      return `${value}`
    } else if (value instanceof Date) {
      return `new Date("${value.toISOString()}")`
    } else if (typeof value === "string") {
      return `"${value}" as const`
    } else if (typeof value === "boolean") {
      return `${value} as const`
    } else if (Array.isArray(value)) {
      return `[${value.map(formatValue).join(", ")}]`
    } else if (typeof value === "object") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return `{ ${Object.entries(value)
        .map(([key, val]) => `${key}: ${formatValue(val)}`)
        .join(", ")} }`
    } else {
      return `${value}`
    }
  }

  const result = `const booking = ${formatValue(booking)};`

  return result
}

export const Admin: React.FC<{ className?: string }> = ({ className }) => {
  const [formattedBooking, setFormattedBooking] = React.useState("")

  const handleClick = () => {
    setFormattedBooking(formatBooking())
  }

  return (
    <>
      <Button onClick={handleClick} className={className}>
        Generate Booking
      </Button>
      <pre className="h-full max-w-[50vw] overflow-scroll bg-gray-200 font-mono text-xs">{formattedBooking}</pre>
    </>
  )
}
