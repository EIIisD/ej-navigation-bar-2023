"use client"

import React, { type Dispatch, type SetStateAction } from "react"

import { createBooking, type Booking, type Passenger } from "@/config/booking"

export interface PrintBookingContext {
  booking: Booking
  setBooking: Dispatch<SetStateAction<PrintBookingContext["booking"]>>
  selectedPassengers: Passenger[]
  setSelectedPassengers: Dispatch<SetStateAction<PrintBookingContext["selectedPassengers"]>>
}

export const printBookingContextDefs = {
  booking: createBooking(),
  setBooking: () => null,
  selectedPassengers: [],
  setSelectedPassengers: () => null,
}

export const PrintBookingContext = React.createContext<PrintBookingContext>({
  booking: printBookingContextDefs.booking,
  setBooking: printBookingContextDefs.setBooking,
  selectedPassengers: printBookingContextDefs.selectedPassengers,
  setSelectedPassengers: printBookingContextDefs.setSelectedPassengers,
})

export const usePrintBookingContext = () => React.useContext(PrintBookingContext)
