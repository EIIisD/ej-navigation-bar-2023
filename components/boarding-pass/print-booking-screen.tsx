"use client"

import React from "react"
import Image from "next/image"
import { default as Advert3Cols } from "@/public/media/advert-3-cols.jpg"
import { format } from "date-fns"

import { createBooking, formatPassengerTitle, type Flight, type Luggage } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Loading } from "@/components/ui/loading"
import { Placeholder } from "@/components/ui/placeholder"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-stepper"
import { DialogPrintAll } from "@/components/boarding-pass/dialog-print-all"
import { DialogSaveAll } from "@/components/boarding-pass/dialog-save-all"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { Ticket } from "@/components/boarding-pass/ticket"
import { Icon, type IconName } from "@/components/icon"
import { LOCAL_ENV } from "@/lib/env"

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

const cardStyles = "bg-white sm:shadow-lg sm:rounded-xl sm:outline sm:outline-1 sm:outline-gray-800/[0%] max-sm:-mx-[--page-inset] max-sm:border-y"

export const Section: React.FC<React.PropsWithChildren<{ className?: string; title?: string; description?: string }>> = ({
  className,
  title,
  description,
  children,
}) => {
  return (
    <div className={cn(className, "mt-6")}>
      <div className="mb-3 text-lg font-bold text-primary">{title}</div>
      <div className="mb-12 max-w-prose leading-relaxed text-secondary">
        {!!description ? (
          description
        ) : (
          <>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque deleniti culpa possimus dolorum aliquid quaerat ut quos,
            dignissimos labore.
          </>
        )}
      </div>
      {children}
    </div>
  )
}

const Hero = ({ singleFlight }: { singleFlight: boolean }) => {
  return (
    <div className={cn(singleFlight && "border-b")}>
      <div className={cn("mx-auto max-w-[--page-maxWidth] flex-auto bg-white px-[--page-inset]")}>
        <div className="grid gap-2 py-12">
          <p className="font-bold">Get ready for takeoff</p>
          {/* <p className="-mb-3 font-bold">Get ready for takeoff</p> */}

          {/* <h1 className="-mb-3.5 -mt-0.5 font-display text-6xl/none text-primary">Your boarding passes</h1> */}
          <h1 className="font-display text-6xl/none text-primary">Your boarding passes</h1>

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

          <div className="mt-4 flex items-center gap-4">
            <DialogPrintAll>
              <Button size="lg" className="gap-2.5">
                <Icon name="mobilePrinterPrinterSolid" className="-ml-1.5 h-5 w-5" />
                Print all
              </Button>
            </DialogPrintAll>
            <DialogSaveAll>
              <Button size="lg" mode="outline" className="gap-2.5">
                <Icon name="externalDownloadOutlined" className="-ml-1.5 h-5 w-5" />
                Save all
              </Button>
            </DialogSaveAll>
            {/* <Button mode="outline" className="gap-2.5">
          <Icon name="editChangeEditOutlined" className="-ml-1.5 h-5 w-5" />
          Edit
        </Button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const TabButton = ({ flight }: { flight: Flight }) => {
  return (
    <>
      <span className="w-full">
        <span className="flex w-full items-start p-4 pl-8 text-base">
          <span className="shrink-0">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-md bg-[--highlight-bg] text-center font-display tracking-wide text-[--highlight-fg]">
              <div className="absolute inset-0 rounded-md border border-black/5" />
              <div className="absolute inset-px rounded-md border-t border-white/25" />
              <span className="translate-x-[0.75px] translate-y-0.5 scale-[90%]">
                <div className="-mt-1 text-3xl/none">{format(flight.departureDate, "dd")}</div>
                <div className="-mt-0.5 font-sans text-xs/none font-bold">{format(flight.departureDate, "MMM").toUpperCase()}</div>
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

        <div className="h-[4px] w-full" />
      </span>
      <div className="absolute inset-0 hidden w-3 lg:block">
        <svg className="h-full w-full text-gray-400" viewBox="0 0 12 82" fill="none" preserveAspectRatio="none">
          <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
    </>
  )
}

export const PrintBookingScreen = () => {
  const bookingContext = usePrintBookingContext()
  const { selectedPassengers, selectedFlights, booking, ...printBookingContext } = bookingContext

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "r" && !shiftKey && !metaKey) {
      const newBooking = createBooking()
      printBookingContext.setBooking(newBooking)
      printBookingContext.setSelectedPassengers(newBooking.passengers)
      printBookingContext.setSelectedFlights(newBooking.flights)
      console.log(newBooking)
    }
  })

  const flights = selectedFlights.map((flight) => ({
    ...flight,
    passengers: flight.passengers.filter((p) => selectedPassengers.some((sp) => sp.uid === p.uid)),
  }))

  if (selectedPassengers.length === 0) {
    return (
      <div className="grid flex-auto place-items-center">
        <Loading />
      </div>
    )
  }

  return (
    <>
      <section className="flex-auto">
        <Hero singleFlight={flights.length === 1} />
        <Tabs defaultValue="0" className="bg-gray-100">
          {flights.length > 1 && (
            <>
              <div className="border-b border-gray-300" />
              <div className="sticky top-[--header-height] z-10 bg-white">
                <div className="mx-auto max-w-[--page-maxWidth] px-[--page-inset]">
                  <TabsList className="border-r border-gray-400">
                    {flights.map((flight, index) => (
                      <TabsTrigger key={index} value={index.toString()}>
                        <TabButton flight={flight} />
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                <div className="absolute inset-x-0 -bottom-px border-b border-gray-300" />
              </div>
            </>
          )}
          {flights.map((flight, index) => {
            return (
              <TabsContent key={index} value={index.toString()}>
                <div className="mx-auto grid max-w-[--page-maxWidth] gap-12 px-[--page-inset] py-12 pb-[calc(theme(spacing.12)+theme(spacing.6))]">
                  {selectedPassengers.length > 3 && (
                    <Alert variant="card">
                      <Icon name="informationSolid" className="h-4 w-4" />
                      <AlertTitle className="text-base/4">Important information about this Airport</AlertTitle>
                      <AlertDescription className="text-base leading-snug">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus enim facilis veritatis voluptates nostrum facere
                        expedita sint, iure eaque, eius non. Quo ea vero cupiditate iure porro possimus sit unde.
                      </AlertDescription>
                    </Alert>
                  )}
                  <Section
                    title="Boarding Cards & Cabin Bags"
                    description="Click to expand each passenger and view their boarding card and cabin bags. Hold luggage is shared among all passengers on the flight, regardless of ownership. Hold luggage information can be checked in the dedicated Hold luggage section."
                  >
                    <Accordion className={cn("overflow-hidden", cardStyles)} type="single" collapsible defaultValue="0">
                      {flight.passengers.map((passenger, passengerIndex) => (
                        <AccordionItem key={passengerIndex} value={passengerIndex.toString()}>
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
                              <Ticket booking={booking} flight={flight} passenger={passenger} />

                              {/* <div className="flex items-center justify-start">
                                <Share passenger={passenger} />
                              </div> */}
                              <div className={cn("grid gap-4 sm:grid-cols-2", !passenger.hasLargeCabinBag && "!grid-cols-1")}>
                                {!!passenger.hasSmallCabinBag && (
                                  <div className="flex flex-col overflow-hidden rounded-md border border-b-md">
                                    <header className="flex items-center gap-4 border-b border-b-gray-200 p-4">
                                      <ItemIcon icon="smallCabinBag" />
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
                                    <div className="border-t border-gray-200 p-4 py-3">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Link className="ml-auto flex max-w-max text-sm/4">
                                            <Icon name="informationSolid" className="h-4 w-4" />
                                            <span>Bag details</span>
                                          </Link>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                          <h3 className="flex items-center gap-2 font-bold">
                                            <Icon name="informationSolid" className="mr-2 h-4 w-4 scale-[150%] text-orange" />
                                            <span className="translate-y-[1px]">Small cabin bags</span>
                                          </h3>
                                          <hr />
                                          <ul className="list">
                                            <li>Everyone can bring one per person on board for free.</li>
                                            <li>Kept under the seat in front of you</li>
                                            <li>Maximum size 45 x 36 x 20cm (including any handles and wheels)</li>
                                            <li>The size of a handbag or rucksack, but please measure before travel</li>
                                          </ul>
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                )}
                                {!!passenger.hasLargeCabinBag && (
                                  <div className="flex flex-col overflow-hidden rounded-md border border-b-md">
                                    <header className="flex items-center gap-4 border-b border-b-gray-200 p-4">
                                      <ItemIcon icon="largeCabinBag" />
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
                                    <div className="border-t border-gray-200 p-4 py-3">
                                      <Popover>
                                        <PopoverTrigger asChild>
                                          <Link className="ml-auto flex max-w-max text-sm/4">
                                            <Icon name="informationSolid" className="h-4 w-4" />
                                            <span>Bag details</span>
                                          </Link>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                          <h3 className="flex items-center gap-2 font-bold">
                                            <Icon name="informationSolid" className="mr-2 h-4 w-4 scale-[150%] text-orange" />
                                            <span className="translate-y-[1px]">Large cabin bags</span>
                                          </h3>
                                          <hr />
                                          <ul className="list">
                                            <li>Book online in advance to avoid airport fees</li>
                                            <li>Stored in an overhead locker</li>
                                            <li>Comes with Speedy Boarding included</li>
                                            <li>Maximum size 56 x 45 x 25 cm (including any handles and wheels)</li>
                                            <li>The size of a small suitcase, but please measure before travel</li>
                                          </ul>
                                        </PopoverContent>
                                      </Popover>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <Alert>
                                <Icon name="informationSolid" className="h-4 w-4" />
                                <AlertTitle>Bags Information</AlertTitle>
                                <AlertDescription>
                                  Please note that your large cabin bag is subject to space availability on board your flight. If there is no
                                  available space, your bag will be placed in the hold at the gate, free of charge.
                                </AlertDescription>
                              </Alert>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Section>

                  {!![...flight.extras.holdBags.filter((item) => item.amount), ...flight.extras.sportsEquipment.filter((item) => item.amount)]
                    .length && (
                    <Section
                      title="Hold luggage for your flight"
                      description="Find detailed information about the hold luggage associated with your flight. Hold luggage is shared among all passengers on the flight, regardless of ownership. Please review the details of each item carefully before your departure date."
                    >
                      <div className={cn(cardStyles, "grid gap-6 p-[--page-inset-small] max-sm:py-[--page-inset-large]")}>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {fillEmptyColumns(
                            [...flight.extras.holdBags.filter((item) => item.amount), ...flight.extras.sportsEquipment.filter((item) => item.amount)],
                            3
                          ).map((item, itemIndex) => {
                            if (item.name !== "Empty") {
                              return (
                                <div key={itemIndex} className="flex flex-col overflow-hidden rounded-md border border-b-md">
                                  <header className="flex items-center gap-4 border-b border-b-gray-200 p-4">
                                    {item.name === "Hold Bag" ? (
                                      <ItemIcon
                                        icon={
                                          {
                                            15: "holdBag15Kg" as IconName,
                                            23: "holdBag23Kg" as IconName,
                                            26: "holdBag26Kg" as IconName,
                                            29: "holdBag29Kg" as IconName,
                                            32: "holdBag32Kg" as IconName,
                                          }[item.weight as 15 | 23 | 26 | 29 | 32]
                                        }
                                      />
                                    ) : (
                                      <ItemIcon
                                        icon={
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
                                      />
                                    )}
                                    <div>
                                      <div>
                                        {item.amount} x {!!item.weight && <b>{item.weight}kg</b>} {item.name}
                                      </div>
                                    </div>
                                  </header>
                                  <div className="ml-auto p-4 py-3">
                                    <Popover>
                                      <PopoverTrigger asChild>
                                        <Link className="flex max-w-max text-sm/4">
                                          <Icon name="informationSolid" className="h-4 w-4" />
                                          <span>Luggage details</span>
                                        </Link>
                                      </PopoverTrigger>
                                      <PopoverContent>
                                        <h3 className="flex items-center gap-2 font-bold">
                                          <Icon name="informationSolid" className="mr-2 h-4 w-4 scale-[150%] text-orange" />
                                          <span className="translate-y-[1px]">{item.name}</span>
                                        </h3>
                                        <hr />
                                        <ul className="list">
                                          <li>Each passenger is allowed one piece of hand luggage</li>
                                          <li>Additional luggage can be purchased at an extra cost</li>
                                          <li>Luggage size and weight restrictions apply</li>
                                          <li>Special items like sports equipment may require special handling</li>
                                        </ul>
                                        <aside className="!mt-5 rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700">
                                          This information is just for demonstration and is not accurate.
                                        </aside>
                                      </PopoverContent>
                                    </Popover>
                                  </div>
                                </div>
                              )
                            }

                            return <Placeholder key={itemIndex} className="!h-auto opacity-0" />
                          })}
                        </div>
                        <Alert>
                          <Icon name="informationSolid" className="h-4 w-4" />
                          <AlertTitle>Luggage Information</AlertTitle>
                          <AlertDescription>
                            Please note that all luggage must be checked in at least 2 hours before departure. Any luggage checked in after this time
                            may not be loaded onto the flight. Thank you for your understanding.
                          </AlertDescription>
                        </Alert>
                      </div>
                    </Section>
                  )}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </section>
      <section className="flex items-center justify-center border-t">
        <section className="grid w-full max-w-[--page-maxWidth] gap-4 self-center px-[--page-inset] py-12">
          <Section
            title="Exclusive Offers & Deals"
            description="Explore our curated selection of special offers and deals tailored for your journey. Enhance your travel experience with our exclusive services and partnerships."
            className="mt-0 w-full"
          >
            <Image src={Advert3Cols} alt="Advertisement" className="" width={2000} />
          </Section>
        </section>
      </section>
    </>
  )
}

const ItemIcon = ({ icon }: { icon: IconName }) => (
  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-orange text-white">
    <div className="absolute inset-0 rounded-[inherit] border border-black/50 mix-blend-overlay" />
    <div className="absolute inset-0 top-px rounded-[inherit] border-t border-white/50 mix-blend-overlay" />
    <Icon name={icon} className="h-10 w-10" />
  </div>
)
