/* eslint-disable */
import { de, el, en, es, Faker, fr, he, hu, nl, pl, tr } from "@faker-js/faker"
import { format, sub } from "date-fns"

import { airports, type Airport } from "@/config/airports"

const useRandomLocale = true
const censorPassportNumber = true

const randomItemFromArray = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)]

export const faker = new Faker({
  locale: useRandomLocale
    ? randomItemFromArray([de, el, es, fr, he, hu, nl, pl, tr])
    : [en],
})

export interface ICustomerEntitlements {
  specialAssistance: boolean
  largeCabinBag: boolean
  underSeatCabinBag: boolean
}

export interface IPassenger {
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
  symbolForCheckedInLuggageBooked: boolean
  symbolForFastTrackSecurityAllowance: boolean
  symbolForFlexiFarePurchase: boolean
  customerEntitlements: ICustomerEntitlements
  passenger: IPassenger
  infantPassenger: IPassenger | false
  departureAirport: Airport
  arrivalAirport: Airport
  scheduledTimeOfDeparture: string
}

const generatePassenger = (): IPassenger => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  passportNumber: censorPassportNumber
    ? `${faker.string.numeric(2)}***${faker.string.numeric(4)}`
    : faker.string.numeric(9),
})

const generateTerminal = (): string => {
  const terminal = faker.string.fromCharacters("ABCDEF")
  const gate = faker.number.int({ min: 1, max: 24 })
  return [terminal, gate].join("")
}

export const generateBoardingPass = (): IBoardingPass => {
  const passenger = generatePassenger()
  const departureDate = faker.date.soon()
  const departureAirport = faker.helpers.arrayElement(airports)
  const arrivalAirport = faker.helpers.arrayElement(
    airports.filter((airport) => airport.code !== departureAirport.code)
  )

  return {
    dateOfTravel: format(departureDate, "dd/MM/yyyy"),
    flightNumber: `EZY${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    gateClosureTime: format(sub(departureDate, { minutes: 30 }), "HH:mm"),
    seatNumber: [
      faker.number.int({ min: 1, max: 31 }),
      faker.string.fromCharacters("ABCDEF"),
    ].join(""),
    reservationNumber: faker.string.alphanumeric({
      length: 7,
      casing: "upper",
    }),
    checkInSequenceNumber: `S${faker.number.int({ min: 1, max: 9 })}00`,
    symbolForCheckedInLuggageBooked: faker.datatype.boolean(1),
    symbolForFastTrackSecurityAllowance: faker.datatype.boolean(0.5),
    symbolForFlexiFarePurchase: faker.datatype.boolean(0.5),
    customerEntitlements: {
      specialAssistance: faker.datatype.boolean(0.25),
      largeCabinBag: faker.datatype.boolean(0.25),
      underSeatCabinBag: faker.datatype.boolean(0.5),
    },
    passenger: passenger,
    infantPassenger: faker.datatype.boolean(0.5)
      ? { ...generatePassenger(), lastName: passenger.lastName }
      : false,
    departureAirport: {
      ...departureAirport,
      terminal: generateTerminal(),
    },
    arrivalAirport: {
      ...arrivalAirport,
      terminal: generateTerminal(),
    },
    scheduledTimeOfDeparture: format(departureDate, "HH:mm"),
  }
}
