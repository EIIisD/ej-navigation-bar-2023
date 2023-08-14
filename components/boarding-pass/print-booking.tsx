"use client"

import React, { type CSSProperties } from "react"
import { format } from "date-fns"

import { createBooking, Flight } from "@/config/booking"
import { arrayElements } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-large"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { Icon, type IconName } from "@/components/icon"

export const PrintBooking = () => {
  const {
    booking: { outboundFlight: flight, ...booking },
    selectedPassengers,
    ...printBookingContext
  } = usePrintBookingContext()

  const journey = [
    {
      type: "Departing",
      title: `${flight.departureAirport.code}-${flight.arrivalAirport.code} ${format(flight.departureDate, "dd MMM")}`,
      airport: flight.departureAirport,
    },
    {
      type: "Arriving",
      title: `${flight.arrivalAirport.code}-${flight.departureAirport.code} ${format(flight.departureDate, "dd MMM")}`,
      airport: flight.arrivalAirport,
    },
  ].filter(Boolean)

  const [devMode, setDevMode] = React.useState<boolean>(false)
  const [pageMode, setPageMode] = React.useState<boolean>(false)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "b") {
        const newBooking = createBooking()
        printBookingContext.setBooking(newBooking)
        printBookingContext.setSelectedPassengers(arrayElements(newBooking.passengers))
        console.log(newBooking)
      } else if (event.key === "d") {
        setDevMode(!devMode)
      } else if (event.key === "f") {
        setPageMode(!pageMode)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [printBookingContext, devMode, pageMode])

  return (
    <section
      className="flex-auto bg-white screen:mx-auto screen:w-full screen:max-w-[--page-maxWidth]"
      style={
        {
          "--dev-1": devMode ? "lch(95 20 .2turn)" : undefined,
          "--dev-2": devMode ? "lch(95 20 .6turn)" : undefined,
        } as CSSProperties
      }
    >
      <div className="mx-auto max-w-[--page-maxWidth] flex-auto bg-white p-[--page-inset]">
        <div className="space-y-2 py-[--page-inset-large]">
          <h1 className="font-display text-5xl text-primary">Your boarding passes</h1>
          <p className="text-base text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, debitis! Beatae, maiores dolorem. Ipsum dolor facere, quia, eos nisi
            exercitationem aspernatur quasi, dolore fugit natus minima officiis aperiam voluptate dicta!
          </p>
        </div>
        <Tabs defaultValue="0">
          <TabsList>
            {journey.map(({ type, title }, index) => (
              <TabsTrigger key={title} value={index.toString()}>
                <Icon
                  name={
                    {
                      Departing: "flightTakeoffSolid" as IconName,
                      Arriving: "flightLandSolid" as IconName,
                    }[type]
                  }
                  className="mr-2.5 h-6 w-6"
                />
                {title}
              </TabsTrigger>
            ))}
          </TabsList>
          {journey.map(({ type, title, airport }, index) => (
            <TabsContent key={title} value={index.toString()}>
              <div className="grid gap-16 py-8 pb-24">
                <div className="grid h-[50vh] w-full place-content-center rounded-3xl border-2 border-dashed border-blue-300">
                  <h1 className="font-bold text-blue-400">Boarding Pass</h1>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
