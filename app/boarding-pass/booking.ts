const passengers = [
  {
    uid: "j3tc3Zq" as const,
    id: "1***8310 (P)" as const,
    gender: "male" as const,
    title: "Ir." as const,
    firstName: "Boaz" as const,
    lastName: "Bijl" as const,
    type: "Adult" as const,
    selectedSeat: "1A" as const,
    selectedSeatType: "Standard" as const,
    hasSmallCabinBag: true as const,
    hasLargeCabinBag: true as const,
    infant: {
      uid: "1S4kasN" as const,
      id: "5***7833 (P)" as const,
      gender: "female" as const,
      title: "Mevr." as const,
      firstName: "Aleyna" as const,
      lastName: "Bijl" as const,
      type: "Infant" as const,
      selectedSeat: "1A" as const,
      selectedSeatType: "Standard" as const,
      hasSmallCabinBag: false as const,
      hasLargeCabinBag: false as const,
    },
  },
  {
    uid: "LMyMCZm" as const,
    id: "2***1315 (P)" as const,
    gender: "male" as const,
    title: "Dhr." as const,
    firstName: "Kjeld" as const,
    lastName: "Corsten" as const,
    type: "Adult" as const,
    selectedSeat: "1A" as const,
    selectedSeatType: "Standard" as const,
    hasSmallCabinBag: true as const,
    hasLargeCabinBag: false as const,
  },
  {
    uid: "Z2YjJTp" as const,
    id: "4***2825 (P)" as const,
    gender: "female" as const,
    title: "Dr." as const,
    firstName: "Luna" as const,
    lastName: "Dekker" as const,
    type: "Adult" as const,
    selectedSeat: "1A" as const,
    selectedSeatType: "Standard" as const,
    hasSmallCabinBag: true as const,
    hasLargeCabinBag: true as const,
    infant: {
      uid: "MmdXZTh" as const,
      id: "9***5000 (P)" as const,
      gender: "female" as const,
      title: "Bsc" as const,
      firstName: "Fiene" as const,
      lastName: "Dekker" as const,
      type: "Infant" as const,
      selectedSeat: "1A" as const,
      selectedSeatType: "Standard" as const,
      hasSmallCabinBag: false as const,
      hasLargeCabinBag: false as const,
    },
  },
]

const extras = {
  hasSmallCabinBag: true as const,
  hasLargeCabinBag: true as const,
  holdBags: [
    { name: "Hold Bag" as const, weight: 15, amount: 2 },
    { name: "Hold Bag" as const, weight: 23, amount: 1 },
    { name: "Hold Bag" as const, weight: 26, amount: 0 },
    { name: "Hold Bag" as const, weight: 29, amount: 0 },
    { name: "Hold Bag" as const, weight: 32, amount: 0 },
  ],
  sportsEquipment: [
    { name: "Bicycle" as const, amount: 1 },
    { name: "Canoe" as const, amount: 0 },
    { name: "Sporting firearm" as const, amount: 0 },
    { name: "Golf bag" as const, amount: 0 },
    { name: "Hang glider" as const, amount: 1 },
    { name: "Skis and/or boots" as const, amount: 0 },
    { name: "Snowboard" as const, amount: 1 },
    { name: "Windsurfing board" as const, amount: 0 },
  ],
  hasSpeedyBoarding: true as const,
  hasEasyJetPlusBagDrop: true as const,
  hasFastTrackSecurity: true as const,
  hasMealDeal: true as const,
}

export const booking = {
  hasEasyJetPlus: true as const,
  bookingLabel: "Standby Fare" as const,
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
