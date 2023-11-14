"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { default as Advert3Cols } from "@/public/media/advert-3-cols.jpg"
import { format } from "date-fns"

import { createBooking, type Flight, type Luggage, type Passenger } from "@/config/booking"
import { LOCAL_ENV } from "@/lib/env"
import usePrintPage from "@/lib/use-print-page"
import usePrintStyles from "@/lib/use-print-styles"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Placeholder } from "@/components/ui/placeholder"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { Ticket } from "@/components/boarding-pass/ticket"
import { Icon, type IconName } from "@/components/icon"
import { TNums } from "@/components/tnums"

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

const luggageIconMap: Record<string, IconName> = {
  Bicycle: "holdLuggageLarge",
  Canoe: "holdLuggageExtraLarge",
  "Sporting firearm": "holdLuggageSmall",
  "Golf bag": "holdLuggageSmall",
  "Hang glider": "holdLuggageExtraLarge",
  "Skis and/or boots": "holdLuggageSmall",
  Snowboard: "holdLuggageMedium",
  "Windsurfing board": "holdLuggageMedium",
}

const weightIconMap: Record<15 | 23 | 26 | 29 | 32, IconName> = {
  15: "holdBag15Kg",
  23: "holdBag23Kg",
  26: "holdBag26Kg",
  29: "holdBag29Kg",
  32: "holdBag32Kg",
}

const PageHeader: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, className, ...props }) => (
  <header className={cn("flex items-start justify-between", className)} {...props}>
    <div className="flex flex-auto items-center justify-start gap-[--print-gap] text-left">{children}</div>
    {/* <div className="flex flex-auto items-center justify-end gap-4 text-right">{children}</div> */}

    {/* <span className="shrink-0">
      <span className="relative flex h-14 w-14 items-center justify-center rounded-md border-sm text-center font-display tracking-wide ">
        <span className="translate-x-[0.75px] translate-y-0.5 scale-[90%]">
          <div className="-mt-1 text-4xl/none ">{format(flight.departureDate, "dd")}</div>
          <div className="-mt-0.5 font-sans text-xs/none font-bold ">{format(flight.departureDate, "MMM").toUpperCase()}</div>
        </span>
      </span>
    </span> */}

    {/* <Icon name="easyJetLogo" className="h-[7.5mm] w-auto max-w-max shrink-0 [aspect-ratio:91/22]" /> */}
  </header>
)

export const PrintBookingPdf = () => {
  const bookingContext = usePrintBookingContext()
  const { selectedPassengers, selectedFlights, booking, showAdverts, ...printBookingContext } = bookingContext

  usePrintStyles()

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "r" && !shiftKey && !metaKey) {
      const newBooking = createBooking()
      printBookingContext.setBooking(newBooking)
      printBookingContext.setSelectedPassengers(newBooking.passengers)
      printBookingContext.setSelectedFlights(newBooking.flights)
      console.log(newBooking)
    }
  })

  const getSelectedFlights = (selectedFlights: Flight[], selectedPassengers: Passenger[]): Flight[] => {
    return selectedFlights.map((flight) => ({
      ...flight,
      passengers: flight.passengers.filter((p) => selectedPassengers.some((sp) => sp.uid === p.uid)),
    }))
  }

  const flights = getSelectedFlights(selectedFlights, selectedPassengers)
  const luggage = [...flights[0].extras.holdBags.filter((item) => item.amount), ...flights[0].extras.sportsEquipment.filter((item) => item.amount)]

  return (
    <main
      id="print-content"
      className={cn(
        "relative w-full"
        //--
        // "[.pdf_&]:mx-auto [.pdf_&]:max-w-[calc(210mm-10mm*2)] [.pdf_&]:py-[10mm]"
      )}
    >
      {flights.map((flight, _flightIndex) => {
        const { passengers } = flight

        const flightPassengerPagesElement = (
          <React.Fragment key={_flightIndex}>
            {passengers.map((passenger, _passengerIndex) => {
              const headerElement = (
                <PageHeader className="">
                  <div className="flex flex-col">
                    <div className="text-base font-bold">
                      {passenger.firstName} {passenger.lastName} {passenger.infant && <span>+ Infant</span>}
                    </div>
                    <div className="text-base">
                      Flight <TNums content={_flightIndex + 1} /> of <TNums content={flights.length} />
                    </div>
                  </div>
                </PageHeader>
              )

              const ticketElement = <Ticket booking={booking} flight={flight} passenger={passenger} className="" />

              const bagsTableElement = (
                <Table className="">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Storage</TableHead>
                      <TableHead>Weight</TableHead>
                      <TableHead className="text-right">Max. Dimensions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-[--print-gap-xs]">
                          <Icon name="smallCabinBag" className="-mx-2 -my-1.5 h-[--print-gap] w-[--print-gap]" />
                          <div className="whitespace-nowrap">
                            <b>1</b> × <b>small</b> cabin bag
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>It must fit under your allocated seat</TableCell>
                      <TableCell>You must be able to carry it without assistance</TableCell>
                      <TableCell className="text-right">
                        <div className="grid grid-cols-[auto_max-content] gap-x-2">
                          <TNums content="45×36×20" className="justify-self-end" />
                          <div className="min-w-[2.5ch] justify-self-start text-left">cm</div>
                          <TNums content="17.7×14.2×7.9" className="justify-self-end" />
                          <div className="min-w-[2.5ch] justify-self-start text-left">in</div>
                        </div>
                      </TableCell>
                    </TableRow>
                    {!!passenger.hasLargeCabinBag && (
                      <TableRow>
                        <TableCell>
                          <div className="flex items-center gap-[--print-gap-xs]">
                            <Icon name="largeCabinBag" className="-mx-2 -my-1 h-[--print-gap] w-[--print-gap]" />
                            <div className="whitespace-nowrap">
                              <b>1</b> × <b>large</b> cabin bag
                            </div>
                          </div>
                          {/* {booking.bookingFareType === "FLEXI" ? (
                              <Badge variant="secondary">Included with FLEXI</Badge>
                            ) : booking.bookingBundle === "Standard Plus" ? (
                              <Badge variant="secondary">Included with Standard Plus</Badge>
                            ) : null} */}
                        </TableCell>
                        <TableCell>It must fit in an overhead locker *</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1.5">Your bag must weigh 15 kg or less</div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="grid grid-cols-[auto_max-content] gap-x-2">
                            <TNums content="56×45×25" className="justify-self-end" />
                            <div className="min-w-[2.5ch] justify-self-start text-left">cm</div>
                            <TNums content="22×17.7×9.8" className="justify-self-end" />
                            <div className="min-w-[2.5ch] justify-self-start text-left">in</div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )

              const bagsAlertElement = (
                <div className="mx-[--print-gap-xs] flex gap-4">
                  <Icon name="informationSolid" className="h-4 w-4" />
                  <div>
                    <AlertTitle>Bags Information</AlertTitle>
                    <AlertDescription className="text-sm">
                      Please note that your large cabin bag is subject to space availability on board your flight. If there is no available space,
                      your bag will be placed in the hold at the gate, free of charge.
                    </AlertDescription>
                  </div>
                </div>
              )

              const flightSharedLuggageElement = !!luggage.length && (
                <>
                  <div className="flex flex-col">
                    <div className="text-base font-bold text-[--primary]">Shared hold luggage for your flight</div>
                    <div className="text-base text-[--secondary]">
                      Hold luggage is shared among all passengers on the flight, regardless of ownership.
                    </div>
                  </div>

                  <div className=" grid grid-cols-3 gap-[--print-gap-sm]">
                    {fillEmptyColumns(luggage, 3).map((item, itemIndex) => {
                      if (item.name !== "Empty") {
                        return (
                          <div key={itemIndex} className="flex flex-col overflow-hidden rounded-md border-sm border-b-md">
                            <header className="flex items-center gap-[--print-gap-xs] p-[--print-gap-xs]">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange text-white">
                                {item.name === "Hold Bag" ? (
                                  <Icon name={weightIconMap[item.weight as 15 | 23 | 26 | 29 | 32]} className="h-12 w-12" />
                                ) : (
                                  <Icon name={luggageIconMap[item.name]} className="h-12 w-12" />
                                )}
                              </div>
                              <div>
                                <div>
                                  {item.amount} x {!!item.weight && <b>{item.weight}kg</b>} {item.name}
                                </div>
                              </div>
                            </header>
                          </div>
                        )
                      }

                      return <></>
                    })}
                  </div>

                  <div className="mx-[--print-gap-xs] flex gap-4">
                    <Icon name="informationSolid" className="h-4 w-4" />
                    <div>
                      <AlertTitle>Luggage Information</AlertTitle>
                      <AlertDescription className="text-sm">
                        Please note that all luggage must be checked in at least 2 hours before departure. Any luggage checked in after this time may
                        not be loaded onto the flight. Thank you for your understanding.
                      </AlertDescription>
                    </div>
                  </div>
                </>
              )

              const advertsElement = showAdverts && <Image src={Advert3Cols} alt="Advertisement" width={2000} className="w-full" />

              return (
                <React.Fragment key={_passengerIndex}>
                  <section className="[break-after:page] [break-inside:avoid]">
                    {/* {headerElement} */}
                    {ticketElement}
                    {bagsTableElement}
                    {flightSharedLuggageElement}
                    {bagsAlertElement}
                    {showAdverts ? advertsElement : ""}
                  </section>
                  {/* {showAdverts && (
                    <section className="[break-after:page] [break-inside:avoid]">
                      <PageHeader className="">
                        <div className="flex flex-col">
                          <div className="text-base font-bold">
                            {passenger.firstName} {passenger.lastName} {passenger.infant && <span>+ Infant</span>}
                          </div>
                          <div className="text-base">
                            Flight <TNums content={_flightIndex + 1} /> of <TNums content={flights.length} />
                          </div>
                        </div>
                      </PageHeader>
                      {advertsElement}
                    </section>
                  )} */}
                  {/* <section className="[break-after:page] [break-inside:avoid]">
                    <PageHeader className="">
                      <div className="flex  flex-col">
                        <div className="text-base font-bold text-[--primary]">Exclusive Offers & Deals</div>
                        <div className="text-base">
                          Flight <TNums content={_flightIndex + 1} /> of <TNums content={flights.length} />
                        </div>
                        <div className="max-w-measure mt-4 text-base text-[--secondary]">
                          Explore our curated selection of special offers and deals tailored for your journey. Enhance your travel experience with our
                          exclusive services and partnerships.
                        </div>
                      </div>
                    </PageHeader>
                    {advertsElement}
                  </section> */}
                </React.Fragment>
              )
            })}
          </React.Fragment>
        )

        return <React.Fragment key={_flightIndex}>{flightPassengerPagesElement}</React.Fragment>
      })}

      {/* <div className="events-none absolute inset-[-10mm] hidden [outline:50vw_solid_#444] [.pdf_&]:block" /> */}
    </main>
  )
}
