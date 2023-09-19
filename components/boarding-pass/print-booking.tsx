"use client"

import React from "react"
import Image from "next/image"
import { default as Advert3Cols } from "@/public/media/advert-3-cols.jpg"
import { format } from "date-fns"

import { Booking, createBooking, formatPassengerTitle, type Flight, type Luggage } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Loading } from "@/components/ui/loading"
import { Placeholder } from "@/components/ui/placeholder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-stepper"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { Ticket } from "@/components/boarding-pass/ticket"
import { Icon, type IconName } from "@/components/icon"

const fillEmptyColumns = (items: Luggage[], columns: number): Luggage[] => {
  const remainder = items.length % columns

  const emptyItems = Array(remainder ? columns - remainder : 0)
    .fill({})
    .map(() => ({
      name: "Empty",
      weight: 0,
      amount: 0,
    }))

  return [...items, ...emptyItems]
}

const cardStyles = "bg-white shadow rounded-[6px] outline outline-1 outline-black/5"

const FlightIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 56 29" className={cn(className)}>
      <ellipse cx="53.2893" cy="14.5622" rx="2.13158" ry="2.27068" fill="currentColor" />
      <ellipse cx="2.13158" cy="14.5622" rx="2.13158" ry="2.27068" fill="currentColor" />
      <line x1="4.26318" y1="14.8184" x2="51.1579" y2="14.8184" stroke="currentColor" strokeDasharray="2 2" />
      <path
        d="M24.0897 28.9404C24.5796 28.9404 25.0287 28.6528 25.3009 28.1988L31.6838 16.8321L39.169 16.8321C40.2986 16.8321 41.2104 15.818 41.2104 14.5617C41.2104 13.3055 40.2986 12.2915 39.169 12.2915L31.6838 12.2915L25.3009 0.924726C25.0423 0.470663 24.5796 0.183105 24.0897 0.183105C23.137 0.183105 22.4429 1.21228 22.7287 2.24149L25.5595 12.2915L18.0743 12.2915L16.237 9.56709C16.1145 9.37033 15.9104 9.26437 15.6926 9.26437L14.8897 9.26437C14.4405 9.26437 14.1139 9.74872 14.2364 10.2331L15.3524 14.5617L14.2364 18.8905C14.1139 19.3748 14.4405 19.8592 14.8897 19.8592L15.6926 19.8592C15.9104 19.8592 16.1145 19.7532 16.237 19.5564L18.0743 16.8321L25.5595 16.8321L22.7287 26.882C22.4429 27.9112 23.137 28.9404 24.0897 28.9404Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Section: React.FC<React.PropsWithChildren<{ className?: string; title?: string }>> = ({ className, title, children }) => {
  return (
    <div className={cn("", className)}>
      <div className="mb-2 mt-8 text-base font-bold text-primary">{title}</div>
      <div className="mb-6 max-w-prose text-sm leading-relaxed text-secondary">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque deleniti culpa possimus dolorum aliquid quaerat ut quos,
        dignissimos labore.
      </div>
      {children}
    </div>
  )
}

const Hero = () => {
  return (
    <div className="mx-auto max-w-[--page-maxWidth] flex-auto px-[--page-inset]">
      <div className="grid gap-6 py-16">
        <p className="font-bold">Get ready for takeoff</p>

        <h1 className="-mb-3 -mt-1 font-display text-5xl/none text-primary">Your boarding passes</h1>

        <p className="max-w-prose text-base text-secondary">
          Review and print your boarding passes. Make sure to check all the details carefully before proceeding. If you encounter any issues, please
          contact our support team.
        </p>

        {/* <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm">
        <Icon name="flightTakeoffSolid" className="h-5 w-5" /> Flights <Badge>{selectedFlights.length}</Badge>
      </div>
      <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-1.5 text-sm">
        <Icon name="usersSolid" className="h-5 w-5 scale-[75%]" /> Passengers <Badge>{selectedPassengers.length}</Badge>
      </div>
    </div> */}

        {/* <Link className="mt-3 gap-2 font-bold">
        How to use an Airport
        <Icon name="lucideArrowRight" className="h-4 w-4" />
      </Link> */}

        <div className="flex items-center gap-2">
          <Button className="gap-2.5">
            <Icon name="mobilePrinterPrinterSolid" className="-ml-1.5 h-5 w-5" />
            Print all
          </Button>
          <Button mode="outline" className="gap-2.5">
            <Icon name="externalDownloadOutlined" className="-ml-1.5 h-5 w-5" />
            Save all
          </Button>
          {/* <Button mode="outline" className="gap-2.5">
          <Icon name="editChangeEditOutlined" className="-ml-1.5 h-5 w-5" />
          Edit
        </Button> */}
        </div>
      </div>
    </div>
  )
}

const TabButton = ({ flight }: { flight: Flight }) => {
  return (
    <>
      <span className="flex w-full items-start px-6 py-5 pl-7 text-base">
        <span className="shrink-0">
          <span className="relative flex h-12 w-12 items-center justify-center rounded-md bg-[--highlight-bg] text-center font-display tracking-wide text-[--highlight-fg]">
            <div className="absolute inset-0 rounded-md border border-black/5" />
            <div className="absolute inset-px rounded-md border-t border-white/20" />
            <span className="translate-x-[0.75px] translate-y-0.5 scale-[90%]">
              <div className="text-3xl/none">{format(flight.departureDate, "dd")}</div>
              <div className="-mt-1 text-xl/none">{format(flight.departureDate, "MMM").toUpperCase()}</div>
            </span>
          </span>
        </span>
        <span className="ml-4 mt-1.5 flex min-w-0 flex-col">
          <span className="line-clamp-1 text-base/5 font-bold text-[--primary]">
            {flight.departureAirport.name} <span className="text-xs/5 font-normal text-[--secondary]">({flight.departureAirport.code})</span>
          </span>
          <span className="text-sm/5 text-[--secondary]">
            {flight.number} • {format(flight.departureDate, "HH:mm")}
          </span>
        </span>
      </span>
      <div className="absolute inset-0 hidden w-3 lg:block">
        <svg className="h-full w-full text-gray-200" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
          <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </>
  )
}

export const FlightCard = ({ flight }: { flight: Flight }) => {
  return (
    <div className={cn("overflow-hidden", cardStyles, "border-l-[6px] border-l-green-600")}>
      <div className="flex items-center justify-between border-b px-[--page-inset-small] py-4 text-sm/5">
        <div>
          Flight No. <span className="font-bold">{flight.number}</span>
        </div>
        <div className="font-bold text-green-600">{/* Flight {index + 1} of {flights.length} */}</div>
      </div>

      <div className="grid grid-cols-[1fr_max-content_1fr_0.2fr] items-center gap-12 p-[--page-inset-small]">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-secondary">Departing</div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold">{flight.departureAirport.name}</span>{" "}
            <span className="ml-0.5 align-text-top text-sm text-secondary">({flight.departureAirport.code})</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span>{format(flight.departureDate, "EEE d MMMM yyyy 'at' HH:mm")}</span>
            {flight.departureAirport.terminal && (
              <>
                <span>•</span>
                <span>Terminal {flight.departureAirport.terminal}</span>
              </>
            )}
          </div>
        </div>
        <FlightIcon className="w-16 text-gray-300" />
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-secondary">Arriving</div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold">{flight.arrivalAirport.name}</span>{" "}
            <span className="ml-0.5 align-text-top text-sm text-secondary">({flight.arrivalAirport.code})</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span>{format(flight.arrivalDate, "EEE d MMMM yyyy 'at' HH:mm")}</span>
            {flight.arrivalAirport.terminal && (
              <>
                <span>•</span>
                <span>Terminal {flight.arrivalAirport.terminal}</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="p-[--page-inset-small] pt-0 text-sm text-secondary">Bag drop opens at 04:00 and closes at 06:00</div>
    </div>
  )
}

export const PrintBooking = () => {
  const { selectedPassengers, selectedFlights, booking, ...printBookingContext } = usePrintBookingContext()

  React.useEffect(() => {
    const newBooking = createBooking()
    printBookingContext.setBooking(newBooking)
    printBookingContext.setSelectedPassengers(newBooking.passengers)
    printBookingContext.setSelectedFlights(newBooking.flights)
    console.log(newBooking)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "r" && !shiftKey && !metaKey) {
      const newBooking = createBooking()
      printBookingContext.setBooking(newBooking)
      printBookingContext.setSelectedPassengers(newBooking.passengers)
      printBookingContext.setSelectedFlights(newBooking.flights)
      console.log(newBooking)
    }
  })

  if (selectedPassengers.length === 0) {
    return (
      <div className="grid flex-auto place-items-center">
        <Loading />
      </div>
    )
  }

  const flights = selectedFlights.map((flight) => ({
    ...flight,
    passengers: flight.passengers.filter((p) => selectedPassengers.some((sp) => sp.uid === p.uid)),
  }))

  return (
    <section className="flex-auto max-md:[&_*]:hidden">
      <Hero />
      <Tabs defaultValue="0" className="bg-gray-100/75">
        {flights.length > 1 && (
          <>
            <svg className="h-px w-full bg-gray-100 fill-none text-gray-100">
              <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="currentColor" vectorEffect="non-scaling-stroke" stroke-dasharray="9 6" />
            </svg>
            <div className="sticky top-[--header-height] z-10 bg-white shadow-xl shadow-black/[2%]">
              <div className="mx-auto max-w-[--page-maxWidth] px-[--page-inset]">
                <TabsList className="border-r">
                  {flights.map((flight, index) => (
                    <TabsTrigger key={index} value={index.toString()}>
                      <TabButton flight={flight} />
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
          </>
        )}

        {flights.map((flight, index) => (
          <TabsContent key={index} value={index.toString()}>
            <div className="h-[--page-inset-small]" />
            <div className="mx-auto grid min-h-[40vh] max-w-[--page-maxWidth] gap-4 px-[--page-inset] py-6 pb-16">
              <Alert variant="card">
                <Icon name="informationSolid" className="h-4 w-4" />
                <AlertTitle>Airport Information</AlertTitle>
                <AlertDescription className="text-sm">
                  Please note that your large cabin bag is subject to space availability on board your flight. If there is no available space, your
                  bag will be placed in the hold at the gate, free of charge.
                </AlertDescription>
              </Alert>
              <Section title="Your boarding cards & bags">
                <Accordion className={cn("overflow-hidden", cardStyles)} type="single" collapsible>
                  {flight.passengers.map((passenger) => (
                    <AccordionItem key={passenger.uid} value={passenger.uid}>
                      <AccordionTrigger>
                        <div className="flex items-center">
                          <div className="text-base/5">
                            <div className="flex w-full items-baseline justify-between gap-[--page-inset-small]">
                              {formatPassengerTitle(passenger)}
                            </div>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-6 pb-6">
                          {/* <FlightCard flight={flight} /> */}
                          <Ticket booking={booking} flight={flight} passenger={passenger} />
                          <div>Cabin baggage</div>
                          <div className="grid grid-cols-2 gap-4">
                            {passenger.hasSmallCabinBag ? (
                              <div className="flex flex-col overflow-hidden rounded-md border">
                                <header className="flex items-center gap-4 border-b p-4">
                                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange text-white">
                                    <Icon name="smallCabinBag" className="h-12 w-12" />
                                  </div>
                                  <div>
                                    <div>
                                      1 x <span className="font-bold">small</span> cabin bag
                                    </div>
                                  </div>
                                </header>
                                <div className="flex-auto divide-y p-4">
                                  <div className="flex h-12 items-center justify-between">
                                    <span className="text-secondary">Dimensions</span> <span>Max. 45 x 36 x 20 cm</span>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <span className="text-secondary">Weight</span> <span>You must be able to carry it</span>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <span className="text-secondary">Stored</span> <span>Under your seat</span>
                                  </div>
                                </div>
                                <div className="border-t p-4 py-3">
                                  <Link className="ml-auto flex max-w-max text-sm/4">
                                    <Icon name="informationSolid" className="h-4 w-4" />
                                    <span>Bag details</span>
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <Placeholder className="!h-auto opacity-0" />
                            )}
                            {passenger.hasLargeCabinBag ? (
                              <div className="flex flex-col overflow-hidden rounded-md border">
                                <header className="flex items-center gap-4 border-b p-4">
                                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange text-white">
                                    <Icon name="largeCabinBag" className="h-12 w-12" />
                                  </div>
                                  <div>
                                    <div>
                                      1 x <span className="font-bold">large</span> cabin bag
                                    </div>
                                    {booking.bookingFareType === "FLEXI" ? (
                                      <Badge variant="secondary">Included with FLEXI</Badge>
                                    ) : booking.bookingBundle === "Standard Plus" ? (
                                      <Badge variant="secondary">Included with Standard Plus</Badge>
                                    ) : null}
                                  </div>
                                </header>
                                <div className="flex-auto divide-y p-4">
                                  <div className="flex h-12 items-center justify-between">
                                    <span className="text-secondary">Dimensions</span> <span>Max. 56 x 45 x 25 cm</span>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <span className="text-secondary">Weight</span> <span>Max. 15kg</span>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <span className="text-secondary">Stored</span> <span>In an overhead locker</span>
                                  </div>
                                </div>
                                <div className="border-t p-4 py-3">
                                  <Link className="ml-auto flex max-w-max text-sm/4">
                                    <Icon name="informationSolid" className="h-4 w-4" />
                                    <span>Bag details</span>
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <Placeholder className="!h-auto opacity-0" />
                            )}
                          </div>
                          <Alert>
                            <Icon name="informationSolid" className="h-4 w-4" />
                            <AlertTitle>Baggage Information</AlertTitle>
                            <AlertDescription>
                              Please note that your large cabin bag is subject to space availability on board your flight. If there is no available
                              space, your bag will be placed in the hold at the gate, free of charge.
                            </AlertDescription>
                          </Alert>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Section>

              {!![...flight.extras.holdBags.filter((item) => item.amount), ...flight.extras.sportsEquipment.filter((item) => item.amount)].length && (
                <Section title="Your hold luggage">
                  <div className={cn(cardStyles, "grid gap-6 p-[--page-inset-small]")}>
                    <div className="grid grid-cols-3 gap-4">
                      {fillEmptyColumns(
                        [...flight.extras.holdBags.filter((item) => item.amount), ...flight.extras.sportsEquipment.filter((item) => item.amount)],
                        3
                      ).map((item, itemIndex) => {
                        if (item.name !== "Empty") {
                          return (
                            <div key={itemIndex} className="flex flex-col overflow-hidden rounded-md border">
                              <header className="flex items-center gap-4 border-b p-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-orange text-white">
                                  {item.name === "Hold Bag" ? (
                                    <Icon
                                      name={
                                        {
                                          15: "holdBag15Kg" as IconName,
                                          23: "holdBag23Kg" as IconName,
                                          26: "holdBag26Kg" as IconName,
                                          29: "holdBag29Kg" as IconName,
                                          32: "holdBag32Kg" as IconName,
                                        }[item.weight as 15 | 23 | 26 | 29 | 32]
                                      }
                                      className="h-12 w-12"
                                    />
                                  ) : (
                                    <Icon
                                      name={
                                        {
                                          ["Bicycle"]: "holdLuggageLarge" as IconName,
                                          ["Canoe"]: "holdLuggageExtraLarge" as IconName,
                                          ["Sporting firearm"]: "holdLuggageSmall" as IconName,
                                          ["Golf bag"]: "holdLuggageSmall" as IconName,
                                          ["Hang glider"]: "holdLuggageExtraLarge" as IconName,
                                          ["Skis and/or boots"]: "holdLuggageSmall" as IconName,
                                          ["Snowboard"]: "holdLuggageMedium" as IconName,
                                          ["Windsurfing board"]: "holdLuggageMedium" as IconName,
                                        }[item.name]
                                      }
                                      className="h-12 w-12"
                                    />
                                  )}
                                </div>
                                <div>
                                  <div>
                                    {item.amount} x {!!item.weight && <b>{item.weight}kg</b>} {item.name}
                                  </div>
                                </div>
                              </header>
                              <div className="ml-auto p-4 py-3">
                                <Link className="flex max-w-max text-sm/4">
                                  <Icon name="informationSolid" className="h-4 w-4" />
                                  <span>Luggage details</span>
                                </Link>
                              </div>
                            </div>
                          )
                        }

                        return <Placeholder key={itemIndex} className="!h-auto opacity-0" />
                      })}
                    </div>
                    <Alert>
                      <Icon name="informationSolid" className="h-4 w-4" />
                      <AlertTitle>Baggage Information</AlertTitle>
                      <AlertDescription>
                        Please note that your large cabin bag is subject to space availability on board your flight. If there is no available space,
                        your bag will be placed in the hold at the gate, free of charge.
                      </AlertDescription>
                    </Alert>
                  </div>
                </Section>
              )}

              <Section title="Your extras">
                <div className={cn(cardStyles, "grid gap-6 p-[--page-inset-small]")}>
                  <Placeholder size="72" className="border border-blue-200">
                    Extras
                  </Placeholder>
                  <Alert variant="warning">
                    <Icon name="informationSolid" className="h-4 w-4" />
                    <AlertTitle>Warning Example</AlertTitle>
                    <AlertDescription>
                      Please note that your large cabin bag is subject to space availability on board your flight. If there is no available space,
                      your bag will be placed in the hold at the gate, free of charge.
                    </AlertDescription>
                  </Alert>
                </div>
              </Section>

              <Section title="You may also be interested in">
                <div className={cn(cardStyles, "p-[--page-inset-small]")}>
                  <Image src={Advert3Cols} alt="Advertisement" className="w-full" />
                </div>
              </Section>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
