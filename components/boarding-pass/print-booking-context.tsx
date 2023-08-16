"use client"

import React, { type Dispatch, type SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { useUrlSearchParams } from "use-url-search-params"

import { type Booking, type Passenger } from "@/config/booking"

export interface PrintBookingContext {
  booking: Booking
  setBooking: Dispatch<SetStateAction<PrintBookingContext["booking"]>>
  selectedPassengers: Passenger[]
  setSelectedPassengers: Dispatch<SetStateAction<PrintBookingContext["selectedPassengers"]>>
}

const genericBooking = {
  hasEasyJetPlus: false,
  bookingFareType: "FLEXI" as const,
  bookingBundle: undefined,
  passengers: [
    {
      uid: "8xdrbY2" as const,
      id: "0*4596 (P)" as const,
      gender: "male" as const,
      title: "Herr" as const,
      firstName: "Justin" as const,
      lastName: "Bürklein" as const,
      type: "Adult" as const,
      selectedSeat: "1A" as const,
      selectedSeatType: "Standard" as const,
      infant: {
        uid: "31pDwJD" as const,
        id: "7*3468 (P)" as const,
        gender: "male" as const,
        title: "Prof. Dr." as const,
        firstName: "Benno" as const,
        lastName: "Bürklein" as const,
        type: "Infant" as const,
        selectedSeat: "1A" as const,
        selectedSeatType: "Standard" as const,
      },
    },
    {
      uid: "IuMSMb7" as const,
      id: "6*0786 (P)" as const,
      gender: "male" as const,
      title: "Prof. Dr." as const,
      firstName: "Adriano" as const,
      lastName: "Meissner" as const,
      type: "Adult" as const,
      selectedSeat: "1A" as const,
      selectedSeatType: "Standard" as const,
      infant: {
        uid: "axAFZc4" as const,
        id: "9*1535 (P)" as const,
        gender: "male" as const,
        title: "Herr" as const,
        firstName: "Mateo" as const,
        lastName: "Meissner" as const,
        type: "Infant" as const,
        selectedSeat: "1A" as const,
        selectedSeatType: "Standard" as const,
      },
    },
  ],
  flights: [
    {
      uid: "k55J9S9" as const,
      departureDate: new Date("2023-08-20T23:47:37.501Z"),
      departureAirport: {
        name: "Skopje" as const,
        canonicalUrlToken: "skopje-international-airport" as const,
        code: "SKP" as const,
        country: "North Macedonia" as const,
        countryCode: "MK" as const,
        airportGroupCode: "" as const,
        terminal: "A" as const,
      },
      arrivalDate: new Date("2023-08-21T07:32:37.501Z"),
      arrivalAirport: {
        name: "Belgrade" as const,
        canonicalUrlToken: "belgrade" as const,
        code: "BEG" as const,
        country: "Serbia" as const,
        countryCode: "RS" as const,
        airportGroupCode: "" as const,
        terminal: "1" as const,
      },
      number: "EZY8128" as const,
      passengers: [
        {
          uid: "8xdrbY2" as const,
          id: "0*4596 (P)" as const,
          gender: "male" as const,
          title: "Herr" as const,
          firstName: "Justin" as const,
          lastName: "Bürklein" as const,
          type: "Adult" as const,
          selectedSeat: "17F" as const,
          selectedSeatType: "Standard" as const,
          infant: {
            uid: "31pDwJD" as const,
            id: "7*3468 (P)" as const,
            gender: "male" as const,
            title: "Prof. Dr." as const,
            firstName: "Benno" as const,
            lastName: "Bürklein" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
        {
          uid: "IuMSMb7" as const,
          id: "6*0786 (P)" as const,
          gender: "male" as const,
          title: "Prof. Dr." as const,
          firstName: "Adriano" as const,
          lastName: "Meissner" as const,
          type: "Adult" as const,
          selectedSeat: "24E" as const,
          selectedSeatType: "Standard" as const,
          infant: {
            uid: "axAFZc4" as const,
            id: "9*1535 (P)" as const,
            gender: "male" as const,
            title: "Herr" as const,
            firstName: "Mateo" as const,
            lastName: "Meissner" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
      ],
      extras: {
        hasSmallCabinBag: true,
        hasLargeCabinBag: true,
        holdBags: [
          {
            name: "15kg Hold Bag" as const,
            weight: 15,
            amount: 0,
          },
          {
            name: "23kg Hold Bag" as const,
            weight: 23,
            amount: 1,
          },
          {
            name: "26kg Hold Bag" as const,
            weight: 26,
            amount: 0,
          },
          {
            name: "29kg Hold Bag" as const,
            weight: 29,
            amount: 0,
          },
          {
            name: "32kg Hold Bag" as const,
            weight: 32,
            amount: 0,
          },
        ],
        sportsEquipment: [
          {
            name: "Bicycle" as const,
            amount: 0,
          },
          {
            name: "Canoe" as const,
            amount: 0,
          },
          {
            name: "Sporting firearm" as const,
            amount: 0,
          },
          {
            name: "Golf bag" as const,
            amount: 0,
          },
          {
            name: "Hang glider" as const,
            amount: 0,
          },
          {
            name: "Skis and/or boots" as const,
            amount: 0,
          },
          {
            name: "Snowboard" as const,
            amount: 0,
          },
          {
            name: "Windsurfing board" as const,
            amount: 0,
          },
        ],
        hasSpeedyBoarding: true,
        hasEasyJetPlusBagDrop: true,
        hasFastTrackSecurity: true,
        hasMealDeal: true,
      },
    },
    {
      uid: "TrpEJ3b" as const,
      departureDate: new Date("2023-08-22T07:32:37.501Z"),
      departureAirport: {
        name: "Cologne Bonn" as const,
        canonicalUrlToken: "cologne-bonn" as const,
        code: "CGN" as const,
        country: "Germany" as const,
        countryCode: "DE" as const,
        airportGroupCode: "" as const,
        terminal: "1" as const,
      },
      arrivalDate: new Date("2023-08-22T12:47:37.501Z"),
      arrivalAirport: {
        name: "Liverpool" as const,
        canonicalUrlToken: "liverpool" as const,
        code: "LPL" as const,
        country: "United Kingdom" as const,
        countryCode: "GB" as const,
        airportGroupCode: "" as const,
        terminal: "1" as const,
      },
      number: "EZY1809" as const,
      passengers: [
        {
          uid: "8xdrbY2" as const,
          id: "0*4596 (P)" as const,
          gender: "male" as const,
          title: "Herr" as const,
          firstName: "Justin" as const,
          lastName: "Bürklein" as const,
          type: "Adult" as const,
          selectedSeat: "18E" as const,
          selectedSeatType: "Standard" as const,
          infant: {
            uid: "31pDwJD" as const,
            id: "7*3468 (P)" as const,
            gender: "male" as const,
            title: "Prof. Dr." as const,
            firstName: "Benno" as const,
            lastName: "Bürklein" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
        {
          uid: "IuMSMb7" as const,
          id: "6*0786 (P)" as const,
          gender: "male" as const,
          title: "Prof. Dr." as const,
          firstName: "Adriano" as const,
          lastName: "Meissner" as const,
          type: "Adult" as const,
          selectedSeat: "13E" as const,
          selectedSeatType: "Standard" as const,
          infant: {
            uid: "axAFZc4" as const,
            id: "9*1535 (P)" as const,
            gender: "male" as const,
            title: "Herr" as const,
            firstName: "Mateo" as const,
            lastName: "Meissner" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
      ],
      extras: {
        hasSmallCabinBag: true,
        hasLargeCabinBag: true,
        holdBags: [
          {
            name: "15kg Hold Bag" as const,
            weight: 15,
            amount: 0,
          },
          {
            name: "23kg Hold Bag" as const,
            weight: 23,
            amount: 1,
          },
          {
            name: "26kg Hold Bag" as const,
            weight: 26,
            amount: 0,
          },
          {
            name: "29kg Hold Bag" as const,
            weight: 29,
            amount: 0,
          },
          {
            name: "32kg Hold Bag" as const,
            weight: 32,
            amount: 0,
          },
        ],
        sportsEquipment: [
          {
            name: "Bicycle" as const,
            amount: 0,
          },
          {
            name: "Canoe" as const,
            amount: 0,
          },
          {
            name: "Sporting firearm" as const,
            amount: 0,
          },
          {
            name: "Golf bag" as const,
            amount: 0,
          },
          {
            name: "Hang glider" as const,
            amount: 0,
          },
          {
            name: "Skis and/or boots" as const,
            amount: 0,
          },
          {
            name: "Snowboard" as const,
            amount: 0,
          },
          {
            name: "Windsurfing board" as const,
            amount: 0,
          },
        ],
        hasSpeedyBoarding: true,
        hasEasyJetPlusBagDrop: true,
        hasFastTrackSecurity: true,
        hasMealDeal: true,
      },
    },
    {
      uid: "y943E4b" as const,
      departureDate: new Date("2023-08-23T12:47:37.501Z"),
      departureAirport: {
        name: "Kefalonia" as const,
        canonicalUrlToken: "kefalonia" as const,
        code: "EFL" as const,
        country: "Greece" as const,
        countryCode: "GR" as const,
        airportGroupCode: "" as const,
        terminal: null,
      },
      arrivalDate: new Date("2023-08-23T22:47:37.501Z"),
      arrivalAirport: {
        name: "Naples" as const,
        canonicalUrlToken: "naples" as const,
        code: "NAP" as const,
        country: "Italy" as const,
        countryCode: "IT" as const,
        airportGroupCode: "" as const,
        terminal: "1" as const,
      },
      number: "EZY0019" as const,
      passengers: [
        {
          uid: "8xdrbY2" as const,
          id: "0*4596 (P)" as const,
          gender: "male" as const,
          title: "Herr" as const,
          firstName: "Justin" as const,
          lastName: "Bürklein" as const,
          type: "Adult" as const,
          selectedSeat: "5F" as const,
          selectedSeatType: "Up Front" as const,
          infant: {
            uid: "31pDwJD" as const,
            id: "7*3468 (P)" as const,
            gender: "male" as const,
            title: "Prof. Dr." as const,
            firstName: "Benno" as const,
            lastName: "Bürklein" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
        {
          uid: "IuMSMb7" as const,
          id: "6*0786 (P)" as const,
          gender: "male" as const,
          title: "Prof. Dr." as const,
          firstName: "Adriano" as const,
          lastName: "Meissner" as const,
          type: "Adult" as const,
          selectedSeat: "25F" as const,
          selectedSeatType: "Standard" as const,
          infant: {
            uid: "axAFZc4" as const,
            id: "9*1535 (P)" as const,
            gender: "male" as const,
            title: "Herr" as const,
            firstName: "Mateo" as const,
            lastName: "Meissner" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
      ],
      extras: {
        hasSmallCabinBag: true,
        hasLargeCabinBag: true,
        holdBags: [
          {
            name: "15kg Hold Bag" as const,
            weight: 15,
            amount: 0,
          },
          {
            name: "23kg Hold Bag" as const,
            weight: 23,
            amount: 1,
          },
          {
            name: "26kg Hold Bag" as const,
            weight: 26,
            amount: 0,
          },
          {
            name: "29kg Hold Bag" as const,
            weight: 29,
            amount: 0,
          },
          {
            name: "32kg Hold Bag" as const,
            weight: 32,
            amount: 0,
          },
        ],
        sportsEquipment: [
          {
            name: "Bicycle" as const,
            amount: 0,
          },
          {
            name: "Canoe" as const,
            amount: 0,
          },
          {
            name: "Sporting firearm" as const,
            amount: 0,
          },
          {
            name: "Golf bag" as const,
            amount: 0,
          },
          {
            name: "Hang glider" as const,
            amount: 0,
          },
          {
            name: "Skis and/or boots" as const,
            amount: 0,
          },
          {
            name: "Snowboard" as const,
            amount: 0,
          },
          {
            name: "Windsurfing board" as const,
            amount: 0,
          },
        ],
        hasSpeedyBoarding: true,
        hasEasyJetPlusBagDrop: true,
        hasFastTrackSecurity: true,
        hasMealDeal: true,
      },
    },
    {
      uid: "kPYc6Mq" as const,
      departureDate: new Date("2023-08-24T22:47:37.501Z"),
      departureAirport: {
        name: "Warsaw" as const,
        canonicalUrlToken: "warsaw" as const,
        code: "WAW" as const,
        country: "Poland" as const,
        countryCode: "PL" as const,
        airportGroupCode: "" as const,
        terminal: "1" as const,
      },
      arrivalDate: new Date("2023-08-25T01:47:37.501Z"),
      arrivalAirport: {
        name: "La Rochelle" as const,
        canonicalUrlToken: "la-rochelle" as const,
        code: "LRH" as const,
        country: "France" as const,
        countryCode: "FR" as const,
        airportGroupCode: "" as const,
        terminal: null,
      },
      number: "EZY0008" as const,
      passengers: [
        {
          uid: "8xdrbY2" as const,
          id: "0*4596 (P)" as const,
          gender: "male" as const,
          title: "Herr" as const,
          firstName: "Justin" as const,
          lastName: "Bürklein" as const,
          type: "Adult" as const,
          selectedSeat: "21E" as const,
          selectedSeatType: "Standard" as const,
          infant: {
            uid: "31pDwJD" as const,
            id: "7*3468 (P)" as const,
            gender: "male" as const,
            title: "Prof. Dr." as const,
            firstName: "Benno" as const,
            lastName: "Bürklein" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
        {
          uid: "IuMSMb7" as const,
          id: "6*0786 (P)" as const,
          gender: "male" as const,
          title: "Prof. Dr." as const,
          firstName: "Adriano" as const,
          lastName: "Meissner" as const,
          type: "Adult" as const,
          selectedSeat: "14F" as const,
          selectedSeatType: "Standard" as const,
          infant: {
            uid: "axAFZc4" as const,
            id: "9*1535 (P)" as const,
            gender: "male" as const,
            title: "Herr" as const,
            firstName: "Mateo" as const,
            lastName: "Meissner" as const,
            type: "Infant" as const,
            selectedSeat: "1A" as const,
            selectedSeatType: "Standard" as const,
          },
        },
      ],
      extras: {
        hasSmallCabinBag: true,
        hasLargeCabinBag: true,
        holdBags: [
          {
            name: "15kg Hold Bag" as const,
            weight: 15,
            amount: 0,
          },
          {
            name: "23kg Hold Bag" as const,
            weight: 23,
            amount: 1,
          },
          {
            name: "26kg Hold Bag" as const,
            weight: 26,
            amount: 0,
          },
          {
            name: "29kg Hold Bag" as const,
            weight: 29,
            amount: 0,
          },
          {
            name: "32kg Hold Bag" as const,
            weight: 32,
            amount: 0,
          },
        ],
        sportsEquipment: [
          {
            name: "Bicycle" as const,
            amount: 0,
          },
          {
            name: "Canoe" as const,
            amount: 0,
          },
          {
            name: "Sporting firearm" as const,
            amount: 0,
          },
          {
            name: "Golf bag" as const,
            amount: 0,
          },
          {
            name: "Hang glider" as const,
            amount: 0,
          },
          {
            name: "Skis and/or boots" as const,
            amount: 0,
          },
          {
            name: "Snowboard" as const,
            amount: 0,
          },
          {
            name: "Windsurfing board" as const,
            amount: 0,
          },
        ],
        hasSpeedyBoarding: true,
        hasEasyJetPlusBagDrop: true,
        hasFastTrackSecurity: true,
        hasMealDeal: true,
      },
    },
  ],
  language: {
    value: "Deutsch" as const,
    locale: "de_DE" as const,
    flag: "germany" as const,
  },
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
