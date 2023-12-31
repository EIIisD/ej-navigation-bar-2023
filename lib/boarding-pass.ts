/* eslint-disable */
import { de, el, en, es, Faker, fr, he, hu, nl, pl, tr } from "@faker-js/faker"
import { add, endOfDay, format, isWithinInterval, setHours, startOfDay, sub } from "date-fns"

import { airports, type Airport } from "@/config/airports"
import { arrayElement } from "@/lib/utils"

const useRandomLocale = true
const scenario = [
  {
    name: "worst",
    unlikely: 1,
    likely: 1,
  },
  {
    name: "best",
    unlikely: 0,
    likely: 0,
  },
  {
    name: "random",
    unlikely: 0.25,
    likely: 0.5,
  },
][2]

export interface IPassenger {
  title: string
  firstName: string
  lastName: string
  documentID: string
}

export interface IBoardingPass {
  dateOfTravel: {
    value: Date
    formattedValue: string
  }
  dateOfArrival: {
    value: Date
  }
  flightNumber: string
  seatNumber: string
  reservationNumber: string
  checkInSequenceNumber: string
  extras: {
    seatType: "upfront" | "extraLegroom" | "standard"
    hasSpecialAssistance: boolean
    hasSpeedyBoarding: boolean
    hasFoodAndDrinkVoucher: boolean
    hasFastTrackSecurityAllowance: boolean
  }
  bagsAndHoldLuggage: {
    cabinBagSmall: boolean
    cabinBagLarge: boolean
    holdBag15KG: boolean
    holdBag23KG: boolean
    holdBag32KG: boolean
    pram: boolean
    sportsEquipment: boolean
  }
  customerEntitlementsCode: "SA" | "S1" | "S2" | ""
  passenger: IPassenger
  infantPassenger: IPassenger | false
  departureAirport: Airport
  arrivalAirport: Airport
  gateClosureTime: {
    value: Date
    formattedValue: string
    isBetween6AMand6PM: boolean
  }
  scheduledTimeOfDeparture: {
    value: Date
    formattedValue: string
    isBetween6AMand6PM: boolean
  }
}

export const generateBoardingPass = (): IBoardingPass => {
  const locale = useRandomLocale ? arrayElement([de, el, es, fr, he, hu, nl, pl, tr]) : en
  const faker = new Faker({ locale })

  const generatePassenger = (): IPassenger => {
    const gender = arrayElement(["male", "female", undefined]) as "male" | "female" | undefined

    const censorDocumentID = (documentID: string): string => {
      const censorCharacter = "*"
      const firstCharacter = documentID.slice(0, 1)
      const lastFourCharacters = documentID.slice(-4)
      const censoredCharacters = documentID.slice(1, 2).replace(/./g, censorCharacter)

      return [firstCharacter, censoredCharacters, lastFourCharacters].join("").toUpperCase()
    }

    return {
      title: faker.person.prefix(gender),
      firstName: faker.person.firstName(gender),
      lastName: faker.person.lastName(gender),
      documentID: arrayElement([
        `${censorDocumentID(faker.string.numeric({ length: { min: 6, max: 12 } }))} (P)`,
        `${censorDocumentID(faker.string.numeric({ length: { min: 6, max: 12 } }))} (G)`,
        `${censorDocumentID(faker.string.alphanumeric({ length: { min: 9, max: 15 } }))} (I)`,
        `${censorDocumentID(faker.string.alphanumeric({ length: { min: 9, max: 15 } }))} (R)`,
      ]),
    }
  }

  // const generateTerminal = (): string => {
  //   const terminal = faker.string.fromCharacters("ABCDEF")
  //   const gate = faker.number.int({ min: scenario.name === "worst" ? 10 : 1, max: scenario.name === "best" ? 9 : 24 })
  //   return [terminal, gate].join("")
  // }

  const passenger = generatePassenger()
  const departureDate = faker.date.soon({ days: 8 })
  const departureAirport = arrayElement(
    scenario.name === "worst"
      ? airports.filter((airport) => airport.name.length > 20)
      : scenario.name === "best"
      ? airports.filter((airport) => airport.name.length < 5)
      : airports
  )
  const airportsWithoutDepartureAirport = airports.filter((airport) => airport.code !== departureAirport.code && airport.countryCode !== "GB")
  const arrivalAirport = arrayElement(
    scenario.name === "worst"
      ? airportsWithoutDepartureAirport.filter((airport) => airport.name.length > 20)
      : scenario.name === "best"
      ? airportsWithoutDepartureAirport.filter((airport) => airport.name.length < 5)
      : airportsWithoutDepartureAirport
  )

  const isBetween6AMand6PM = (date: Date) => {
    const lowerBound = setHours(startOfDay(date), 6) // set start to 6:00 AM of current day
    const upperBound = setHours(endOfDay(date), 18) // set end to 6:00 PM of current day

    return isWithinInterval(date, { start: lowerBound, end: upperBound })
  }

  return {
    dateOfTravel: {
      value: departureDate,
      formattedValue: format(departureDate, "dd MMM yy"),
    },
    dateOfArrival: {
      value: add(departureDate, { hours: faker.number.int({ min: 1, max: 9 }), minutes: faker.number.int({ min: 1, max: 4 }) * 15 }),
    },
    flightNumber: `EZY${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    seatNumber: [
      faker.number.int({ min: scenario.name === "worst" ? 10 : 1, max: scenario.name === "best" ? 9 : 31 }),
      faker.string.fromCharacters("ABCDEF"),
    ].join(""),
    reservationNumber: faker.string.alphanumeric({
      length: 7,
      casing: "upper",
    }),
    checkInSequenceNumber: `S${faker.number.int({ min: 1, max: 9 })}00`,
    extras: {
      seatType: arrayElement(["upfront", "extraLegroom", "standard"]),
      hasSpecialAssistance: faker.datatype.boolean(scenario.unlikely),
      hasSpeedyBoarding: faker.datatype.boolean(scenario.likely),
      hasFoodAndDrinkVoucher: faker.datatype.boolean(scenario.likely),
      hasFastTrackSecurityAllowance: faker.datatype.boolean(scenario.likely),
    },
    bagsAndHoldLuggage: {
      cabinBagSmall: faker.datatype.boolean(scenario.unlikely),
      cabinBagLarge: faker.datatype.boolean(scenario.unlikely),
      holdBag15KG: faker.datatype.boolean(scenario.unlikely),
      holdBag23KG: faker.datatype.boolean(scenario.unlikely),
      holdBag32KG: faker.datatype.boolean(scenario.unlikely),
      pram: faker.datatype.boolean(scenario.unlikely),
      sportsEquipment: faker.datatype.boolean(scenario.unlikely),
    },
    customerEntitlementsCode: arrayElement(["SA", "S1", "S2", ""]),
    passenger: passenger,
    infantPassenger: faker.datatype.boolean(scenario.unlikely) ? { ...generatePassenger(), lastName: passenger.lastName } : false,
    departureAirport: {
      ...departureAirport,
      terminal: departureAirport.terminal,
    },
    arrivalAirport: {
      ...arrivalAirport,
      terminal: arrivalAirport.terminal,
    },
    gateClosureTime: {
      value: sub(departureDate, { minutes: 30 }),
      formattedValue: format(sub(departureDate, { minutes: 30 }), "HH:mm a"),
      isBetween6AMand6PM: isBetween6AMand6PM(sub(departureDate, { minutes: 30 })),
    },
    scheduledTimeOfDeparture: {
      value: departureDate,
      formattedValue: format(departureDate, "HH:mm a"),
      isBetween6AMand6PM: isBetween6AMand6PM(departureDate),
    },
  }
}
