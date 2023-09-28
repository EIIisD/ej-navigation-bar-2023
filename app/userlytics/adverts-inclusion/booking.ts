const passengers = [
  {
    uid: "k4Og2nE" as const,
    id: "U***UWQQ (I)" as const,
    gender: "male" as const,
    title: "Drs." as const,
    firstName: "Cornelis" as const,
    lastName: "Jansen" as const,
    type: "Adult" as const,
    selectedSeat: "1A" as const,
    selectedSeatType: "Standard" as const,
    hasSmallCabinBag: true as const,
    hasLargeCabinBag: false as const,
    infant: {
      uid: "WcCspYr" as const,
      id: "0***8481 (P)" as const,
      gender: "female" as const,
      title: "Drs." as const,
      firstName: "Demi" as const,
      lastName: "Jansen" as const,
      type: "Infant" as const,
      selectedSeat: "1A" as const,
      selectedSeatType: "Standard" as const,
      hasSmallCabinBag: false as const,
      hasLargeCabinBag: false as const,
    },
  },
  {
    uid: "Nc9Ojp1" as const,
    id: "8***6700 (P)" as const,
    gender: "female" as const,
    title: "Mevr." as const,
    firstName: "Lucy" as const,
    lastName: "Klein" as const,
    type: "Adult" as const,
    selectedSeat: "1A" as const,
    selectedSeatType: "Standard" as const,
    hasSmallCabinBag: true as const,
    hasLargeCabinBag: false as const,
  },
]

const extras = {
  hasSmallCabinBag: true as const,
  hasLargeCabinBag: false as const,
  holdBags: [
    { name: "Hold Bag" as const, weight: 15, amount: 0 },
    { name: "Hold Bag" as const, weight: 23, amount: 0 },
    { name: "Hold Bag" as const, weight: 26, amount: 0 },
    { name: "Hold Bag" as const, weight: 29, amount: 0 },
    { name: "Hold Bag" as const, weight: 32, amount: 0 },
  ],
  sportsEquipment: [
    { name: "Bicycle" as const, amount: 0 },
    { name: "Canoe" as const, amount: 0 },
    { name: "Sporting firearm" as const, amount: 0 },
    { name: "Golf bag" as const, amount: 0 },
    { name: "Hang glider" as const, amount: 0 },
    { name: "Skis and/or boots" as const, amount: 0 },
    { name: "Snowboard" as const, amount: 0 },
    { name: "Windsurfing board" as const, amount: 0 },
  ],
  hasSpeedyBoarding: false as const,
  hasEasyJetPlusBagDrop: true as const,
  hasFastTrackSecurity: false as const,
  hasMealDeal: false as const,
}

export const booking = {
  hasEasyJetPlus: false as const,
  bookingLabel: "FLEXI" as const,
  bookingFareType: "Standard" as const,
  bookingBundle: "Essentials" as const,
  passengers,
  flights: [
    {
      uid: "VOBJjEx" as const,
      departureDate: new Date("2023-10-03T16:49:05.231Z"),
      departureAirport: {
        name: "Luxembourg" as const,
        canonicalUrlToken: "luxembourg" as const,
        code: "LUX" as const,
        country: "Luxembourg" as const,
        countryCode: "LU" as const,
        airportGroupCode: "" as const,
        terminal: "A" as const,
      },
      arrivalDate: new Date("2023-10-04T02:49:05.231Z"),
      arrivalAirport: {
        name: "Cologne Bonn" as const,
        canonicalUrlToken: "cologne-bonn" as const,
        code: "CGN" as const,
        country: "Germany" as const,
        countryCode: "DE" as const,
        airportGroupCode: "" as const,
        terminal: "1" as const,
      },
      number: "EZY0025" as const,
      reservationNumber: "TJ9J0RI" as const,
      checkInSequenceNumber: "S300" as const,
      customerEntitlementsCode: "S2" as const,
      passengers,
      extras,
    },
  ],
  language: {
    value: "Nederlands" as const,
    locale: "nl_NL" as const,
    flag: "netherlands" as const,
  },
}
