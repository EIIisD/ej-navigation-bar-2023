"use client"

import React, { type Dispatch, type SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { useUrlSearchParams } from "use-url-search-params"

import { type Booking, type Passenger } from "@/config/booking"
import { languagesMap } from "@/config/languages"

export interface PrintBookingContext {
  booking: Booking
  setBooking: Dispatch<SetStateAction<PrintBookingContext["booking"]>>
  selectedPassengers: Passenger[]
  setSelectedPassengers: Dispatch<SetStateAction<PrintBookingContext["selectedPassengers"]>>
}

const genericBooking = {
  hasEasyJetPlus: false,
  bookingFareType: "FLEXI",
  bookingBundle: undefined,
  passengers: [
    {
      uid: "YVYdtEl",
      id: "7*3244 (P)",
      gender: "male" as const,
      title: "Sr.",
      firstName: "Pedro",
      lastName: "Chavarría Benítez",
      type: "Adult" as const,
      selectedSeat: "8F",
      selectedSeatType: "Standard" as const,
      infant: {
        uid: "J1A6myd",
        id: "7*8005 (P)",
        gender: "male" as const,
        title: "Sr.",
        firstName: "Daniel",
        lastName: "Chavarría Benítez",
        type: "Infant" as const,
        selectedSeat: "1A",
        selectedSeatType: "Standard" as const,
      },
    },
    {
      uid: "iHmFLdC",
      id: "8*7567 (P)",
      gender: "male" as const,
      title: "Sr.",
      firstName: "Rubén",
      lastName: "Verdugo Preciado",
      type: "Adult" as const,
      selectedSeat: "30E",
      selectedSeatType: "Standard" as const,
      infant: {
        uid: "Phxyzlx",
        id: "4*7349 (P)",
        gender: "female" as const,
        title: "Sra.",
        firstName: "Laura",
        lastName: "Verdugo Preciado",
        type: "Infant" as const,
        selectedSeat: "1A",
        selectedSeatType: "Standard" as const,
      },
    },
  ],
  outboundFlight: {
    departureDate: new Date("2023-08-18T08:30:20.605Z"),
    departureAirport: {
      name: "Newcastle",
      canonicalUrlToken: "newcastle",
      code: "NCL",
      country: "United Kingdom",
      countryCode: "GB",
      airportGroupCode: "",
      terminal: "1",
    },
    arrivalDate: new Date("2023-08-18T15:45:20.605Z"),
    arrivalAirport: {
      name: "Madrid",
      canonicalUrlToken: "madrid",
      code: "MAD",
      country: "Spain",
      countryCode: "ES",
      airportGroupCode: "",
      terminal: "4",
    },
    number: "EZY8799",
    passengers: [
      {
        uid: "YVYdtEl",
        id: "7*3244 (P)",
        gender: "male" as const,
        title: "Sr.",
        firstName: "Pedro",
        lastName: "Chavarría Benítez",
        type: "Adult" as const,
        selectedSeat: "8F",
        selectedSeatType: "Standard" as const,
        infant: {
          uid: "J1A6myd",
          id: "7*8005 (P)",
          gender: "male" as const,
          title: "Sr.",
          firstName: "Daniel",
          lastName: "Chavarría Benítez",
          type: "Infant" as const,
          selectedSeat: "1A",
          selectedSeatType: "Standard" as const,
        },
      },
      {
        uid: "iHmFLdC",
        id: "8*7567 (P)",
        gender: "male" as const,
        title: "Sr.",
        firstName: "Rubén",
        lastName: "Verdugo Preciado",
        type: "Adult" as const,
        selectedSeat: "30E",
        selectedSeatType: "Standard" as const,
        infant: {
          uid: "Phxyzlx",
          id: "4*7349 (P)",
          gender: "female" as const,
          title: "Sra.",
          firstName: "Laura",
          lastName: "Verdugo Preciado",
          type: "Infant" as const,
          selectedSeat: "1A",
          selectedSeatType: "Standard" as const,
        },
      },
    ],
    extras: {
      hasSmallCabinBag: true,
      hasLargeCabinBag: true,
      holdBags: [
        {
          name: "15kg Hold Bag",
          weight: 15,
          amount: 0,
        },
        {
          name: "23kg Hold Bag",
          weight: 23,
          amount: 1,
        },
        {
          name: "26kg Hold Bag",
          weight: 26,
          amount: 0,
        },
        {
          name: "29kg Hold Bag",
          weight: 29,
          amount: 0,
        },
        {
          name: "32kg Hold Bag",
          weight: 32,
          amount: 1,
        },
      ],
      sportsEquipment: [
        {
          name: "Bicycle",
          amount: 0,
        },
        {
          name: "Canoe",
          amount: 0,
        },
        {
          name: "Sporting firearm",
          amount: 0,
        },
        {
          name: "Golf bag",
          amount: 1,
        },
        {
          name: "Hang glider",
          amount: 0,
        },
        {
          name: "Skis and/or boots",
          amount: 0,
        },
        {
          name: "Snowboard",
          amount: 0,
        },
        {
          name: "Windsurfing board",
          amount: 0,
        },
      ],
      hasSpeedyBoarding: true,
      hasEasyJetPlusBagDrop: true,
      hasFastTrackSecurity: true,
      hasMealDeal: true,
    },
  },
  returnFlight: {
    departureDate: new Date("2023-08-20T19:30:20.605Z"),
    departureAirport: {
      name: "Madrid",
      canonicalUrlToken: "madrid",
      code: "MAD",
      country: "Spain",
      countryCode: "ES",
      airportGroupCode: "",
      terminal: "4",
    },
    arrivalDate: new Date("2023-08-21T04:30:20.605Z"),
    arrivalAirport: {
      name: "Newcastle",
      canonicalUrlToken: "newcastle",
      code: "NCL",
      country: "United Kingdom",
      countryCode: "GB",
      airportGroupCode: "",
      terminal: "1",
    },
    number: "EZY0052",
    passengers: [
      {
        uid: "YVYdtEl",
        id: "7*3244 (P)",
        gender: "male" as const,
        title: "Sr.",
        firstName: "Pedro",
        lastName: "Chavarría Benítez",
        type: "Adult" as const,
        selectedSeat: "8F",
        selectedSeatType: "Standard" as const,
        infant: {
          uid: "J1A6myd",
          id: "7*8005 (P)",
          gender: "male" as const,
          title: "Sr.",
          firstName: "Daniel",
          lastName: "Chavarría Benítez",
          type: "Infant" as const,
          selectedSeat: "1A",
          selectedSeatType: "Standard" as const,
        },
      },
      {
        uid: "iHmFLdC",
        id: "8*7567 (P)",
        gender: "male" as const,
        title: "Sr.",
        firstName: "Rubén",
        lastName: "Verdugo Preciado",
        type: "Adult" as const,
        selectedSeat: "30E",
        selectedSeatType: "Standard" as const,
        infant: {
          uid: "Phxyzlx",
          id: "4*7349 (P)",
          gender: "female" as const,
          title: "Sra.",
          firstName: "Laura",
          lastName: "Verdugo Preciado",
          type: "Infant" as const,
          selectedSeat: "1A",
          selectedSeatType: "Standard" as const,
        },
      },
    ],
    extras: {
      hasSmallCabinBag: true,
      hasLargeCabinBag: true,
      holdBags: [
        {
          name: "15kg Hold Bag",
          weight: 15,
          amount: 0,
        },
        {
          name: "23kg Hold Bag",
          weight: 23,
          amount: 1,
        },
        {
          name: "26kg Hold Bag",
          weight: 26,
          amount: 0,
        },
        {
          name: "29kg Hold Bag",
          weight: 29,
          amount: 0,
        },
        {
          name: "32kg Hold Bag",
          weight: 32,
          amount: 1,
        },
      ],
      sportsEquipment: [
        {
          name: "Bicycle",
          amount: 0,
        },
        {
          name: "Canoe",
          amount: 0,
        },
        {
          name: "Sporting firearm",
          amount: 0,
        },
        {
          name: "Golf bag",
          amount: 1,
        },
        {
          name: "Hang glider",
          amount: 0,
        },
        {
          name: "Skis and/or boots",
          amount: 0,
        },
        {
          name: "Snowboard",
          amount: 0,
        },
        {
          name: "Windsurfing board",
          amount: 0,
        },
      ],
      hasSpeedyBoarding: true,
      hasEasyJetPlusBagDrop: true,
      hasFastTrackSecurity: true,
      hasMealDeal: true,
    },
  },
  language: languagesMap.es_ES,
  advertisements: ["1", "2", "3"],
}

export const printBookingContextDefs = {
  booking: genericBooking,
  setBooking: () => null,
  selectedPassengers: genericBooking.passengers,
  setSelectedPassengers: () => null,
}

export const PrintBookingContext = React.createContext<PrintBookingContext>({
  booking: printBookingContextDefs.booking,
  setBooking: printBookingContextDefs.setBooking,
  selectedPassengers: printBookingContextDefs.selectedPassengers,
  setSelectedPassengers: printBookingContextDefs.setSelectedPassengers,
})

export const usePrintBookingContext = () => React.useContext(PrintBookingContext)

export const PrintBookingContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const router = useRouter()
  const { 1: setParams } = useUrlSearchParams()
  const [booking, setBooking] = React.useState<PrintBookingContext["booking"]>(printBookingContextDefs.booking)

  const [selectedPassengers, setSelectedPassengers] = React.useState<PrintBookingContext["selectedPassengers"]>(
    printBookingContextDefs.selectedPassengers
  )

  React.useEffect(() => {
    const bookingLanguage = booking.language
    setParams({ language: bookingLanguage.locale })
    router.replace(window.location.href)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [booking])

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
