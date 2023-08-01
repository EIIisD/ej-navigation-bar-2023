/* eslint-disable */
import { de, el, en, es, Faker, fr, he, hu, nl, pl, tr } from "@faker-js/faker"
import { format, sub } from "date-fns"

import { airports, type Airport } from "@/config/airports"

const useRandomLocale = true
const censorPassportNumber = true
// const censorCharacter = "***"
// const censorCharacter = "…"
const censorCharacter = "*"
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

const randomItemFromArray = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

export interface IPassenger {
  title: string
  firstName: string
  lastName: string
  passportNumber: string
}

export interface IBoardingPass {
  dateOfTravel: string
  flightNumber: string
  gateClosureTime: string
  seatNumber: string
  reservationNumber: string
  checkInSequenceNumber: string
  extras: {
    seatType: "upfront" | "extraLegroom" | "standard"
    hasSpecialAssistance: boolean
    hasLargeCabinBag: boolean
    hasHoldBag: boolean
    hasSpeedyBoarding: boolean
  }
  checkedInLuggageBooked: boolean
  fastTrackSecurityAllowance: boolean
  flexiFarePurchase: boolean
  customerEntitlementsCode: "SA" | "S1" | "S2" | ""
  passenger: IPassenger
  infantPassenger: IPassenger | false
  departureAirport: Airport
  arrivalAirport: Airport
  scheduledTimeOfDeparture: string
  development: {
    showAirportSpecificInformation: boolean
  }
}

export const generateBoardingPass = (): IBoardingPass => {
  const locale = useRandomLocale ? randomItemFromArray([de, el, es, fr, he, hu, nl, pl, tr]) : en
  const faker = new Faker({ locale })

  const generatePassenger = (): IPassenger => {
    const gender = faker.helpers.arrayElement(["male", "female", undefined]) as "male" | "female" | undefined

    // we can use this array to select names of a given length, though gender becomes an issue
    // console.log(faker.definitions.person.male_first_name)

    return {
      title: faker.person.prefix(gender),
      firstName: faker.person.firstName(gender),
      lastName: faker.person.lastName(gender),
      passportNumber: censorPassportNumber ? `${faker.string.numeric(2)}${censorCharacter}${faker.string.numeric(4)}` : faker.string.numeric(9),
    }
  }

  const generateTerminal = (): string => {
    const terminal = faker.string.fromCharacters("ABCDEF")
    const gate = faker.number.int({ min: scenario.name === "worst" ? 10 : 1, max: scenario.name === "best" ? 9 : 24 })
    return [terminal, gate].join("")
  }

  const passenger = generatePassenger()
  const departureDate = faker.date.soon()
  const departureAirport = faker.helpers.arrayElement(
    scenario.name === "worst"
      ? airports.filter((airport) => airport.name.length > 20)
      : scenario.name === "best"
      ? airports.filter((airport) => airport.name.length < 5)
      : airports
  )
  const airportsWithoutDepartureAirport = airports.filter((airport) => airport.code !== departureAirport.code)
  const arrivalAirport = faker.helpers.arrayElement(
    scenario.name === "worst"
      ? airportsWithoutDepartureAirport.filter((airport) => airport.name.length > 20)
      : scenario.name === "best"
      ? airportsWithoutDepartureAirport.filter((airport) => airport.name.length < 5)
      : airportsWithoutDepartureAirport
  )

  return {
    dateOfTravel: format(departureDate, "dd MMM"),
    flightNumber: `EZY${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    gateClosureTime: format(sub(departureDate, { minutes: 30 }), "HH:mm a"),
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
      seatType: randomItemFromArray(["upfront", "extraLegroom", "standard"]),
      hasSpecialAssistance: faker.datatype.boolean(scenario.unlikely),
      hasLargeCabinBag: faker.datatype.boolean(scenario.likely),
      hasHoldBag: faker.datatype.boolean(scenario.unlikely),
      hasSpeedyBoarding: faker.datatype.boolean(scenario.likely),
    },
    checkedInLuggageBooked: true,
    fastTrackSecurityAllowance: faker.datatype.boolean(scenario.likely),
    flexiFarePurchase: faker.datatype.boolean(scenario.likely),
    customerEntitlementsCode: faker.helpers.arrayElement(["SA", "S1", "S2", ""]),
    passenger: passenger,
    infantPassenger: faker.datatype.boolean(scenario.unlikely) ? { ...generatePassenger(), lastName: passenger.lastName } : false,
    departureAirport: {
      ...departureAirport,
      terminal: generateTerminal(),
    },
    arrivalAirport: {
      ...arrivalAirport,
      terminal: generateTerminal(),
    },
    scheduledTimeOfDeparture: format(departureDate, "HH:mm a"),
    development: {
      showAirportSpecificInformation: faker.datatype.boolean(scenario.unlikely),
    },
  }
}
