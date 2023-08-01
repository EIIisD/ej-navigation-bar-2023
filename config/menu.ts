import { toTitleCase } from "@artsy/to-title-case"

import { languages } from "@/config/languages"
import { IconName } from "@/components/icon"
import { BookingDotComAttributionBanner, CarTrawlerAttributionBanner } from "@/components/navigation-bar/attribution-banner"
import { DialogHelpCentre } from "@/components/navigation-bar/dialog-help-centre"
import { DialogLanguageSelect } from "@/components/navigation-bar/dialog-language-select"
import { FlightTracker } from "@/components/navigation-bar/flight-tracker"
import { MarketingArea } from "@/components/navigation-bar/marketing-area"

export interface Group {
  title: string
  iconElement?: IconName
  hasVisibleLabel?: boolean
}

export interface Menu {
  id?: string
  title: string
  groups?: Group[]
  group: string
  description?: string
  items?: Menu[]
  iconElement?: IconName
  secondaryItemElement?: IconName
  flag?: string
  widgetElement?: (props: any) => JSX.Element
  attributionBannerElement?: (props: any) => JSX.Element
  dialogElement?: (props: any) => JSX.Element
  requireAuthentication?: boolean
  isHidden?: boolean
}

const flightInfoItems: Menu[] = [
  {
    title: toTitleCase(`Last minute flight deals`),
    description: "Last-minute savings",
    iconElement: "offersMoneySolid",
    group: "Flight information",
  },
  {
    title: toTitleCase(`Where can I fly?`),
    description: "Discover destinations",
    iconElement: "locationPinWorldSolid",
    group: "Flight information",
  },
  {
    title: toTitleCase(`Latest travel information`),
    description: "Up-to-date travel news",
    iconElement: "informationSolid",
    group: "Flight information",
  },
  {
    title: toTitleCase(`Airport transfers`),
    description: "Easy pre-book transfers",
    iconElement: "transferSolid",
    group: "Flight information",
  },
  {
    title: toTitleCase(`Fast Track Security`),
    description: "Save time at the airport",
    iconElement: "servicesIconFastTrackOutlined",
    group: "Flight information",
  },
  {
    title: toTitleCase(`Worldwide by easyJet`),
    description: "Connecting flights",
    iconElement: "easyjetIconSolid",
    group: "Flight information",
  },
  {
    title: toTitleCase(`Group bookings`),
    description: "Travel as a team",
    iconElement: "groupBookingSolid",
    group: "Flight information",
  },
  {
    title: toTitleCase(`Book a flight`),
    description: "Quick and easy reservations",
    iconElement: "flightsSolid",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Ski & snowboard`),
    description: "Hit the slopes hassle-free",
    iconElement: "holidayAccomodationTypeSkiingSolid",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Schedule release dates`),
    description: "Stay in the know",
    iconElement: "calendarSolid",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Cheap Flights`),
    description: "Affordable getaways",
    iconElement: "offersSavingSolid",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Inspire me`),
    description: "Travel destination ideas",
    iconElement: "searchAndMenuInspireMeOutlined",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Low Fare Finder`),
    description: "Best budget travel options",
    iconElement: "searchAndMenuAirplaneModeSolid",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Check voucher balance`),
    description: "Keep track of savings",
    iconElement: "boardAllInclusiveSolid",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Carbon emissions`),
    description: "Fly (more) eco-friendly",
    iconElement: "searchAndMenuSustainableOutlined",
    group: "Fly with us",
  },
  {
    title: toTitleCase(`Airport parking & lounges`),
    description: "Pre-book convenience",
    iconElement: "facilitiesParkingSolid",
    group: "Your essentials",
  },
  {
    title: toTitleCase(`Book tours & activities`),
    description: "Enhance your trip",
    iconElement: "holidayAccomodationTypeInspireMeSolid",
    group: "Your essentials",
  },
  {
    title: toTitleCase(`Travel insurance`),
    description: "Secure your journey",
    iconElement: "insuranceSolid",
    group: "Your essentials",
  },
  {
    title: toTitleCase(`easyJet Plus`),
    description: "Priority perks and benefits",
    iconElement: "searchAndMenuCrownOutlined",
    group: "Your essentials",
  },
  {
    title: toTitleCase(`Mobility Assistance`),
    description: "Support for easy movement",
    iconElement: "facilitiesWheelchairOutlined",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`Epilepsy Passenger Support`),
    description: "Help for those with epilepsy",
    iconElement: "facilitiesWheelchairOutlined",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`Wheelchair Support`),
    description: "Reliable assistance on board",
    iconElement: "facilitiesWheelchairOutlined",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`Assistance Dog Travel`),
    description: "Travelling with service animals",
    iconElement: "facilitiesPetsSolid",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`Visual Impairment Help`),
    description: "Assistance for visually impaired",
    iconElement: "helpSolid",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`Assisted Seat Selection`),
    description: "Support in choosing your seat",
    iconElement: "seatsSideSolid",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`In-flight Support`),
    description: "Assistance during the flight",
    iconElement: "flightTakeoffSolid",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`Hearing Impairment Aid`),
    description: "Support for those with hearing loss",
    iconElement: "helpSolid",
    group: "Special assistance",
  },
  {
    title: toTitleCase(`Cognitive Disability Aid`),
    description: "Easy to understand support",
    iconElement: "helpSolid",
    group: "Special assistance",
  },
]

const holidaysItems: Menu[] = [
  {
    title: toTitleCase(`easyJet Holidays`),
    description: "Your one-stop holiday shop",
    iconElement: "easyjetIconSolid",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`Low deposits from £60pp`),
    description: "Secure your holiday with low deposits",
    iconElement: "depositSolid",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`Refund Guarantee`),
    description: "Travel confidently with our refund guarantee",
    iconElement: "checkmarkCircleSolid",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`Best Price Guarantee`),
    description: "Get the best price with our guarantee",
    iconElement: "offersMoneySolid",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`Easy ways to pay`),
    description: "Flexible payment options for your convenience",
    iconElement: "paymentsSolid",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`Freedom to change`),
    description: "Modify your booking with ease",
    iconElement: "editChangeEditSolid",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`ATOL protected`),
    description: "Your holiday is fully protected",
    iconElement: "atolOutlined",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`23kg bag included`),
    description: "Enjoy a generous luggage allowance",
    iconElement: "luggageBagsCabinBagSolid",
    group: "Why easyJet holidays?",
  },
  {
    title: toTitleCase(`Package Holidays`),
    iconElement: "holidayAccomodationTypeVillaSolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`City Breaks`),
    iconElement: "holidayAccomodationTypeCitySolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`All Inclusive Holidays`),
    iconElement: "boardAllInclusiveSolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`Family Holidays`),
    iconElement: "familySolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`Adults & Couples Holidays`),
    iconElement: "holidayAccomodationTypeAdultsOnlySolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`Self Catering Holidays`),
    iconElement: "boardSelfCateringSolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`Summer Holidays`),
    iconElement: "holidayAccomodationTypeBeachSolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`Winter Holidays`),
    iconElement: "holidayAccomodationTypeWinterOutlined",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`James Villa Holidays`),
    iconElement: "holidayAccomodationTypeVillaSolid",
    group: "Holiday Types",
  },
  {
    title: toTitleCase(`Turkey Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Greece Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Spain Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Portugal Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Tenerife Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Majorca Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Amsterdam Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Paris Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Barcelona Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Rome Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Krakow Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
  {
    title: toTitleCase(`Prague Holidays`),
    iconElement: "locationPinLocationSolid",
    group: "Top Holiday Destinations",
  },
]

const businessItems: Menu[] = [
  {
    title: toTitleCase(`Business Travel`),
    description: `Simplify your business trips`,
    iconElement: "busSolid",
    group: "Business by easyJet",
  },
  {
    title: toTitleCase(`Flexi Fares`),
    description: `Enjoy greater flexibility for your travels`,
    iconElement: "calendarFlexiFlightsSolid",
    group: "Business by easyJet",
  },
  {
    title: toTitleCase(`Distribution charter`),
    description: `Learn about our distribution commitments`,
    iconElement: "locationPinLocationPinWorldwideSolid",
    group: "Business by easyJet",
  },
  {
    title: toTitleCase(`Group bookings`),
    description: `Organize group travel with ease`,
    iconElement: "groupBookingSolid",
    group: "Business by easyJet",
  },
  {
    title: toTitleCase(`Mobile boarding pass`),
    description: `Check-in conveniently on your mobile`,
    iconElement: "mobilePrinterMobileBookingOutlined",
    group: "Everything you need",
  },
  {
    title: toTitleCase(`easyJet plus`),
    description: `Benefit from exclusive perks and services`,
    iconElement: "searchAndMenuCrownOutlined",
    group: "Everything you need",
  },
  {
    title: toTitleCase(`Airport lounges`),
    description: `Relax in comfort before your flight`,
    iconElement: "servicesIconAirportLoungeSolid",
    group: "Everything you need",
  },
  {
    title: toTitleCase(`Earlier flight change`),
    description: `Modify your flight time effortlessly`,
    iconElement: "editChangeEditSolid",
    group: "Everything you need",
  },
  {
    title: toTitleCase(`Fast track`),
    description: `Breeze through airport security`,
    iconElement: "servicesIconFastTrackOutlined",
    group: "Everything you need",
  },
  {
    title: toTitleCase(`Flight Tracker`),
    description: `Track your flight in real-time`,
    iconElement: "flightTrackerSolid",
    group: "Everything you need",
  },
  {
    title: toTitleCase(`easyJet mobile app`),
    description: `Travel smarter with our handy app`,
    iconElement: "phoneSolid",
    group: "Everything you need",
  },
  {
    title: toTitleCase(`Latest travel info`),
    description: `Stay updated on the latest travel news`,
    iconElement: "informationSolid",
    group: "Keep up to date",
  },
  {
    title: toTitleCase(`Where we fly`),
    description: `Discover our flight routes`,
    iconElement: "locationPinRouteSolid",
    group: "Keep up to date",
  },
  {
    title: toTitleCase(`Airport Parking and Hotel Parking`),
    description: `Pre-book airport and hotel parking`,
    iconElement: "facilitiesParkingSolid",
    group: "Keep up to date",
  },
  {
    title: toTitleCase(`Holiday Extras Airport Transfers`),
    description: `Arrange seamless airport transfers`,
    iconElement: "transferSolid",
    group: "Keep up to date",
  },
  {
    title: toTitleCase(`Private airport Transfers`),
    description: `Book convenient private transfers`,
    iconElement: "taxiSolid",
    group: "Keep up to date",
  },
  {
    title: toTitleCase(`Hotels`),
    description: `Find the perfect hotel for your business trip`,
    iconElement: "holidayAccomodationTypeHotelSolid",
    group: "Keep up to date",
  },
  {
    title: toTitleCase(`Car Rental`),
    description: `Rent a car for your business needs`,
    iconElement: "carSolid",
    group: "Keep up to date",
  },
]

const carsTransfersItems: Menu[] = [
  {
    title: toTitleCase(`All car rental deals`),
    description: `Explore our range of car rental deals`,
    iconElement: "taxiOutlined",
    group: "Car Rental",
  },
  {
    title: toTitleCase(`Great cars in top destinations`),
    description: `Rent a car in popular destinations`,
    iconElement: "taxiSolid",
    group: "Car Rental",
  },
  {
    title: toTitleCase(`Help and info`),
    description: `Access helpful information and support`,
    iconElement: "helpSolid",
    group: "Car Rental",
  },
  {
    title: toTitleCase(`Holiday Extras Transfers`),
    description: `Book hassle-free airport transfers`,
    iconElement: "transferSolid",
    group: "Airport Transfers",
  },
  {
    title: toTitleCase(`HolidayTaxis Airport Transfers`),
    description: `Arrange reliable airport transfers`,
    iconElement: "taxiSolid",
    group: "Airport Transfers",
  },
  {
    title: toTitleCase(`Airport Hotels and Parking`),
    description: `Convenient airport hotel and parking options`,
    iconElement: "facilitiesLocalHotelSolid",
    group: "Parking",
  },
]

const bookingDotComItems: Menu[] = [
  {
    title: toTitleCase(`New deals listed every day`),
    description: `Find fresh deals daily`,
    iconElement: "calendarDateRangeSolid",
    group: "Why book with us?",
  },
  {
    title: toTitleCase(`We Price Match`),
    description: `Benefit from our Price Match Guarantee`,
    iconElement: "offersPromocodePriceTagSolid",
    group: "Why book with us?",
  },
  {
    title: `Booking.com`,
    description: `Trusted accommodation provider`,
    iconElement: "holidayAccomodationTypeHotelSolid",
    group: "Why book with us?",
  },
  {
    title: toTitleCase(`Hotels`),
    description: `Book quality hotels worldwide`,
    iconElement: "facilitiesLocalHotelSolid",
    group: "Accommodation",
  },
  {
    title: toTitleCase(`Apartments`),
    description: `Explore comfortable apartment options`,
    iconElement: "holidayAccomodationTypeHomeSolid",
    group: "Accommodation",
  },
  {
    title: toTitleCase(`Villas`),
    description: `Choose luxury villas for your stay`,
    iconElement: "holidayAccomodationTypeVillaSolid",
    group: "Accommodation",
  },
  {
    title: toTitleCase(`Hostels`),
    description: `Uncover budget-friendly hostel picks`,
    iconElement: "holidayAccomodationTypeBoutiqueSolid",
    group: "Accommodation",
  },
  {
    title: toTitleCase(`Bed & Breakfast`),
    description: `Book cozy bed and breakfasts`,
    iconElement: "boardBAndBSolid",
    group: "Accommodation",
  },
  {
    title: toTitleCase(`Resorts`),
    description: `Indulge in luxurious resort stays`,
    iconElement: "holidayAccomodationTypeBeachSolid",
    group: "Accommodation",
  },
  {
    title: toTitleCase(`Hotels in Amsterdam`),
    iconElement: "locationPinLocationSolid",
    group: "Top hotel destinations",
  },
  {
    title: toTitleCase(`Hotels in London`),
    iconElement: "locationPinLocationSolid",
    group: "Top hotel destinations",
  },
  {
    title: toTitleCase(`Hotels in Barcelona`),
    iconElement: "locationPinLocationSolid",
    group: "Top hotel destinations",
  },
  {
    title: toTitleCase(`Hotels in Paris`),
    iconElement: "locationPinLocationSolid",
    group: "Top hotel destinations",
  },
  {
    title: toTitleCase(`Hotels in Berlin`),
    iconElement: "locationPinLocationSolid",
    group: "Top hotel destinations",
  },
  {
    title: toTitleCase(`Hotels in Edinburgh`),
    iconElement: "locationPinLocationSolid",
    group: "Top hotel destinations",
  },
]

export const menu: Menu = {
  title: "Menu",
  groups: [{ title: "Menu" }, { title: "Account", hasVisibleLabel: false }],
  group: "Menu",
  items: [
    {
      title: "Flight info",
      groups: [{ title: "Flight info" }],
      group: "Menu",
      secondaryItemElement: "searchAndMenuAirplaneModeAltSolid",
      widgetElement: FlightTracker,
      items: [
        {
          title: "Flight information",
          description: `Access comprehensive flight details and travel essentials`,
          iconElement: "flightTrackerSolid",
          groups: [{ title: "Flight information" }],
          group: "Flight info",
          items: flightInfoItems.filter(({ group }) => group.includes("Flight information")),
        },
        {
          title: "Fly with us",
          description: `Browse flights, great offers, and find inspiration`,
          iconElement: "flightsSolid",
          groups: [{ title: "Fly with us" }],
          group: "Flight info",
          items: flightInfoItems.filter(({ group }) => group.includes("Fly with us")),
        },
        {
          title: "Your essentials",
          description: `Find services and support for a seamless travel experience`,
          iconElement: "luggageIconSolid",
          groups: [{ title: "Your essentials" }],
          group: "Flight info",
          items: flightInfoItems.filter(({ group }) => group.includes("Your essentials")),
        },
        {
          title: "Special assistance",
          description: `Discover tailored assistance for a comfortable journey`,
          iconElement: "facilitiesWheelchairOutlined",
          groups: [
            {
              title: "Special assistance",
              iconElement: "facilitiesWheelchairOutlined",
            },
          ],
          group: "Flight info",
          items: flightInfoItems.filter(({ group }) => group.includes("Special assistance")),
        },
      ],
    },
    {
      title: "Holidays",
      groups: [{ title: "Holidays" }],
      group: "Menu",
      widgetElement: MarketingArea,
      items: [
        {
          title: "Why easyJet holidays?",
          description: `Enjoy stress-free holidays with exclusive deals, no hidden charges`,
          iconElement: "informationSolid",
          groups: [{ title: "Why easyJet holidays?" }],
          group: "Holidays",
          items: holidaysItems.filter(({ group }) => group.includes("Why easyJet holidays?")),
        },
        {
          title: "Holiday Types",
          description: `Explore holiday options - from beach escapes to city breaks, we have it all`,
          iconElement: "holidayAccomodationTypeOutlined",
          groups: [{ title: "Holiday Types" }],
          group: "Holidays",
          items: holidaysItems.filter(({ group }) => group.includes("Holiday Types")),
        },
        {
          title: "Top Holiday Destinations",
          description: `Get inspired by browsing our highly recommended holiday destinations`,
          iconElement: "locationPinWorldSolid",
          groups: [{ title: "Top Holiday Destinations" }],
          group: "Holidays",
          items: holidaysItems.filter(({ group }) => group.includes("Top Holiday Destinations")),
        },
      ],
    },
    {
      title: "Cars/Transfers",
      groups: [{ title: "Cars/Transfers" }],
      group: "Menu",
      widgetElement: MarketingArea,
      attributionBannerElement: CarTrawlerAttributionBanner,
      items: [
        {
          title: "Car Rental",
          description: `Access a wide range of vehicles for hire at competitive prices, across the globe`,
          iconElement: "carSolid",
          groups: [{ title: "Car Rental" }],
          group: "Cars/Transfers",
          attributionBannerElement: CarTrawlerAttributionBanner,
          items: carsTransfersItems.filter(({ group }) => group.includes("Car Rental")),
        },
        {
          title: "Airport Transfers",
          description: `Ensure a hassle-free journey with our reliable and convenient transfer service`,
          iconElement: "transferSolid",
          groups: [{ title: "Airport Transfers" }],
          group: "Cars/Transfers",
          attributionBannerElement: CarTrawlerAttributionBanner,
          items: carsTransfersItems.filter(({ group }) => group.includes("Airport Transfers")),
        },
        {
          title: "Parking",
          description: `Discover a wide variety of parking options, ensuring peace of mind before your flight`,
          iconElement: "facilitiesParkingSolid",
          groups: [{ title: "Parking" }],
          group: "Cars/Transfers",
          attributionBannerElement: CarTrawlerAttributionBanner,
          items: carsTransfersItems.filter(({ group }) => group.includes("Parking")),
        },
      ],
    },
    {
      title: "Business",
      groups: [{ title: "Business" }],
      group: "Menu",
      widgetElement: MarketingArea,
      items: [
        {
          title: "Business by easyJet",
          description: `Taking business travel to new heights with corporate-friendly services and offers`,
          iconElement: "groupBookingSolid",
          groups: [{ title: "Business by easyJet" }],
          group: "Business",
          items: businessItems.filter(({ group }) => group.includes("Business by easyJet")),
        },
        {
          title: "Everything you need",
          description: `From travel insurance to inflight services, find all your travel necessities in one place`,
          iconElement: "listsFiltersFiltersSolid",
          groups: [{ title: "Everything you need" }],
          group: "Business",
          items: businessItems.filter(({ group }) => group.includes("Everything you need")),
        },
        {
          title: "Keep up to date",
          description: `Join our newsletter for the latest updates, exclusive deals, and travel inspiration`,
          iconElement: "mailSolid",
          groups: [{ title: "Keep up to date" }],
          group: "Business",
          items: businessItems.filter(({ group }) => group.includes("Keep up to date")),
        },
      ],
    },
    {
      title: "Booking.com",
      groups: [{ title: "Booking.com" }],
      group: "Menu",
      widgetElement: MarketingArea,
      attributionBannerElement: BookingDotComAttributionBanner,
      items: [
        {
          title: "Why book with us?",
          description: `Experience affordable and convenient travel options tailored to your needs`,
          iconElement: "informationSolid",
          groups: [{ title: "Why book with us?" }],
          group: "Booking.com",
          attributionBannerElement: BookingDotComAttributionBanner,
          items: bookingDotComItems.filter(({ group }) => group.includes("Why book with us")),
        },
        {
          title: "Accommodation",
          description: `Choose from a vast selection of hotels and accommodations suitable for all budgets`,
          iconElement: "holidayAccomodationTypeHotelSolid",
          groups: [{ title: "Accommodation" }],
          group: "Booking.com",
          attributionBannerElement: BookingDotComAttributionBanner,
          items: bookingDotComItems.filter(({ group }) => group.includes("Accommodation")),
        },
        {
          title: "Top hotel destinations",
          description: `Discover the best destinations for your overnight stays and enjoy the comfort of our partner hotels`,
          iconElement: "facilitiesLocalHotelSolid",
          groups: [{ title: "Top hotel destinations" }],
          group: "Booking.com",
          attributionBannerElement: BookingDotComAttributionBanner,
          items: bookingDotComItems.filter(({ group }) => group.includes("Top hotel destinations")),
        },
      ],
    },
    {
      title: toTitleCase(`View Bookings`),
      group: "Account",
      items: [],
      requireAuthentication: true,
    },
    {
      title: toTitleCase(`My Account`),
      group: "Account",
      items: [],
      requireAuthentication: true,
    },
    {
      title: toTitleCase(`Book Bags and Seats`),
      group: "Account",
      items: [],
      requireAuthentication: true,
    },
    {
      title: toTitleCase(`Change Flight`),
      group: "Account",
      items: [],
      requireAuthentication: true,
    },
    { title: toTitleCase(`Manage bookings`), group: "Account", items: [] },
    { title: toTitleCase(`Check in`), group: "Account", items: [] },
    {
      title: toTitleCase(`Help`),
      group: "Account",
      dialogElement: DialogHelpCentre,
      items: [],
    },
    {
      id: "language-select",
      title: languages[0].value,
      flag: languages[0].flag,
      group: "Account",
      dialogElement: DialogLanguageSelect,
      items: [],
    },
    {
      id: "sign-out",
      title: toTitleCase(`Sign out`),
      group: "Account",
      items: [],
      requireAuthentication: true,
    },
  ],
}
