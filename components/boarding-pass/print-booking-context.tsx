"use client"

import React, { type Dispatch, type SetStateAction } from "react"

import { type Booking, type Passenger } from "@/config/booking"

export interface PrintBookingContext {
  booking: Booking
  setBooking: Dispatch<SetStateAction<PrintBookingContext["booking"]>>
  selectedPassengers: Passenger[]
  setSelectedPassengers: Dispatch<SetStateAction<PrintBookingContext["selectedPassengers"]>>
}

export const printBookingContextDefs = {
  booking: {
    hasEasyJetPlus: false,
    bookingFareType: "FLEXI",
    bookingBundle: undefined,
    passengers: [
      {
        id: "7*3244 (P)",
        gender: "male" as const,
        title: "Sr.",
        firstName: "Pedro",
        lastName: "Chavarría Benítez",
        type: "Adult" as const,
        selectedSeat: "8F",
        selectedSeatType: "Standard" as const,
        infant: {
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
        id: "8*7567 (P)",
        gender: "male" as const,
        title: "Sr.",
        firstName: "Rubén",
        lastName: "Verdugo Preciado",
        type: "Adult" as const,
        selectedSeat: "30E",
        selectedSeatType: "Standard" as const,
        infant: {
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
        name: "Sharm El Sheikh",
        canonicalUrlToken: "sharm-el-sheikh",
        code: "SSH",
        country: "Egypt",
        countryCode: "EG",
        airportGroupCode: "",
        terminal: null,
      },
      arrivalDate: new Date("2023-08-18T15:45:20.605Z"),
      arrivalAirport: {
        name: "Sicily Palermo",
        canonicalUrlToken: "palermo-sicily",
        code: "PMO",
        country: "Italy",
        countryCode: "IT",
        airportGroupCode: "*SY",
        terminal: null,
      },
      number: "EZY8799",
      passengers: [
        {
          id: "7*3244 (P)",
          gender: "male" as const,
          title: "Sr.",
          firstName: "Pedro",
          lastName: "Chavarría Benítez",
          type: "Adult" as const,
          selectedSeat: "8F",
          selectedSeatType: "Standard" as const,
          infant: {
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
          id: "8*7567 (P)",
          gender: "male" as const,
          title: "Sr.",
          firstName: "Rubén",
          lastName: "Verdugo Preciado",
          type: "Adult" as const,
          selectedSeat: "30E",
          selectedSeatType: "Standard" as const,
          infant: {
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
        name: "Sicily Palermo",
        canonicalUrlToken: "palermo-sicily",
        code: "PMO",
        country: "Italy",
        countryCode: "IT",
        airportGroupCode: "*SY",
        terminal: null,
      },
      arrivalDate: new Date("2023-08-21T04:30:20.605Z"),
      arrivalAirport: {
        name: "Sharm El Sheikh",
        canonicalUrlToken: "sharm-el-sheikh",
        code: "SSH",
        country: "Egypt",
        countryCode: "EG",
        airportGroupCode: "",
        terminal: null,
      },
      number: "EZY0052",
      passengers: [
        {
          id: "7*3244 (P)",
          gender: "male" as const,
          title: "Sr.",
          firstName: "Pedro",
          lastName: "Chavarría Benítez",
          type: "Adult" as const,
          selectedSeat: "8F",
          selectedSeatType: "Standard" as const,
          infant: {
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
          id: "8*7567 (P)",
          gender: "male" as const,
          title: "Sr.",
          firstName: "Rubén",
          lastName: "Verdugo Preciado",
          type: "Adult" as const,
          selectedSeat: "30E",
          selectedSeatType: "Standard" as const,
          infant: {
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
  },
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
