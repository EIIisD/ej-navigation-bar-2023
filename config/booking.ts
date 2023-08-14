import { de, el, en, es, Faker, fr, he, hu, nl, pl, tr } from "@faker-js/faker"
import { add } from "date-fns"

import { airports, type Airport } from "@/config/airports"
import { languages, languagesMap } from "@/config/languages"
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
}

export interface HoldBag {
  name: string
  weight: number
  amount: number
}

export interface SportsEquipment {
  name: string
  amount: number
}

export interface Extras {
  hasSmallCabinBag: boolean
  hasLargeCabinBag: boolean
  holdBags: HoldBag[]
  sportsEquipment: SportsEquipment[]
  hasSpeedyBoarding: boolean
  hasEasyJetPlusBagDrop: boolean
  hasFastTrackSecurity: boolean
  hasMealDeal: boolean
}

export interface Flight {
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

  const faker = new Faker({ locale: selectedLocale.locale })

  const hasEasyJetPlus = is(scenario.unlikely)

  const createFlights = () => {
    const createFlight = (): Flight => {
      const availableDepartureAirports = airports.filter((airport) => !!airport)
      const flightDepartureDate = faker.date.soon({ days: 8 })
      const flightDepartureAirport = arrayElement(availableDepartureAirports)

      const arrivalDateModifier = {
        hours: faker.number.int({ min: 1, max: 9 }),
        minutes: faker.number.int({ min: 1, max: 4 }) * 15,
      }

      const availableArrivalAirports = airports.filter((airport) => airport.code !== flightDepartureAirport.code)
      const flightArrivalDate = add(flightDepartureDate, arrivalDateModifier)
      const flightArrivalAirport = arrayElement(availableArrivalAirports)

      const flightNumber = `EZY${faker.airline.flightNumber({ addLeadingZeros: true })}`

      return {
        departureDate: flightDepartureDate,
        departureAirport: flightDepartureAirport,
        arrivalDate: flightArrivalDate,
        arrivalAirport: flightArrivalAirport,
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

    const createReturnFlight = (originalFlight: Flight): Flight => {
      const returnDepartureDate = add(originalFlight.arrivalDate, {
        days: faker.number.int({ min: 1, max: 3 }),
        hours: faker.number.int({ min: 1, max: 9 }),
        minutes: faker.number.int({ min: 1, max: 4 }) * 15,
      })

      const returnFlightNumber = `EZY${faker.airline.flightNumber({ addLeadingZeros: true })}`

      return {
        departureDate: returnDepartureDate,
        departureAirport: originalFlight.arrivalAirport,
        arrivalDate: add(returnDepartureDate, {
          hours: faker.number.int({ min: 1, max: 9 }),
          minutes: faker.number.int({ min: 1, max: 4 }) * 15,
        }),
        arrivalAirport: originalFlight.departureAirport,
        number: returnFlightNumber,
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

    const outboundFlight = createFlight()

    return {
      outboundFlight,
      returnFlight: !is(scenario.unlikely) ? createReturnFlight(outboundFlight) : undefined,
    }
  }

  const { outboundFlight, returnFlight } = createFlights()

  const createPassengers = () => {
    const createPassenger = () => {
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
        type: "Adult",
        selectedSeat: "1A",
        selectedSeatType: "Standard",
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

    const infantPassengers: Passenger[] = Array.from({ length: amountOfInfantPassengers }, () => ({
      ...createPassenger(),
      type: "Infant",
    }))

    const allPassengers: Passenger[] = Array.from({ length: amountOfAdultPassengers }, () => createPassenger()).map((passenger, index) => {
      if (infantPassengers[index]) {
        return { ...passenger, infant: { ...infantPassengers[index], lastName: passenger.lastName } }
      } else {
        return passenger
      }
    })

    return allPassengers.sort((a, b) => (a.lastName > b.lastName ? 1 : -1))
  }

  const passengers = createPassengers()
  outboundFlight.passengers = passengers
  if (returnFlight) returnFlight.passengers = passengers

  const bookingFareType = arrayElement(passengers.length <= 8 ? ["Standard", "FLEXI"] : ["Standard"])
  const bookingBundle = bookingFareType !== "FLEXI" ? arrayElement(["Standard", "Standard Plus", "Essentials"]) : undefined

  const createExtras = () => {
    const hasSmallCabinBag = is(scenario.always)
    const hasLargeCabinBag = bookingFareType === "FLEXI" || bookingBundle === "Standard Plus"

    const holdBags: HoldBag[] = [
      { name: "15kg Hold Bag", weight: 15, amount: 0 },
      {
        name: "23kg Hold Bag",
        weight: 23,
        amount: bookingFareType === "FLEXI" || bookingBundle === "Essentials" ? 1 : is(scenario.unlikely) ? 1 : 0,
      },
      { name: "26kg Hold Bag", weight: 26, amount: 0 },
      { name: "29kg Hold Bag", weight: 29, amount: 0 },
      { name: "32kg Hold Bag", weight: 32, amount: 0 },
    ]

    const sportsEquipment: SportsEquipment[] = [
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
  outboundFlight.extras = extras
  if (returnFlight) returnFlight.extras = extras

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

  outboundFlight.passengers.forEach((passenger, passengerIndex) => {
    outboundFlight.passengers[passengerIndex] = {
      ...passenger,
      ...createSeatSelection(passenger),
    }
  })

  if (returnFlight) {
    returnFlight.passengers.forEach((passenger, passengerIndex) => {
      returnFlight.passengers[passengerIndex] = {
        ...passenger,
        ...createSeatSelection(passenger),
      }
    })
  }

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

  const holdBags = createHoldBags(outboundFlight)
  outboundFlight.extras.holdBags = holdBags
  if (returnFlight) returnFlight.extras.holdBags = holdBags

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

  const sportsEquipment = createSportsEquipment(outboundFlight)
  outboundFlight.extras.sportsEquipment = sportsEquipment
  if (returnFlight) returnFlight.extras.sportsEquipment = sportsEquipment

  const booking = {
    hasEasyJetPlus,
    bookingFareType,
    bookingBundle,
    passengers,
    outboundFlight,
    returnFlight,
    language: selectedLocale.language,
  }

  return booking
}

export type Booking = ReturnType<typeof createBooking>
