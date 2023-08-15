"use client"

import { format } from "date-fns"

import { createBooking } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Placeholder } from "@/components/ui/placeholder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-large"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { Icon, type IconName } from "@/components/icon"

const Section: React.FC<React.PropsWithChildren<{ title?: string; className?: string; containerClassName?: string }>> = ({
  title,
  className,
  containerClassName,
  children,
}) => (
  <div className={cn("grid gap-4", className)}>
    {title && <div className="font-display text-4xl text-primary">{title}</div>}
    <div className={containerClassName}>{children}</div>
  </div>
)

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
      printBookingContext.setSelectedPassengers(newBooking.passengers)
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
        <div className="py-[--page-inset-large]">
          <h1 className="font-display text-5xl text-primary">Your boarding passes</h1>
          <p className="mt-4 max-w-prose text-base text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, debitis! Beatae, maiores dolorem. Ipsum dolor facere, quia, eos nisi
            exercitationem aspernatur quasi, dolore fugit natus minima officiis aperiam voluptate dicta!
          </p>
          <div className="mt-6 flex items-center gap-2">
            <Button className="gap-3">
              <Icon name="mobilePrinterPrinterSolid" className="-ml-1 h-5 w-5" />
              Print all
            </Button>
            <Button className="gap-3">
              <Icon name="externalDownloadOutlined" className="-ml-1 h-5 w-5" />
              Download all
            </Button>
            <Button mode="outline">Airport Guide</Button>
          </div>
        </div>
        <Tabs defaultValue="0">
          <div className="sticky top-[--header-height] z-10 -mx-4 -mt-4 bg-white/90 px-4 pt-4 backdrop-blur-md">
            <TabsList>
              {journey.map(({ type, title }, index) => (
                <TabsTrigger key={title} value={index.toString()} className="text-lg">
                  <Icon
                    name={{ Departing: "flightTakeoffSolid" as IconName, Arriving: "flightLandSolid" as IconName }[type]}
                    className="mr-2.5 h-6 w-6"
                  />
                  {title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {journey.map(({ title }, index) => (
            <TabsContent key={title} value={index.toString()} className="-mx-4 px-4">
              <div className="grid gap-12 pb-24 pt-8">
                <Section title={selectedPassengers.length > 1 ? "Your boarding cards" : "Your boarding card"}>
                  {selectedPassengers.length > 1 ? (
                    <Accordion type="single" collapsible defaultValue={selectedPassengers[0].uid}>
                      {selectedPassengers.map((passenger) => (
                        <AccordionItem key={passenger.uid} value={passenger.uid}>
                          <AccordionTrigger>
                            <div className="flex items-center">
                              <Icon name="usersSolid" className="mr-2.5 h-5 w-5" />
                              {passenger.firstName} {passenger.lastName}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Placeholder size="72">Boarding card</Placeholder>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <Placeholder size="72">Boarding card</Placeholder>
                  )}
                </Section>
                <Section
                  title={selectedPassengers.length > 1 ? "Your shared luggage" : "Your luggage"}
                  containerClassName="grid grid-cols-[repeat(auto-fit,minmax(min(theme('height.56'),100%),1fr))] gap-4"
                >
                  {flight.extras.hasSmallCabinBag && (
                    <Placeholder variant="ratio" className="[--aspect-ratio:1/1]">
                      1 x Small cabin bag
                    </Placeholder>
                  )}
                  {flight.extras.hasLargeCabinBag && (
                    <Placeholder variant="ratio" className="[--aspect-ratio:1/1]">
                      1 x Large cabin bag
                    </Placeholder>
                  )}
                  {flight.extras.holdBags
                    .filter((item) => item.amount)
                    .map((item) => (
                      <Placeholder key={item.name} variant="ratio" className="[--aspect-ratio:1/1]">
                        {item.amount} x {item.name}
                      </Placeholder>
                    ))}
                  {flight.extras.sportsEquipment
                    .filter((item) => item.amount)
                    .map((item) => (
                      <Placeholder key={item.name} variant="ratio" className="[--aspect-ratio:1/1]">
                        {item.amount} x {item.name}
                      </Placeholder>
                    ))}
                </Section>
                <hr />
                <Section
                  containerClassName={cn(
                    "grid gap-4",
                    booking.advertisements.length === 1 && "grid-cols-1 [--ad-aspect-ratio:540/260]",
                    booking.advertisements.length === 2 && "grid-cols-2 [--ad-aspect-ratio:100/100]",
                    booking.advertisements.length === 3 && "grid-cols-3 [--ad-aspect-ratio:100/100]"
                  )}
                >
                  {booking.advertisements.map((ad) => (
                    <Placeholder variant="ratio" className="[aspect-ratio:var(--ad-aspect-ratio)]" key={ad}>
                      Ad {ad}
                    </Placeholder>
                  ))}
                </Section>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
