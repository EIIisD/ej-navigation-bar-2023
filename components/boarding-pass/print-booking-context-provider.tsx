"use client"

import React from "react"

import { PrintBookingContext, printBookingContextDefs } from "@/components/boarding-pass/print-booking-context"

export const PrintBookingContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [booking, setBooking] = React.useState<PrintBookingContext["booking"]>(printBookingContextDefs.booking)

  const [selectedPassengers, setSelectedPassengers] = React.useState<PrintBookingContext["selectedPassengers"]>(
    printBookingContextDefs.selectedPassengers
  )

  return (
    <PrintBookingContext.Provider
      value={{
        booking,
        setBooking,
        selectedPassengers,
        setSelectedPassengers,
      }}
      {...props}
    />
  )
}
