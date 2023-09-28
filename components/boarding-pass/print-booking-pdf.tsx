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

export const Section: React.FC<React.PropsWithChildren<{ className?: string; title?: string }>> = ({ className, title, children }) => {
  return (
    <div className={cn("", className)}>
      {/* <div className="mb-2 mt-4 hidden text-base font-bold text-black">{title}</div> */}
      {/* <div className="mb-4 hidden max-w-prose text-sm leading-relaxed text-black">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto cumque deleniti culpa possimus dolorum aliquid quaerat ut quos,
        dignissimos labore.
      </div> */}
      {children}
    </div>
  )
}

const Hero = () => {
  return (
    <div className="mx-auto max-w-[--page-maxWidth] flex-auto px-6 py-8 [.threshold_&]:hidden">
      <div className="grid gap-2">
        <p className="font-bold text-black">Get ready for takeoff</p>
        <h1 className="-mb-2 -mt-1 font-display text-3xl/none text-black">Your boarding passes</h1>
        <p className="max-w-prose text-base text-black">
          Review and print your boarding passes. Make sure to check all the details carefully before proceeding. If you encounter any issues, please
          contact our support team.
        </p>
        <div className="flex items-center gap-2">
          <Button mode="print-default" className="gap-2.5 bg-black text-white">
            <Icon name="mobilePrinterPrinterSolid" className="-ml-1.5 h-5 w-5" />
            Print all
          </Button>
          <Button mode="print-outline" className="gap-2.5 text-black">
            <Icon name="externalDownloadOutlined" className="-ml-1.5 h-5 w-5" />
            Save all
          </Button>
        </div>
      </div>
    </div>
  )
}

export const FlightCard = ({ flight }: { flight: Flight }) => {
  return (
    <div className={cn("overflow-hidden", cardStyles, "border-l-[6px] border-l-black")}>
      <div className="flex items-center justify-between border-b px-[--page-inset-small] py-4 text-sm/5">
        <div>
          Flight No. <span className="font-bold">{flight.number}</span>
        </div>
        <div className="font-bold text-black">{/* Flight {index + 1} of {flights.length} */}</div>
      </div>

      <div className="grid grid-cols-[1fr_max-content_1fr_0.2fr] items-center gap-12 p-[--page-inset-small]">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-black">Departing</div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold">{flight.departureAirport.name}</span>{" "}
            <span className="ml-0.5 align-text-top text-sm text-black">({flight.departureAirport.code})</span>
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
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-black">Arriving</div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold">{flight.arrivalAirport.name}</span>{" "}
            <span className="ml-0.5 align-text-top text-sm text-black">({flight.arrivalAirport.code})</span>
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
    </div>
  )
}

export const PrintBookingPdf = () => {
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
    return null
  }

  const flights = selectedFlights.map((flight) => ({
    ...flight,
    passengers: flight.passengers.filter((p) => selectedPassengers.some((sp) => sp.uid === p.uid)),
  }))

  return (
    <section className="flex-auto">
      <Hero />
      {flights.map((flight, index) => (
        <div key={index}>
          <div className="mx-auto grid min-h-[40vh] max-w-[--page-maxWidth] gap-4 px-[10mm] pb-[10mm] [.threshold_&]:min-h-[unset]">
            <Section title="Your boarding cards & bags">
              {flight.passengers.map((passenger) => (
                <div key={passenger.uid} className="my-8 first:mt-[10mm]">
                  <div className="grid gap-4">
                    <Ticket booking={booking} flight={flight} passenger={passenger} />
                    <div className="text-sm font-bold">Cabin baggage</div>
                    <div className="grid grid-cols-2 gap-2">
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
                </div>
              ))}
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

            <Alert variant="card">
              <Icon name="informationSolid" className="h-4 w-4" />
              <AlertTitle>Airport Information</AlertTitle>
              <AlertDescription className="text-sm">
                Please note that your large cabin bag is subject to space availability on board your flight. If there is no available space, your bag
                will be placed in the hold at the gate, free of charge.
              </AlertDescription>
            </Alert>

            <Section title="You may also be interested in">
              <div className={cn(cardStyles, "p-[--page-inset-small]")}>
                <Image src={Advert3Cols} alt="Advertisement" className="w-full" />
              </div>
            </Section>
          </div>
        </div>
      ))}
    </section>
  )
}
