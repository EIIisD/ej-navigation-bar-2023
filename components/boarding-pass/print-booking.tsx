"use client"

import { format } from "date-fns"

import { createBooking } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
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

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "r" && !shiftKey && !metaKey) {
      const newBooking = createBooking()
      printBookingContext.setBooking(newBooking)
      printBookingContext.setSelectedPassengers(arrayElements(newBooking.passengers))
      console.log(newBooking)
    }
  })

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

  return (
    <section className="flex-auto screen:mx-auto screen:w-full screen:max-w-[--page-maxWidth]">
      <div className="mx-auto max-w-[--page-maxWidth] flex-auto p-[--page-inset]">
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
                  name={{ Departing: "flightTakeoffSolid" as IconName, Arriving: "flightLandSolid" as IconName }[type]}
                  className="mr-2.5 h-6 w-6"
                />
                {title}
              </TabsTrigger>
            ))}
          </TabsList>
          {journey.map(({ type, title, airport }, index) => (
            <TabsContent key={title} value={index.toString()}>
              <div className="grid gap-8 py-8 pb-24">
                {selectedPassengers.map((passenger) => (
                  <div className="grid h-80 w-full place-content-center rounded-3xl border-2 border-dashed border-blue-300" key={passenger.id}>
                    <div className="font-bold text-blue-400">Boarding pass:</div>
                    <div className="font-bold text-blue-400">
                      {passenger.firstName} {passenger.lastName}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
