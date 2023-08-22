"use client"

import Image from "next/image"
import Advert3Cols from "@/public/media/advert-3-cols.jpg"
import { format } from "date-fns"

import { createBooking, formatFlightTitle, formatPassengerTitle, type Luggage } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Placeholder } from "@/components/ui/placeholder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-large"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { Icon, type IconName } from "@/components/icon"

const cardStyles = "bg-white shadow rounded-lg outline outline-1 outline-black/5"

export const Notice: React.FC<React.PropsWithChildren<{ title: string; icon: IconName; className?: string }>> = ({
  title,
  children,
  icon,
  className,
}) => (
  <div className={cn("max-w-prose p-4 pr-6", cardStyles, className)}>
    <div className="flex items-start">
      <Icon name={icon} className="mr-3 h-6 w-6 text-blue-700" />
      <div className="text-base/6 text-secondary">
        <div className="font-bold text-primary">{title}</div>
        {children}
      </div>
    </div>
  </div>
)

export const Section: React.FC<
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
  const { selectedPassengers, selectedFlights, booking, ...printBookingContext } = usePrintBookingContext()

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

  return (
    <section className="flex-auto">
      <div className="fixed inset-0 top-auto z-20 flex w-full items-center justify-center border-t bg-white pb-[--page-inset] pt-[--page-inset-small]">
        <div className="mx-auto flex max-w-[--page-maxWidth] flex-auto items-center justify-between px-[--page-inset]">
          <div className="flex items-center">
            <div className="mr-6 text-base font-bold">Your selection</div>
            <div className="mr-2 flex items-center gap-2 rounded-lg bg-gray-100 py-1.5 pl-3.5 pr-4">
              <Badge>{selectedFlights.length}</Badge> Flights
            </div>
            <div className="mr-6 flex items-center gap-2 rounded-lg bg-gray-100 py-1.5 pl-3.5 pr-4">
              <Badge>{selectedPassengers.length}</Badge> Passengers
            </div>
            {/* <Link className="flex items-center gap-2 text-sm font-bold">
              Edit
              <Icon name="editChangeEditSolid" className="h-3.5 w-3.5" />
            </Link> */}
          </div>
          <div className="flex items-center gap-2">
            {/* <Button size="lg" mode="ghost" className="gap-2.5">
              <Icon name="editChangeEditSolid" className="-ml-1.5 h-3.5 w-3.5" />
              Edit selection
            </Button> */}
            <Button size="lg" mode="outline" className="gap-2.5">
              <Icon name="externalDownloadOutlined" className="-ml-1.5 h-5 w-5" />
              Save all
            </Button>
            <Button size="lg" className="gap-2.5">
              <Icon name="mobilePrinterPrinterSolid" className="-ml-1.5 h-5 w-5" />
              Print all
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[--page-maxWidth] flex-auto px-[--page-inset]">
        <div className="mt-5 grid gap-[--page-inset-large] py-20">
          <div>
            <h1 className="font-display text-5xl/none text-primary">Your boarding passes</h1>
            <p className="mt-3 max-w-prose text-base text-secondary">
              Review and print your boarding passes. Make sure to check all the details carefully before proceeding. If you encounter any issues,
              please contact our support team.
            </p>
            <Link className="mt-5 gap-2 font-bold">
              How to use an Airport
              <Icon name="lucideArrowRight" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <Tabs defaultValue="0" className="bg-gray-100/75">
        <div className="sticky top-0 z-10 bg-white backdrop-blur-md">
          <TabsList className="mx-auto max-w-[--page-maxWidth] px-[--page-inset]">
            {flights.map((flight, index) => (
              <TabsTrigger key={index} value={index.toString()} className="text-xl">
                <span>{flight.departureAirport.code}</span>
                {/* <Icon name="arrowRight" className="mx-[1px] h-4 w-4 translate-y-[-5%] opacity-25" /> */}
                <span className="mx-1 opacity-25">/</span>
                <span>{flight.arrivalAirport.code}</span>
                {/* <span className="ml-1.5">{format(flight.departureDate, "do MMM")}</span> */}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {flights.map((flight, index) => (
          <TabsContent key={index} value={index.toString()}>
            <div className="mx-auto grid min-h-[40vh] max-w-[--page-maxWidth] gap-3 px-[--page-inset] py-6 pb-16">
              <div className="max-sm:hidden">
                <div className="mb-4 text-lg font-bold text-primary">Your selected flight</div>
                <div className={cn("overflow-hidden", cardStyles)}>
                  <div className="flex items-center justify-between border-b px-[--page-inset-small] py-4 text-base/5">
                    <div>{format(flight.departureDate, "EEEE, do MMMM yyyy")}</div>
                    <div className="text-secondary">{flight.number}</div>
                  </div>
                  <div className="flex items-start gap-4 p-[--page-inset-small]">
                    <Icon name="flightTakeoffSolid" className="h-8 w-8" />
                    <div>
                      <div className="text-base">
                        {flight.departureAirport.name} ({flight.departureAirport.code})
                      </div>
                      <div className="text-base text-secondary">{flight.departureAirport.country}</div>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="secondary">{format(flight.departureDate, "h:mm a")}</Badge>
                        {flight.departureAirport.terminal && <Badge variant="secondary">{flight.departureAirport.terminal}</Badge>}
                      </div>
                    </div>
                    <div className="mx-4 flex h-8 items-center justify-center gap-3">
                      {/* <div className="h-[1px] w-8 flex-auto bg-gray-300"></div> */}
                      <Icon name="menuHorizontal" className="h-6 w-6 shrink-0 text-gray-300" />
                      <Icon name="searchAndMenuAirplaneModeAltSolid" className="h-6 w-6 shrink-0 text-gray-400" />
                      <Icon name="menuHorizontal" className="h-6 w-6 shrink-0 text-gray-300" />
                      {/* <div className="h-[1px] w-8 flex-auto bg-gray-300"></div> */}
                    </div>
                    <div>
                      <div className="text-base">
                        {flight.arrivalAirport.name} ({flight.arrivalAirport.code})
                      </div>
                      <div className="text-base text-secondary">{flight.arrivalAirport.country}</div>
                      <div className="mt-3 flex items-center gap-2">
                        <Badge variant="secondary">{format(flight.arrivalDate, "h:mm a")}</Badge>
                        {flight.arrivalAirport.terminal && <Badge variant="secondary">{flight.arrivalAirport.terminal}</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-sm:hidden">
                <div className="mb-4 mt-8 text-lg font-bold text-primary">Your boarding cards</div>
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
                          <Placeholder size="72" className="border border-blue-200">
                            <div>Boarding card</div>
                          </Placeholder>
                          <div className="grid grid-cols-2 gap-4">
                            {passenger.hasSmallCabinBag ? (
                              <div className="flex flex-col overflow-hidden rounded-2xl border">
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
                                    <div className="text-secondary">Dimensions</div>
                                    <div className="">Max. 45 x 36 x 20 cm</div>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <div className="text-secondary">Weight</div>
                                    <div className="">You must be able to carry it</div>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <div className="text-secondary">Stored</div>
                                    <div className="">Under your seat</div>
                                  </div>
                                </div>
                                <div className="p-4 py-2">
                                  <Link>
                                    <Icon name="informationSolid" className="h-4 w-4" />
                                    Bag details
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <Placeholder className="!h-auto" />
                            )}
                            {passenger.hasLargeCabinBag ? (
                              <div className="flex flex-col overflow-hidden rounded-2xl border">
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
                                    <div className="text-secondary">Dimensions</div>
                                    <div className="">Max. 56 x 45 x 25 cm</div>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <div className="text-secondary">Weight</div>
                                    <div className="">Max. 15kg</div>
                                  </div>
                                  <div className="flex h-12 items-center justify-between">
                                    <div className="text-secondary">Stored</div>
                                    <div className="">In an overhead locker</div>
                                  </div>
                                </div>
                                <div className="p-4 py-2">
                                  <Link>
                                    <Icon name="informationSolid" className="h-4 w-4" />
                                    Bag details
                                  </Link>
                                </div>
                              </div>
                            ) : (
                              <Placeholder className="!h-auto" />
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              {!![...flight.extras.holdBags.filter((item) => item.amount), ...flight.extras.sportsEquipment.filter((item) => item.amount)].length && (
                <div className="max-sm:hidden">
                  <div className="mb-4 mt-8 text-lg font-bold text-primary">Your hold luggage</div>
                  <div className={cn(cardStyles, "p-[--page-inset-small]")}>
                    <div className="grid grid-cols-3 gap-4">
                      {fillEmptyColumns(
                        [...flight.extras.holdBags.filter((item) => item.amount), ...flight.extras.sportsEquipment.filter((item) => item.amount)],
                        3
                      ).map((item, itemIndex) => {
                        if (item.name !== "Empty") {
                          return (
                            <div key={itemIndex} className="flex flex-col overflow-hidden rounded-2xl border">
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
                              <div className="p-4 py-2">
                                <Link>
                                  <Icon name="informationSolid" className="h-4 w-4" />
                                  Luggage details
                                </Link>
                              </div>
                            </div>
                          )
                        }

                        return <Placeholder key={itemIndex} className="!h-auto" />
                      })}
                    </div>
                  </div>
                </div>
              )}
              <div className="max-sm:hidden">
                <div className="mb-4 mt-8 text-lg font-bold text-primary">Your extras</div>
                <div className={cn(cardStyles, "p-[--page-inset-small]")}>
                  <Placeholder size="72" className="border border-blue-200">
                    Extras
                  </Placeholder>
                </div>
              </div>
              <hr className="my-8" />

              <div className="max-sm:hidden">
                {/* <div className="mb-4 mt-8 text-lg font-bold text-primary">Advertisements</div> */}
                <div className={cn(cardStyles, "p-[--page-inset-small]")}>
                  <Placeholder size="72" className="border border-blue-200">
                    Adverts
                  </Placeholder>
                  {/* <Image src={Advert3Cols} alt="Advertisement" className="w-full" /> */}
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  )
}
