import { de, el, en, es, Faker, fr, he, hu, nl, pl, tr } from "@faker-js/faker"
import { add, format } from "date-fns"

import { airports, type Airport } from "@/config/airports"
import { languagesMap } from "@/config/languages"
import { arrayElement, is, nanoid } from "@/lib/utils"

const scenarios = [
  {
    name: "normal",
    never: 0,
    unlikely: 0.25,
    likely: 0.75,
    always: 1,
  },
  {
    name: "worst",
    never: 0,
    unlikely: 1,
    likely: 1,
    always: 1,
  },
  {
    name: "best",
    never: 0,
    unlikely: 0,
    likely: 0,
    always: 1,
  },
  {
    name: "random",
    never: 0,
    unlikely: 0.5,
    likely: 0.5,
    always: 1,
  },
] as const

export const scenario = scenarios[0]

export const formatFlightTitle = (flight: Flight) =>
  `${flight.departureAirport.code}-${flight.arrivalAirport.code} - ${format(flight.departureDate, "do MMM")}`

export const formatPassengerTitle = (passenger: Passenger) => `${passenger.firstName} ${passenger.lastName} ${passenger.infant ? " + Infant" : ""}`

export const formatInfantPassengerTitle = (infant: Passenger) => `${infant.firstName} ${infant.lastName}`

export interface Passenger {
  uid: string
  id: string
  gender: "female" | "male"
  title: string
  firstName: string
  lastName: string
  type: "Adult" | "Infant"
  selectedSeat: string
  selectedSeatType: "Extra Legroom" | "Up Front" | "Standard"
  infant?: Passenger
  hasSmallCabinBag: boolean
  hasLargeCabinBag: boolean
}

export interface Luggage {
  name: string
  weight?: number
  amount: number
}

export interface Extras {
  hasSmallCabinBag: boolean
  hasLargeCabinBag: boolean
  holdBags: Luggage[]
  sportsEquipment: Luggage[]
  hasSpeedyBoarding: boolean
  hasEasyJetPlusBagDrop: boolean
  hasFastTrackSecurity: boolean
  hasMealDeal: boolean
}

export interface Flight {
  uid: string
  departureDate: Date
  departureAirport: Airport
  arrivalDate: Date
  arrivalAirport: Airport
  number: string
  passengers: Passenger[]
  extras: Extras
}

export const createBooking = () => {
  const locales = []

  const allLocals = {
    de: { language: languagesMap.de_DE, locale: de },
    el: { language: languagesMap.el_GR, locale: el },
    es: { language: languagesMap.es_ES, locale: es },
    fr: { language: languagesMap.fr_FR, locale: fr },
    he: { language: languagesMap.he_IL, locale: he },
    hu: { language: languagesMap.hu_HU, locale: hu },
    nl: { language: languagesMap.nl_NL, locale: nl },
    pl: { language: languagesMap.pl_PL, locale: pl },
    tr: { language: languagesMap.tr_TR, locale: tr },
    en: { language: languagesMap.en_US, locale: en },
  }

  is(scenario.always) && locales.push(allLocals.de) /* Germany */
  is(scenario.unlikely) && locales.push(allLocals.el) /* Greece */
  is(scenario.always) && locales.push(allLocals.es) /* Spain */
  is(scenario.always) && locales.push(allLocals.fr) /* France */
  is(scenario.unlikely / 5) && locales.push(allLocals.he) /* Israel */
  is(scenario.always) && locales.push(allLocals.hu) /* Hungary */
  is(scenario.always) && locales.push(allLocals.nl) /* Netherlands */
  is(scenario.always) && locales.push(allLocals.pl) /* Poland */
  is(scenario.unlikely) && locales.push(allLocals.tr) /* Turkey */
  is(scenario.always) && locales.push(allLocals.en) /* US/UK/etc */

  const selectedLocale = arrayElement(locales)
  const language = selectedLocale.language

  const faker = new Faker({ locale: selectedLocale.locale })

  const hasEasyJetPlus = is(scenario.unlikely)

  const createFlights = () => {
    interface FlightDetails {
      departureDate: Date
      departureAirport: (typeof airports)[number]
      arrivalDate: Date
      arrivalAirport: (typeof airports)[number]
    }

    const createFlight = (previousFlight?: FlightDetails): Flight => {
      const departureDate = previousFlight ? add(previousFlight.arrivalDate, { hours: 24 }) : faker.date.soon({ days: 8 })
      const availableDepartureAirports = airports.filter((airport) => !previousFlight || airport.code !== previousFlight.arrivalAirport.code)
      const departureAirport = arrayElement(availableDepartureAirports)

      const arrivalDateModifier = {
        hours: faker.number.int({ min: 1, max: 9 }),
        minutes: faker.number.int({ min: 1, max: 4 }) * 15,
      }

      const availableArrivalAirports = airports.filter((airport) => airport.code !== departureAirport.code)
      const arrivalDate = add(departureDate, arrivalDateModifier)
      const arrivalAirport = arrayElement(availableArrivalAirports)

      const flightNumber = `EZY${faker.airline.flightNumber({ addLeadingZeros: true })}`

      return {
        uid: nanoid(),
        departureDate,
        departureAirport,
        arrivalDate,
        arrivalAirport,
        number: flightNumber,
        passengers: [],
        extras: {
          hasSmallCabinBag: false,
          hasLargeCabinBag: false,
          holdBags: [],
          sportsEquipment: [],
          hasSpeedyBoarding: false,
          hasEasyJetPlusBagDrop: false,
          hasFastTrackSecurity: false,
          hasMealDeal: false,
        },
      }
    }

    const createJourney = (): Flight[] => {
      const flights: Flight[] = []
      const outboundFlight = createFlight()
      flights.push(outboundFlight)

      const numConnectingFlights = is(scenario.unlikely) ? faker.number.int({ min: 0, max: 1 }) : 0

      for (let i = 0; i < numConnectingFlights; i++) {
        const connectingFlight = createFlight({
          departureDate: flights[i].arrivalDate,
          departureAirport: flights[i].arrivalAirport,
          arrivalDate: flights[i].arrivalDate,
          arrivalAirport: flights[i].arrivalAirport,
        })

        flights.push(connectingFlight)
      }

      if (is(scenario.likely)) {
        const returnFlight = createFlight({
          departureDate: flights[flights.length - 1].arrivalDate,
          departureAirport: flights[flights.length - 1].arrivalAirport,
          arrivalDate: flights[flights.length - 1].arrivalDate,
          arrivalAirport: flights[flights.length - 1].arrivalAirport,
        })

        flights.push(returnFlight)
      }

      return flights
    }

    return createJourney()
  }

  const flights = createFlights()

  const createPassengers = () => {
    const createPassenger = (type: "Infant" | "Adult") => {
      const censorId = (passengerId: string): string => {
        const documentCensorCharacter = "*"
        const documentFirstCharacter = passengerId.slice(0, 1)
        const documentLastFourCharacters = passengerId.slice(-4)
        const documentCensoredCharacters = passengerId.slice(1, 2).replace(/./g, documentCensorCharacter)

        return [documentFirstCharacter, documentCensoredCharacters, documentLastFourCharacters].join("").toUpperCase()
      }

      const createId = () => {
        const idTypes = {
          passportNumber: `${censorId(faker.string.numeric({ length: { min: 6, max: 12 } }))} (P)`,
          idCardNumber: `${censorId(faker.string.alphanumeric({ length: { min: 9, max: 15 } }))} (I)`,
          groupPassportNumber: `${censorId(faker.string.numeric({ length: { min: 6, max: 12 } }))} (G)`,
          refugeeTravelDocumentNumber: `${censorId(faker.string.alphanumeric({ length: { min: 9, max: 15 } }))} (R)`,
        }

        if (is(scenario.likely)) return idTypes.passportNumber
        if (is(scenario.unlikely / 4)) return idTypes.refugeeTravelDocumentNumber
        if (is(scenario.unlikely / 3)) return idTypes.groupPassportNumber
        if (is(scenario.unlikely / 2)) return idTypes.idCardNumber

        return idTypes.passportNumber
      }

      const passengerGender: Passenger["gender"] = arrayElement(["male", "female"])
      const passengerTitle = faker.person.prefix(passengerGender as "female" | "male" | undefined)
      const passengerFirstName = faker.person.firstName(passengerGender as "female" | "male" | undefined)
      const passengerLastName = faker.person.lastName(passengerGender as "female" | "male" | undefined)

      const passenger: Passenger = {
        uid: nanoid(),
        id: createId(),
        gender: passengerGender,
        title: passengerTitle,
        firstName: passengerFirstName,
        lastName: passengerLastName,
        type,
        selectedSeat: "1A",
        selectedSeatType: "Standard",
        hasSmallCabinBag: type !== "Infant",
        hasLargeCabinBag: false,
      }

      return passenger
    }

    const maximumAmountOfPassengers = 40
    const maximumAmountOfAdultPassengers = maximumAmountOfPassengers

    const amountOfAdultPassengers = faker.number.int({
      min: {
        best: 1,
        normal: 1,
        worst: maximumAmountOfAdultPassengers,
        random: 1,
      }[scenario.name],
      max: {
        best: 1,
        normal: 8,
        worst: maximumAmountOfAdultPassengers,
        random: maximumAmountOfAdultPassengers,
      }[scenario.name],
    })

    const maximumAmountOfInfantPassengers = Math.min(7, maximumAmountOfPassengers - amountOfAdultPassengers)

    const amountOfInfantPassengers = faker.number.int({
      min: 0,
      max: Math.min(
        maximumAmountOfInfantPassengers,
        {
          best: 0,
          normal: amountOfAdultPassengers,
          worst: maximumAmountOfInfantPassengers,
          random: Math.floor(amountOfAdultPassengers / 2),
        }[scenario.name]
      ),
    })

    const infantPassengers: Passenger[] = Array.from({ length: amountOfInfantPassengers }, () => createPassenger("Infant"))

    const allPassengers: Passenger[] = Array.from({ length: amountOfAdultPassengers }, () => createPassenger("Adult")).map((passenger, index) => {
      if (infantPassengers[index]) {
        return { ...passenger, infant: { ...infantPassengers[index], lastName: passenger.lastName } }
      } else {
        return passenger
      }
    })

    return allPassengers.sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
  }

  const passengers = createPassengers()
  flights.forEach((_, index) => (flights[index].passengers = passengers))

  const bookingFareOptions = is(scenario.unlikely) ? ["Standard", "FLEXI"] : ["Standard"]
  const bookingFareType = arrayElement(passengers.length <= 8 ? bookingFareOptions : ["Standard"])
  const bookingBundle = bookingFareType !== "FLEXI" ? arrayElement(["Standard", "Standard Plus", "Essentials"]) : undefined

  flights.forEach((_, index) => {
    flights[index].passengers = flights[index].passengers.map((passenger) => ({
      ...passenger,
      hasSmallCabinBag: is(scenario.always),
      hasLargeCabinBag: bookingFareType === "FLEXI" || bookingBundle === "Standard Plus" || is(scenario.unlikely),
    }))
  })

  const createExtras = () => {
    const hasSmallCabinBag = is(scenario.always)
    const hasLargeCabinBag = bookingFareType === "FLEXI" || bookingBundle === "Standard Plus"

    const holdBags: Luggage[] = [
      { name: "Hold Bag", weight: 15, amount: 0 },
      {
        name: "Hold Bag",
        weight: 23,
        amount: bookingFareType === "FLEXI" || bookingBundle === "Essentials" ? 1 : is(scenario.unlikely) ? 1 : 0,
      },
      { name: "Hold Bag", weight: 26, amount: 0 },
      { name: "Hold Bag", weight: 29, amount: 0 },
      { name: "Hold Bag", weight: 32, amount: 0 },
    ]

    const sportsEquipment: Luggage[] = [
      { name: "Bicycle", amount: 0 },
      { name: "Canoe", amount: 0 },
      { name: "Sporting firearm", amount: 0 },
      { name: "Golf bag", amount: 0 },
      { name: "Hang glider", amount: 0 },
      { name: "Skis and/or boots", amount: 0 },
      { name: "Snowboard", amount: 0 },
      { name: "Windsurfing board", amount: 0 },
    ]

    const hasSpeedyBoarding = hasLargeCabinBag || bookingFareType === "FLEXI" || bookingBundle === "Standard Plus"
    const hasEasyJetPlusBagDrop = hasEasyJetPlus || bookingFareType === "FLEXI"
    const hasFastTrackSecurity = bookingFareType === "FLEXI"
    const hasMealDeal = bookingFareType === "FLEXI"

    const extras: Extras = {
      hasSmallCabinBag,
      hasLargeCabinBag,
      holdBags,
      sportsEquipment,
      hasSpeedyBoarding,
      hasEasyJetPlusBagDrop,
      hasFastTrackSecurity,
      hasMealDeal,
    }

    return extras
  }

  const extras = createExtras()
  flights.forEach((_, index) => (flights[index].extras = extras))

  const createSeatSelection = (passenger: Passenger) => {
    const hasInfant = !!passenger.infant

    const allRows = Array.from({ length: 31 }, (_, i) => i + 1)
    const availableRows = hasInfant ? allRows.filter((r) => ![10, 11].includes(r)) : allRows
    const selectedRow = arrayElement(availableRows)
    const allColumns = "ABCDEF"
    const availableColumns = hasInfant ? (selectedRow === 26 ? "CD" : "EF") : allColumns
    const selectedColumn = faker.string.fromCharacters(availableColumns)
    const selectedSeat = [selectedRow, selectedColumn].join("")

    const selectedSeatType: Passenger["selectedSeatType"] = [1, 10, 11].includes(selectedRow)
      ? "Extra Legroom"
      : [2, 3, 4, 5].includes(selectedRow)
      ? "Up Front"
      : "Standard"

    return {
      selectedSeat,
      selectedSeatType,
    }
  }

  flights.forEach(
    (flight, index) => (flights[index].passengers = flight.passengers.map((passenger) => ({ ...passenger, ...createSeatSelection(passenger) })))
  )

  const createHoldBags = (flight: Flight) => {
    const maximumAmountOfHoldBags = 3
    const amountOfHoldBags = faker.number.int({ min: 0, max: maximumAmountOfHoldBags })
    const currentHoldBags = flight.extras.holdBags

    const getTotalHoldBagsAmount = (holdBags: typeof currentHoldBags) => holdBags.reduce((total, holdBag) => total + holdBag.amount, 0)

    while (getTotalHoldBagsAmount(currentHoldBags) < amountOfHoldBags) {
      const holdBagType = arrayElement(currentHoldBags)
      const holdBagTypeIndex = currentHoldBags.indexOf(holdBagType)

      currentHoldBags[holdBagTypeIndex].amount += faker.number.int({
        min: 1,
        max: amountOfHoldBags - getTotalHoldBagsAmount(currentHoldBags),
      })
    }

    return currentHoldBags
  }

  const holdBags = createHoldBags(flights[0])
  flights.forEach((_, index) => (flights[index].extras.holdBags = holdBags))

  const createSportsEquipment = (flight: Flight) => {
    const maximumAmountOfSportsEquipment = 1
    const amountOfSportsEquipment = faker.number.int({ min: 0, max: maximumAmountOfSportsEquipment })
    const currentSportsEquipment = flight.extras.sportsEquipment

    const getTotalSportsEquipmentAmount = (sportsEquipment: typeof currentSportsEquipment) =>
      sportsEquipment.reduce((total, holdBag) => total + holdBag.amount, 0)

    while (getTotalSportsEquipmentAmount(currentSportsEquipment) < amountOfSportsEquipment) {
      const sportsEquipmentType = arrayElement(currentSportsEquipment)
      const sportsEquipmentTypeIndex = currentSportsEquipment.indexOf(sportsEquipmentType)

      currentSportsEquipment[sportsEquipmentTypeIndex].amount += faker.number.int({
        min: 1,
        max: amountOfSportsEquipment - getTotalSportsEquipmentAmount(currentSportsEquipment),
      })
    }

    return currentSportsEquipment
  }

  const sportsEquipment = createSportsEquipment(flights[0])
  flights.forEach((_, index) => (flights[index].extras.sportsEquipment = sportsEquipment))

  const booking = {
    hasEasyJetPlus,
    bookingFareType,
    bookingBundle,
    passengers,
    flights,
    language,
  }

  return booking
}

export type Booking = ReturnType<typeof createBooking>
