"use client"

import Image from "next/image"
import Advert3Cols from "@/public/media/advert-3-cols.jpg"

import { createBooking, formatFlightTitle, formatPassengerTitle } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Placeholder } from "@/components/ui/placeholder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-large"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { Icon } from "@/components/icon"

const Section: React.FC<React.PropsWithChildren<{ title?: string; description?: string; className?: string; containerClassName?: string }>> = ({
  title,
  description,
  className,
  containerClassName,
  children,
}) => (
  <div className={cn("grid gap-6 border-b pb-12 last:border-none last:pb-0", className)}>
    {title && <div className="font-display text-4xl text-primary">{title}</div>}
    {description && <div className="text-base text-secondary">{description}</div>}
    <div className={containerClassName}>{children}</div>
  </div>
)

export const PrintBooking = () => {
  const { selectedPassengers, selectedFlights, ...printBookingContext } = usePrintBookingContext()

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "r" && !shiftKey && !metaKey) {
      const newBooking = createBooking()
      printBookingContext.setBooking(newBooking)
      printBookingContext.setSelectedPassengers(newBooking.passengers)
      console.log(newBooking)
    }
  })

  return (
    <section className="flex-auto screen:mx-auto screen:w-full screen:max-w-[--page-maxWidth]">
      <div className="mx-auto max-w-[--page-maxWidth] flex-auto p-[--page-inset]">
        <div className="py-[--page-inset-large]">
          <h1 className="font-display text-6xl text-primary">Your boarding passes</h1>
          <p className="mt-4 max-w-prose text-base text-secondary">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, debitis! Beatae, maiores dolorem. Ipsum dolor facere, quia, eos nisi
            exercitationem aspernatur quasi, dolore fugit natus minima officiis aperiam voluptate dicta!
          </p>
          <div className="mt-6 flex items-center justify-end gap-2">
            <Button className="gap-3">
              <Icon name="mobilePrinterPrinterSolid" className="-ml-1 h-5 w-5" />
              Print
            </Button>
            <Button mode="outline" className="gap-3">
              <Icon name="externalDownloadOutlined" className="-ml-1 h-5 w-5" />
              Download
            </Button>
            <Button mode="outline">Airport Guide</Button>
          </div>
        </div>
        <Tabs defaultValue="0" className="mt-[--page-inset]">
          <div className="sticky top-[--header-height] z-10 -mx-4 -mt-4 bg-white/90 px-4 pt-4 backdrop-blur-md">
            <TabsList>
              {selectedFlights.map((flight, index) => (
                <TabsTrigger key={index} value={index.toString()} className="text-base">
                  {/* <Icon
                    name={{ Departing: "flightTakeoffSolid" as IconName, Arriving: "flightLandSolid" as IconName }[type]}
                    className="mr-2.5 h-6 w-6"
                  /> */}
                  {formatFlightTitle(flight)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {selectedFlights.map((flight, index) => (
            <TabsContent key={index} value={index.toString()} className="-mx-4 px-4">
              <div className="grid gap-12 pb-24 pt-8">
                <Section
                  title={selectedPassengers.length > 1 ? "Your boarding cards" : "Your boarding card"}
                  description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officia quis minus. Corrupti autem delectus earum molestiae qui. Numquam reiciendis ex molestias placeat vero hic aperiam corporis. Molestias, at cupiditate."
                >
                  {selectedPassengers.length > 1 ? (
                    <Accordion type="single" collapsible defaultValue={selectedPassengers[0].uid}>
                      {selectedPassengers.map((passenger) => (
                        <AccordionItem key={passenger.uid} value={passenger.uid}>
                          <AccordionTrigger>
                            <div className="flex items-center">
                              <Icon name="usersSolid" className="mr-3 h-5 w-5" />
                              <div className="text-base/5">
                                <div className="flex w-full items-baseline justify-between gap-[--page-inset-small]">
                                  {formatPassengerTitle(passenger)}
                                </div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <Placeholder size="72">
                              <div>Boarding card:</div>
                              <div>{formatPassengerTitle(passenger)}</div>
                            </Placeholder>
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
                  description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officia quis minus. Corrupti autem delectus earum molestiae qui. Numquam reiciendis ex molestias placeat vero hic aperiam corporis. Molestias, at cupiditate."
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
                <Section
                  title="Your extras"
                  description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officia quis minus. Corrupti autem delectus earum molestiae qui. Numquam reiciendis ex molestias placeat vero hic aperiam corporis. Molestias, at cupiditate."
                >
                  <Placeholder size="72">Extras</Placeholder>
                </Section>
                <Section>
                  <Image src={Advert3Cols} alt="Advertisement" className="w-full" />
                </Section>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
