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
import { Icon, type IconName } from "@/components/icon"

const Notice: React.FC<React.PropsWithChildren<{ title: string; icon: IconName; className?: string }>> = ({ title, children, icon, className }) => (
  <div className={cn("max-w-prose rounded-lg border bg-white p-4 pr-6 shadow", className)}>
    <div className="flex items-start">
      <Icon name={icon} className="mr-3 h-6 w-6 text-blue-700" />
      <div className="text-base/6 text-secondary">
        <div className="font-bold text-primary">{title}</div>
        {children}
      </div>
    </div>
  </div>
)

const Section: React.FC<
  React.PropsWithChildren<{ title?: string; description?: string; className?: string; containerClassName?: string; notice?: React.ReactNode }>
> = ({ title, description, className, containerClassName, children, notice }) => (
  <div className={cn("grid border-b pb-12 last:border-none last:pb-0", className)}>
    {title && <div className="font-display text-5xl text-primary">{title}</div>}
    {description && <div className="mt-3 max-w-prose text-base text-secondary">{description}</div>}
    {notice && <div className="mt-4">{notice}</div>}

    <div className={cn("mt-6", containerClassName)}>{children}</div>
  </div>
)

export const PrintBooking = () => {
  const { selectedPassengers, selectedFlights, ...printBookingContext } = usePrintBookingContext()

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "r" && !shiftKey && !metaKey) {
      const newBooking = createBooking()
      printBookingContext.setBooking(newBooking)
      printBookingContext.setSelectedPassengers(newBooking.passengers)
      printBookingContext.setSelectedFlights(newBooking.flights)
      console.log(newBooking)
    }
  })

  return (
    <section className="mx-auto w-full max-w-[--page-maxWidth] flex-auto">
      <div className="mx-auto max-w-[--page-maxWidth] flex-auto px-[--page-inset]">
        <div className="grid gap-[--page-inset-large] py-[--page-inset-large]">
          <div className="flex items-center justify-end gap-2">
            <Button mode="outline" className="gap-2.5">
              <Icon name="searchAndMenuAirplaneModeAltSolid" className="-ml-1.5 h-5 w-5" />
              Airport Guide
            </Button>
            <Button mode="outline" className="gap-2.5">
              <Icon name="externalDownloadOutlined" className="-ml-1.5 h-5 w-5" />
              Save all
            </Button>
            <Button className="gap-2.5">
              <Icon name="mobilePrinterPrinterSolid" className="-ml-1.5 h-5 w-5" />
              Print all
            </Button>
          </div>
          <div className="mt-[--page-inset]">
            <h1 className="font-display text-6xl text-primary">Your boarding passes</h1>
            <p className="mt-3 max-w-prose text-base text-secondary">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, debitis! Beatae, maiores dolorem. Ipsum dolor facere, quia, eos nisi
              exercitationem aspernatur quasi, dolore fugit natus minima officiis aperiam voluptate dicta!
            </p>
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
                          <div className="grid gap-12">
                            <Section title="Boarding card" containerClassName="flex">
                              <Placeholder size="72">
                                <div>Boarding card:</div>
                                <div>{formatPassengerTitle(passenger)}</div>
                              </Placeholder>
                            </Section>
                            <Section title="Cabin bags" containerClassName="flex gap-4">
                              {flight.extras.hasSmallCabinBag && (
                                <Placeholder size="72" variant="size">
                                  1 x Small cabin bag
                                </Placeholder>
                              )}
                              {flight.extras.hasLargeCabinBag && (
                                <Placeholder size="72" variant="size">
                                  1 x Large cabin bag
                                </Placeholder>
                              )}
                            </Section>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <Placeholder size="72">Boarding card</Placeholder>
                )}
                <Section
                  title="Your luggage"
                  description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officia quis minus. Corrupti autem delectus earum molestiae qui. Numquam reiciendis ex molestias placeat vero."
                  containerClassName="grid grid-cols-[repeat(auto-fit,minmax(min(theme('height.56'),100%),1fr))] gap-4"
                  notice={
                    <Notice title="Your large cabin bag" icon="warningSolid">
                      <div className="prose leading-6">
                        <p>Please note that your bag:</p>
                        <ul className="-mt-2">
                          <li>Must be maximum size 56 x 45 x 25 cm (including any handles and wheels)</li>
                          <li>Needs to fit in an overhead locker</li>
                          <li>Can be up to a maximum weight of 15kg. You will need to be able to lift and carry the bag yourself</li>
                        </ul>
                      </div>
                    </Notice>
                  }
                >
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
                  description="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea officia quis minus. Corrupti autem delectus earum molestiae qui. Numquam reiciendis ex molestias placeat vero."
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
