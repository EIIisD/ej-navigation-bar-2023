/* eslint-disable */
import { de, el, en, es, Faker, fr, he, hu, nl, pl, tr } from "@faker-js/faker"

import { airports, type Airport } from "@/config/airports"

const useRandomLocale = true

const randomItem = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

export const faker = new Faker({
  locale: useRandomLocale
    ? randomItem([de, el, es, fr, he, hu, nl, pl, tr])
    : [en],
})

export interface CustomerEntitlements {
  specialAssistance?: boolean
  largeCabinBag?: boolean
  underSeatCabinBag?: boolean
}

export interface Passenger {
  name: string
  passportNumber: string
}

export interface BoardingPass {
  dateOfTravel: Date
  flightNumber: string
  gateClosureTime: Date
  seatNumber: string
  reservationNumber: string
  checkInSequenceNumber: string
  symbolForCheckedInLuggageBooked?: boolean
  symbolForFastTrackSecurityAllowance?: boolean
  symbolForFlexiFarePurchase?: boolean
  customerEntitlements: CustomerEntitlements
  passengers: Passenger[]
  departureAirport: Airport
  arrivalAirport: Airport
  scheduledTimeOfDeparture: Date
}

const generateRandomDepartureDate = () => {
  const now = new Date()
  const randomHours = Math.floor(Math.random() * 24)
  const randomMinutes = Math.floor(Math.random() * 60)
  const randomSeconds = Math.floor(Math.random() * 60)
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    randomHours,
    randomMinutes,
    randomSeconds
  )
}

const generatePassengers = (): Passenger[] => {
  const numberOfPassengers = Math.floor(Math.random() * 5) + 1
  const passengers: Passenger[] = []
  const censorPassportNumber = true

  for (let i = 0; i < numberOfPassengers; i++) {
    passengers.push({
      name: faker.person.fullName(),
      passportNumber: censorPassportNumber
        ? `${faker.string.numeric(2)}***${faker.string.numeric(4)}`
        : faker.string.numeric(9),
    })
  }
  return passengers
}

const generateTestBoardingPass = (): BoardingPass => {
  const departureDate = generateRandomDepartureDate()
  const arrivalDate = new Date(
    departureDate.getFullYear(),
    departureDate.getMonth(),
    departureDate.getDate(),
    departureDate.getHours() + 2,
    departureDate.getMinutes(),
    departureDate.getSeconds()
  )
  const passengers = generatePassengers()

  return {
    dateOfTravel: departureDate,
    flightNumber: `EZY${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    gateClosureTime: departureDate,
    seatNumber: [
      faker.number.int(31),
      faker.string.fromCharacters("ABCDEF"),
    ].join(""),
    reservationNumber: faker.string.alphanumeric({
      length: 7,
      casing: "upper",
    }),
    // Check with cat what the requirements for this are - length?
    checkInSequenceNumber: `S${faker.string.numeric()}00`,
    symbolForCheckedInLuggageBooked: faker.datatype.boolean(0.5),
    symbolForFastTrackSecurityAllowance: faker.datatype.boolean(0.5),
    symbolForFlexiFarePurchase: faker.datatype.boolean(0.5),
    customerEntitlements: {
      specialAssistance: faker.datatype.boolean(0.25),
      largeCabinBag: faker.datatype.boolean(0.25),
      underSeatCabinBag: faker.datatype.boolean(0.5),
    },
    passengers: passengers,
    departureAirport: randomItem(airports),
    arrivalAirport: randomItem(airports),
    scheduledTimeOfDeparture: departureDate,
  }
}

export const boardingPassLog = () => {
  const data = faker.person.fullName()
  console.log(data)
}
