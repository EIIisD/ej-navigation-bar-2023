"use client"

import React, { type Dispatch, type SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { useUrlSearchParams } from "use-url-search-params"

import { type Booking, type Flight, type Passenger } from "@/config/booking"

const booking = {
  hasEasyJetPlus: false as const,
  bookingLabel: "FLEXI" as const,
  bookingFareType: "Standard" as const,
  bookingBundle: "Standard" as const,
  passengers: [
    {
      uid: "idaSUkx" as const,
      id: "2***1615 (P)" as const,
      gender: "female" as const,
      title: "Prof." as const,
      firstName: "Emese" as const,
      lastName: "Király" as const,
      type: "Adult" as const,
      selectedSeat: "1A" as const,
      selectedSeatType: "Standard" as const,
      hasSmallCabinBag: true as const,
      hasLargeCabinBag: false as const,
    },
  ],
  flights: [
    {
      uid: "yfiCvbg" as const,
      departureDate: new Date("2023-10-06T05:11:39.398Z"),
      departureAirport: {
        name: "Marseille Provence" as const,
        canonicalUrlToken: "marseille-provence" as const,
        code: "MRS" as const,
        country: "France" as const,
        countryCode: "FR" as const,
        airportGroupCode: "" as const,
        terminal: "MP2" as const,
      },
      arrivalDate: new Date("2023-10-06T08:56:39.398Z"),
      arrivalAirport: {
        name: "Malaga" as const,
        canonicalUrlToken: "malaga" as const,
        code: "AGP" as const,
        country: "Spain" as const,
        countryCode: "ES" as const,
        airportGroupCode: "" as const,
        terminal: "3" as const,
      },
      number: "EZY0048" as const,
      reservationNumber: "S0LL6RK" as const,
      checkInSequenceNumber: "S600" as const,
      customerEntitlementsCode: "S1" as const,
      passengers: [
        {
          uid: "idaSUkx" as const,
          id: "2***1615 (P)" as const,
          gender: "female" as const,
          title: "Prof." as const,
          firstName: "Emese" as const,
          lastName: "Király" as const,
          type: "Adult" as const,
          selectedSeat: "30D" as const,
          selectedSeatType: "Standard" as const,
          hasSmallCabinBag: true as const,
          hasLargeCabinBag: false as const,
        },
      ],
      extras: {
        hasSmallCabinBag: true as const,
        hasLargeCabinBag: false as const,
        holdBags: [
          { name: "Hold Bag" as const, weight: 15, amount: 0 },
          { name: "Hold Bag" as const, weight: 23, amount: 1 },
          { name: "Hold Bag" as const, weight: 26, amount: 0 },
          { name: "Hold Bag" as const, weight: 29, amount: 0 },
          { name: "Hold Bag" as const, weight: 32, amount: 0 },
        ],
        sportsEquipment: [
          { name: "Bicycle" as const, amount: 0 },
          { name: "Canoe" as const, amount: 0 },
          { name: "Sporting firearm" as const, amount: 0 },
          { name: "Golf bag" as const, amount: 1 },
          { name: "Hang glider" as const, amount: 0 },
          { name: "Skis and/or boots" as const, amount: 0 },
          { name: "Snowboard" as const, amount: 0 },
          { name: "Windsurfing board" as const, amount: 0 },
        ],
        hasSpeedyBoarding: false as const,
        hasEasyJetPlusBagDrop: false as const,
        hasFastTrackSecurity: false as const,
        hasMealDeal: false as const,
      },
    },
    {
      uid: "HBKkX86" as const,
      departureDate: new Date("2023-10-07T08:56:39.398Z"),
      departureAirport: {
        name: "Agadir" as const,
        canonicalUrlToken: "agadir" as const,
        code: "AGA" as const,
        country: "Morocco" as const,
        countryCode: "MA" as const,
        airportGroupCode: "" as const,
        terminal: null,
      },
      arrivalDate: new Date("2023-10-07T13:41:39.398Z"),
      arrivalAirport: {
        name: "Luxembourg" as const,
        canonicalUrlToken: "luxembourg" as const,
        code: "LUX" as const,
        country: "Luxembourg" as const,
        countryCode: "LU" as const,
        airportGroupCode: "" as const,
        terminal: "A" as const,
      },
      number: "EZY0626" as const,
      reservationNumber: "X0N1666" as const,
      checkInSequenceNumber: "S400" as const,
      customerEntitlementsCode: "SA" as const,
      passengers: [
        {
          uid: "idaSUkx" as const,
          id: "2***1615 (P)" as const,
          gender: "female" as const,
          title: "Prof." as const,
          firstName: "Emese" as const,
          lastName: "Király" as const,
          type: "Adult" as const,
          selectedSeat: "30C" as const,
          selectedSeatType: "Standard" as const,
          hasSmallCabinBag: true as const,
          hasLargeCabinBag: false as const,
        },
      ],
      extras: {
        hasSmallCabinBag: true as const,
        hasLargeCabinBag: false as const,
        holdBags: [
          { name: "Hold Bag" as const, weight: 15, amount: 0 },
          { name: "Hold Bag" as const, weight: 23, amount: 1 },
          { name: "Hold Bag" as const, weight: 26, amount: 0 },
          { name: "Hold Bag" as const, weight: 29, amount: 0 },
          { name: "Hold Bag" as const, weight: 32, amount: 0 },
        ],
        sportsEquipment: [
          { name: "Bicycle" as const, amount: 0 },
          { name: "Canoe" as const, amount: 0 },
          { name: "Sporting firearm" as const, amount: 0 },
          { name: "Golf bag" as const, amount: 1 },
          { name: "Hang glider" as const, amount: 0 },
          { name: "Skis and/or boots" as const, amount: 0 },
          { name: "Snowboard" as const, amount: 0 },
          { name: "Windsurfing board" as const, amount: 0 },
        ],
        hasSpeedyBoarding: false as const,
        hasEasyJetPlusBagDrop: false as const,
        hasFastTrackSecurity: false as const,
        hasMealDeal: false as const,
      },
    },
  ],
  language: { value: "Magyarul" as const, locale: "hu_HU" as const, flag: "hungary" as const },
}

export interface PrintBookingContext {
  booking: Booking
  setBooking: Dispatch<SetStateAction<PrintBookingContext["booking"]>>
  selectedPassengers: Passenger[]
  setSelectedPassengers: Dispatch<SetStateAction<PrintBookingContext["selectedPassengers"]>>
  selectedFlights: Flight[]
  setSelectedFlights: Dispatch<SetStateAction<PrintBookingContext["selectedFlights"]>>
}

export const printBookingContextDefs = {
  booking: booking,
  setBooking: () => null,
  selectedPassengers: [],
  setSelectedPassengers: () => null,
  selectedFlights: [],
  setSelectedFlights: () => null,
}

export const PrintBookingContext = React.createContext<PrintBookingContext>({
  booking: printBookingContextDefs.booking,
  setBooking: printBookingContextDefs.setBooking,
  selectedPassengers: printBookingContextDefs.selectedPassengers,
  setSelectedPassengers: printBookingContextDefs.setSelectedPassengers,
  selectedFlights: printBookingContextDefs.selectedFlights,
  setSelectedFlights: printBookingContextDefs.setSelectedFlights,
})

export const usePrintBookingContext = () => React.useContext(PrintBookingContext)

export const PrintBookingContextProvider: React.FC<React.PropsWithChildren<{ predefinedBooking?: Booking }>> = ({ predefinedBooking, ...props }) => {
  const router = useRouter()
  const { 1: setParams } = useUrlSearchParams()
  const [booking, setBooking] = React.useState<PrintBookingContext["booking"]>(predefinedBooking ?? printBookingContextDefs.booking)

  const [selectedPassengers, setSelectedPassengers] = React.useState<PrintBookingContext["selectedPassengers"]>(
    predefinedBooking?.passengers ?? printBookingContextDefs.selectedPassengers
  )

  const [selectedFlights, setSelectedFlights] = React.useState<PrintBookingContext["selectedFlights"]>(
    predefinedBooking?.flights ?? printBookingContextDefs.selectedFlights
  )

  React.useEffect(() => {
    const bookingLanguage = predefinedBooking?.language ?? booking.language
    setParams({ language: bookingLanguage.locale })
    router.replace(window.location.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking, predefinedBooking])

  return (
    <PrintBookingContext.Provider
      value={{
        booking,
        setBooking,
        selectedPassengers,
        setSelectedPassengers,
        selectedFlights,
        setSelectedFlights,
      }}
      {...props}
    />
  )
}
