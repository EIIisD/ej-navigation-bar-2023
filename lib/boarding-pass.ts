import { de, el, en, es, Faker, fr, he, hu, nl, pl, tr } from "@faker-js/faker"

import { Airport, airports } from "../config/airports"

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
  for (let i = 0; i < numberOfPassengers; i++) {
    passengers.push({
      name: faker.person.fullName(),
      passportNumber: faker.random.alphaNumeric(9),
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
    flightNumber: "FR 1234",
    gateClosureTime: departureDate,
    seatNumber: "1A",
    reservationNumber: "ABC123",
    checkInSequenceNumber: "1",
    symbolForCheckedInLuggageBooked: true,
    symbolForFastTrackSecurityAllowance: true,
    symbolForFlexiFarePurchase: true,
    customerEntitlements: {
      specialAssistance: true,
      largeCabinBag: true,
      underSeatCabinBag: true,
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