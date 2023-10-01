/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { type CSSProperties } from "react"
import { format, sub } from "date-fns"

import { formatInfantPassengerTitle, type Booking, type Flight, type Passenger } from "@/config/booking"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { BarCode } from "@/components/barcode"
import { Icon, type IconName } from "@/components/icon"
import { TNums } from "@/components/tnums"
import { SmallAccordion, SmallAccordionContent, SmallAccordionItem, SmallAccordionTrigger } from "@/components/ui/small-accordion"

const iconFromSeat = (seat: string): IconName => {
  // if (seat.includes("A") || seat.includes("F")) return "seatWindow"
  // if (seat.includes("B") || seat.includes("E")) return "seatMiddle"
  // if (seat.includes("C") || seat.includes("D")) return "seatAisle"
  if (seat.includes("A") || seat.includes("F")) return "seatsSideSolid"
  if (seat.includes("B") || seat.includes("E")) return "seatsSideSolid"
  if (seat.includes("C") || seat.includes("D")) return "seatsSideSolid"
}

const Data = ({ className, align = "left", ...props }: { className?: string; align?: "left" | "right"; children: React.ReactNode }) => {
  return (
    <div className={cn("flex w-full flex-col gap-1", align === "left" ? "items-start text-left" : "items-end text-right", className)} {...props} />
  )
}

const DataLabel = ({
  className,
  align = "left",
  children,
  ...props
}: {
  className?: string
  align?: "left" | "right"
  children: React.ReactNode
}) => {
  return (
    <div className={cn("text-sm/6 font-bold", align === "left" ? "justify-start text-left" : "justify-end text-right", className)} {...props}>
      {children}
    </div>
  )
}

const DataValue = ({
  className,
  align = "left",
  icon,
  children,
  ...props
}: {
  className?: string
  align?: "left" | "right"
  icon?: IconName
  children: React.ReactNode
}) => {
  return (
    <div
      className={cn("flex items-center gap-x-2 text-base/6", align === "left" ? "justify-start text-left" : "justify-end text-right", className)}
      {...props}
    >
      {/* {!!icon && (
        <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 bg-gray-200/50 print:contents">
          <Icon name={icon} className="h-3.5 w-3.5 text-primary print:h-3.5 print:w-3.5" />
        </div>
      )} */}
      {!!icon && <Icon name={icon} className="h-3.5 w-3.5 text-primary" />}
      {children}
    </div>
  )
}

const Grid: React.FC<React.PropsWithChildren<{ className?: string; style?: CSSProperties }>> = ({ children, className, style, ...props }) => {
  return (
    <div className={cn("grid", className)} style={style} {...props}>
      {children}
    </div>
  )
}

const FlightIconMaximum: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 92 37" className={cn(className, "print:hidden")}>
      <circle cx="1.78558" cy="18.5" r="1.5" fill="currentColor" />
      <line x1="8.03558" y1="18.5" x2="21.5356" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.1 4" />
      <path
        d="M40.2947 32.75C40.8347 32.75 41.3297 32.465 41.6297 32.015L48.6647 20.75H56.9147C58.1597 20.75 59.1647 19.745 59.1647 18.5C59.1647 17.255 58.1597 16.25 56.9147 16.25H48.6647L41.6297 4.985C41.3447 4.535 40.8347 4.25 40.2947 4.25C39.2447 4.25 38.4797 5.27 38.7947 6.29L41.9147 16.25H33.6647L31.6397 13.55C31.5047 13.355 31.2797 13.25 31.0397 13.25H30.1547C29.6597 13.25 29.2997 13.73 29.4347 14.21L30.6647 18.5L29.4347 22.79C29.2997 23.27 29.6597 23.75 30.1547 23.75H31.0397C31.2797 23.75 31.5047 23.645 31.6397 23.45L33.6647 20.75H41.9147L38.7947 30.71C38.4797 31.73 39.2447 32.75 40.2947 32.75Z"
        fill="currentColor"
      />
      <line x1="67.0356" y1="18.5" x2="80.5356" y2="18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="0.1 4" />
      <circle cx="88.2856" cy="18.5" r="3" fill="currentColor" />
    </svg>
  )
}

const FlightIconMinimum: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 31 29" className={cn(className, "hidden print:block")}>
      <path
        d="M11.2946 28.75C11.8346 28.75 12.3296 28.465 12.6296 28.015L19.6646 16.75H27.9146C29.1596 16.75 30.1646 15.745 30.1646 14.5C30.1646 13.255 29.1596 12.25 27.9146 12.25H19.6646L12.6296 0.985C12.3446 0.535 11.8346 0.25 11.2946 0.25C10.2446 0.25 9.47961 1.27 9.79461 2.29L12.9146 12.25H4.66461L2.63961 9.55C2.50461 9.355 2.27961 9.25 2.03961 9.25H1.15461C0.659607 9.25 0.299608 9.73 0.434608 10.21L1.66461 14.5L0.434608 18.79C0.299608 19.27 0.659607 19.75 1.15461 19.75H2.03961C2.27961 19.75 2.50461 19.645 2.63961 19.45L4.66461 16.75H12.9146L9.79461 26.71C9.47961 27.73 10.2446 28.75 11.2946 28.75Z"
        fill="currentColor"
      />
    </svg>
  )
}

export interface TicketProps {
  booking: Booking
  flight: Flight
  passenger: Passenger
  className?: string
}

export const SmallTicket: React.FC<TicketProps> = ({ booking, flight, passenger, className }) => {
  const gateClosureDate = sub(flight.departureDate, { minutes: 30 })
  const isGateClosureBetween6AMand6PM = gateClosureDate.getHours() >= 6 && gateClosureDate.getHours() < 18
  const isDepartureBetween6AMand6PM = flight.departureDate.getHours() >= 6 && flight.departureDate.getHours() < 18
  const hasExtras =
    !!flight.extras.hasSpeedyBoarding || !!flight.extras.hasEasyJetPlusBagDrop || !!flight.extras.hasFastTrackSecurity || !!flight.extras.hasMealDeal

  const headerElement = (
    <header className="relative w-full">
      <div className="absolute bottom-0 left-0 w-full border-b-sm border-gray-200" />
      <div className="flex items-center justify-between px-[--px] py-[--py] text-base/5">
        <div className="flex-auto">
          Flight No. <span className="font-bold">{flight.number}</span>
        </div>
        {booking.bookingLabel !== "None" && (
          <Badge
            variant="default"
            className={cn([
              {
                "bg-[#347C76] pt-px font-bold": booking.bookingLabel === "FLEXI",
                "bg-[#1478BE] pt-px font-bold": booking.bookingLabel === "Standby Fare",
                "bg-gray-700 pt-px font-bold": booking.bookingLabel === "Worldwide by easyJet",
                "bg-orange-dark pt-px font-bold": booking.bookingLabel === "easyJet Holidays" || booking.bookingLabel === "Staff Travel",
              },
              "print:bg-black",
            ])}
          >
            {booking.bookingLabel}
          </Badge>
        )}
      </div>
    </header>
  )

  // const flightInfoElement = (
  //   <div
  //     className="flex items-end justify-start gap-4"
  //     style={
  //       {
  //         // text size small
  //         "--tss": "1rem",
  //         // font small
  //         "--fs": "bold 1rem/0.5rem",
  //         // text size large
  //         "--tsl": "3rem",
  //         // font large
  //         "--fl": "var(--tsl)/var(--tsl)",
  //       } as CSSProperties
  //     }
  //   >
  //     <div className="relative flex h-[calc(1.5rem*2+3rem+1.5rem)] items-center bg-red-100/25">
  //       <h2 className="absolute bottom-0 inline-block h-[1.5rem] [font:var(--fs)]">Terminal {flight.departureAirport.terminal}</h2>
  //       <h2 className="absolute top-0 inline-block h-[1.5rem] [font:var(--fs)]">{flight.departureAirport.name}</h2>
  //       {/* determines width */}
  //       <h1 className="inline-block text-[3rem]/[3rem] font-light tracking-tight">{flight.departureAirport.code}</h1>
  //     </div>

  //     <FlightIconMinimum className="w-[3rem] self-center text-secondary [grid-area:flightIcon]" />

  //     <div className="relative flex h-[calc(1.5rem*2+3rem+1.5rem)] items-center bg-red-100/25">
  //       <h2 className="absolute bottom-0 inline-block h-[1.5rem] [font:var(--fs)]">Terminal {flight.arrivalAirport.terminal}</h2>
  //       <h2 className="absolute top-0 inline-block h-[1.5rem] [font:var(--fs)]">{flight.arrivalAirport.name}</h2>
  //       {/* determines width */}
  //       <h1 className="inline-block text-[3rem]/[3rem] font-light tracking-tight">{flight.arrivalAirport.code}</h1>
  //     </div>
  //   </div>
  // )

  // works well
  // const flightInfoElement = (
  //   <Grid
  //     className="w-[75%] grid-cols-[minmax(0,1fr)_var(--icon-size)_minmax(0,1fr)] items-start gap-x-[--gap-x] gap-y-[--gap-y] [--icon-size:2rem] [grid-area:flightInfoElement]"
  //     style={{
  //       gridTemplateAreas: `
  //         "departureAirportName     .          arrivalAirportName"
  //         "departureAirportCode     flightIcon arrivalAirportCode"
  //         "departureAirportTerminal .          arrivalAirportTerminal"
  //       `,
  //     }}
  //   >
  //     <div className="flex  w-full flex-col items-start justify-end [grid-area:departureAirportName]">
  //       <DataLabel className="line-clamp-2 ">{flight.departureAirport.name}</DataLabel>
  //     </div>
  //     <div className="flex w-full justify-start [grid-area:departureAirportCode]">
  //       <DataValue className=" text-[2.6rem] font-light leading-[2.6rem]">{flight.departureAirport.code}</DataValue>
  //     </div>
  //     <div className="flex  w-full justify-start [grid-area:departureAirportTerminal]">
  //       <DataValue className=" text-secondary">{flight.departureAirport.terminal ? `Terminal ${flight.departureAirport.terminal}` : ""}</DataValue>
  //     </div>

  //     <FlightIconMinimum className="w-[--icon-size] self-center text-tertiary [grid-area:flightIcon]" />

  //     <div className="flex  w-full flex-col items-start justify-end [grid-area:arrivalAirportName]">
  //       <DataLabel className="line-clamp-2 ">{flight.arrivalAirport.name}</DataLabel>
  //     </div>
  //     <div className="flex w-full justify-start [grid-area:arrivalAirportCode]">
  //       <DataValue className=" text-[2.6rem] font-light leading-[2.6rem]">{flight.arrivalAirport.code}</DataValue>
  //     </div>
  //     <div className="flex  w-full justify-start [grid-area:arrivalAirportTerminal]">
  //       <DataValue className=" text-secondary">{flight.arrivalAirport.terminal ? `Terminal ${flight.arrivalAirport.terminal}` : ""}</DataValue>
  //     </div>
  //   </Grid>
  // )

  const flightInfoElement = (
    <Grid className="grid w-full gap-x-[--gap-x]">
      <DataLabel>Departs</DataLabel>
      <div className="mt-[--py] flex items-baseline justify-start gap-2 text-[1.6rem] tracking-tight">
        <span className="">{flight.departureAirport.name}</span>
        <span className="translate-y-[-0.5px] text-[0.6em]">({flight.departureAirport.code})</span>
      </div>
      {!!flight.departureAirport.terminal && <div className="text-sm text-secondary">Terminal {flight.departureAirport.terminal}</div>}
      <svg className="my-[--gap-y] h-px w-full fill-none text-gray-300">
        <line
          x1="0"
          y1="0.5"
          x2="100%"
          y2="0.5"
          stroke="currentColor"
          strokeWidth={1.1}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="1 4"
        />
      </svg>
      <DataLabel>Arrives</DataLabel>
      <div className="mt-[--py] flex items-baseline justify-start gap-2 text-[1.6rem] tracking-tight">
        <span className="">{flight.arrivalAirport.name}</span>
        <span className="translate-y-[-0.5px] text-[0.6em]">({flight.arrivalAirport.code})</span>
      </div>
      {!!flight.arrivalAirport.terminal && <div className="text-sm text-secondary">Terminal {flight.arrivalAirport.terminal}</div>}
    </Grid>
  )

  const extrasElement = (
    <Data align="left" className="w-full flex-row flex-wrap">
      <DataLabel align="left" className="basis-[100%] text-left">
        Extras
      </DataLabel>
      {flight.extras.hasSpeedyBoarding && (
        <Badge variant="outline" icon="servicesIconFastTrackOutlined">
          Speedy Boarding
        </Badge>
      )}
      {flight.extras.hasEasyJetPlusBagDrop && (
        <Badge variant="outline" icon="luggageLuggageDropOutlined">
          easyJet Plus Bag Drop
        </Badge>
      )}
      {flight.extras.hasFastTrackSecurity && (
        <Badge variant="outline" icon="servicesIconFastTrackOutlined">
          Fast Track Security
        </Badge>
      )}
      {flight.extras.hasMealDeal && (
        <Badge variant="outline" icon="facilitiesFoodAndDrinkOutlined">
          Food & Drink Voucher
        </Badge>
      )}
      {!hasExtras && <p className="-mt-0.5 text-base">No extras added</p>}
    </Data>
  )

  const passengerElement = (
    <Data className="w-full flex-auto">
      <DataLabel className="mb-0.5">Passenger{passenger.infant && " + Infant"}</DataLabel>
      <DataValue className={cn("flex w-full items-start justify-between !gap-2.5 text-sm/6")}>
        <span>
          {passenger.firstName} {passenger.lastName}
        </span>
        <Badge variant="secondary">
          <TNums content={passenger.id} />
        </Badge>
      </DataValue>
      {passenger.infant && (
        <>
          <DataValue className={cn("flex w-full items-start justify-between !gap-2.5 text-sm/6")}>
            <span>{formatInfantPassengerTitle(passenger.infant)} (Infant)</span>
            <Badge variant="secondary">
              <TNums content={passenger.infant.id} />
            </Badge>
          </DataValue>
        </>
      )}
    </Data>
  )

  const seatElement = (
    <Data align="left" className="[grid-area:seatElement]">
      <DataLabel align="left">Seat</DataLabel>
      <DataValue align="left" icon={iconFromSeat(passenger.selectedSeat)}>
        {passenger.selectedSeat} {passenger.selectedSeatType}
      </DataValue>
    </Data>
  )

  const dateElement = (
    <Data align="left" className="[grid-area:dateElement]">
      <DataLabel align="left">Date</DataLabel>
      <DataValue align="left" icon="calendarDateRangeSolid">
        {format(flight.departureDate, "dd MMM yyyy")}
      </DataValue>
    </Data>
  )

  const timeElement = (
    <Data align="left" className="[grid-area:timeElement]">
      <DataLabel align="left">Takes Off</DataLabel>
      <DataValue align="left" icon={isDepartureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
        {format(flight.departureDate, "hh:mm a")}
      </DataValue>
    </Data>
  )

  const gateClosesElement = (
    <Data align="left" className="[grid-area:gateClosesElement]">
      <DataLabel align="left">Gate Closes</DataLabel>
      <DataValue align="left" icon={isGateClosureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
        {format(gateClosureDate, "hh:mm a")}
      </DataValue>
    </Data>
  )

  const barCodeElement = (
    <div className="flex h-full items-center gap-1 [grid-area:barCodeElement]">
      {/* <div className="relative after:absolute after:inset-0 after:border-2 after:border-primary"> */}
      <div className="flex h-28 items-center gap-1">
        <div className="relative h-full w-10">
          <BarCode className="h-full w-10 bg-white invert" />
          <div className="absolute inset-0 z-[1] border-md border-primary" />
        </div>
      </div>
      <div className="flex -rotate-180 items-center justify-end gap-x-2 text-xs tracking-wide [writing-mode:vertical-rl]">
        <TNums content={flight.reservationNumber} />
        <TNums content={flight.customerEntitlementsCode} />
        <TNums content={flight.checkInSequenceNumber} />
      </div>
    </div>
  )

  const footerElement = (
    <footer className="border-t-sm border-gray-200">
      <div className="px-[--px] py-[--py]">{passengerElement}</div>
      {hasExtras && (
        <SmallAccordion type="single" collapsible>
          <SmallAccordionItem value="extras">
            <SmallAccordionTrigger className="font-bold text-orange">
              <div className="flex items-center gap-2">
                <Icon name="usersOutlined" className="aspect-square h-4 w-4 text-orange" />
                <span>View extras</span>
              </div>
            </SmallAccordionTrigger>
            <SmallAccordionContent>
              <div className="grid gap-4">{extrasElement}</div>
            </SmallAccordionContent>
          </SmallAccordionItem>
        </SmallAccordion>
      )}
    </footer>
  )

  return (
    <div
      className={cn(
        " relative flex flex-col overflow-hidden rounded-md border border-l-[length:theme('borderRadius.md')] border-l-green-600 bg-white text-primary outline-tertiary",
        "[--gap-x:1rem] [--gap-y:0.75rem] [--px:1rem] [--py:0.75rem]",
        className
      )}
    >
      {headerElement}
      <div className={cn("w-full space-y-[--gap-y] px-[--px] py-[--py]")}>
        {flightInfoElement}
        {/* {barCodeElement} */}
      </div>
      <div
        className="grid w-full gap-x-[--gap-x] gap-y-[--gap-y] border-t border-gray-200 px-[--px] py-[--py]"
        style={{
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gridTemplateAreas: `
            "seatElement       dateElement"
            "gateClosesElement timeElement"
          `,
        }}
      >
        {seatElement}
        {dateElement}
        {gateClosesElement}
        {timeElement}
      </div>
      {footerElement}
    </div>
  )
}

export const LargeTicket: React.FC<TicketProps> = ({ booking, flight, passenger, className }) => {
  const gateClosureDate = sub(flight.departureDate, { minutes: 30 })
  const isGateClosureBetween6AMand6PM = gateClosureDate.getHours() >= 6 && gateClosureDate.getHours() < 18
  const isDepartureBetween6AMand6PM = flight.departureDate.getHours() >= 6 && flight.departureDate.getHours() < 18
  const hasExtras =
    !!flight.extras.hasSpeedyBoarding || !!flight.extras.hasEasyJetPlusBagDrop || !!flight.extras.hasFastTrackSecurity || !!flight.extras.hasMealDeal

  const headerElement = (
    <header className="relative w-full">
      <div className="absolute bottom-0 left-0 w-full border-b-sm border-gray-200 print:border-b-md" />
      <div className="flex  items-center justify-between px-[--px] py-[--py] text-base/5">
        <div className="flex items-center gap-x-5 gap-y-[--gap-y]">
          <div className="translate-y-[10%] font-display text-[2rem]/4 tracking-[0.015em]">Boarding pass</div>
        </div>
        <div className="flex items-center gap-x-4 gap-y-[--gap-y]">
          <div>
            Flight No. <span className="font-bold">{flight.number}</span>
          </div>
          {booking.bookingLabel !== "None" && (
            <Badge
              variant="default"
              className={cn([
                {
                  "bg-[#347C76] pt-px font-bold": booking.bookingLabel === "FLEXI",
                  "bg-[#1478BE] pt-px font-bold": booking.bookingLabel === "Standby Fare",
                  "bg-gray-700 pt-px font-bold": booking.bookingLabel === "Worldwide by easyJet",
                  "bg-orange-dark pt-px font-bold": booking.bookingLabel === "easyJet Holidays" || booking.bookingLabel === "Staff Travel",
                },
                "print:bg-black print:text-white",
              ])}
            >
              {booking.bookingLabel}
            </Badge>
          )}
        </div>
      </div>
    </header>
  )

  const flightInfoElement = (
    <Grid
      className="mr-auto grid-cols-[minmax(0,max-content)_var(--icon-size)_minmax(0,max-content)] gap-x-[--gap-x] gap-y-2 [--gap-x:theme('spacing.4')] [--icon-size:5rem] [grid-area:flightInfoElement] print:[--icon-size:2rem]"
      style={{
        gridTemplateAreas: `
          "departureAirportName     .          arrivalAirportName"
          "departureAirportCode     flightIcon arrivalAirportCode"
          "departureAirportTerminal .          arrivalAirportTerminal"
        `,
      }}
    >
      <div className="flex  w-full flex-col items-start justify-end [grid-area:departureAirportName]">
        <DataLabel className="line-clamp-2 ">{flight.departureAirport.name}</DataLabel>
      </div>
      <div className="flex w-full justify-start [grid-area:departureAirportCode]">
        <DataValue className=" text-[2.6rem] font-light leading-[2.6rem]">{flight.departureAirport.code}</DataValue>
      </div>
      <div className="flex  w-full justify-start [grid-area:departureAirportTerminal]">
        <DataValue className=" text-secondary">{flight.departureAirport.terminal ? `Terminal ${flight.departureAirport.terminal}` : ""}</DataValue>
      </div>

      {/* <div className="flex max-w-[calc(var(--icon-size)+80px*2+var(--gap-x)*2)] items-center justify-center self-center [grid-area:2/1/span_1/span_3]"> */}
      <FlightIconMaximum className="w-[--icon-size] self-center text-secondary [grid-area:flightIcon]" />
      <FlightIconMinimum className="w-[--icon-size] self-center text-secondary [grid-area:flightIcon]" />
      {/* </div> */}

      <div className="flex  w-full flex-col items-start justify-end [grid-area:arrivalAirportName]">
        <DataLabel className="line-clamp-2 ">{flight.arrivalAirport.name}</DataLabel>
      </div>
      <div className="flex w-full justify-start [grid-area:arrivalAirportCode]">
        <DataValue className=" text-[2.6rem] font-light leading-[2.6rem]">{flight.arrivalAirport.code}</DataValue>
      </div>
      <div className="flex  w-full justify-start [grid-area:arrivalAirportTerminal]">
        <DataValue className=" text-secondary">{flight.arrivalAirport.terminal ? `Terminal ${flight.arrivalAirport.terminal}` : ""}</DataValue>
      </div>
    </Grid>
  )

  const extrasElement = (
    <Data align="right" className="max-w-[60%] flex-auto shrink flex-row flex-wrap justify-end">
      <DataLabel align="right" className="mb-0.5 basis-[100%] text-right">
        Extras
      </DataLabel>
      {flight.extras.hasSpeedyBoarding && (
        <Badge variant="secondary" icon="servicesIconFastTrackOutlined">
          Speedy Boarding
        </Badge>
      )}
      {flight.extras.hasEasyJetPlusBagDrop && (
        <Badge variant="secondary" icon="luggageLuggageDropOutlined">
          easyJet Plus Bag Drop
        </Badge>
      )}
      {flight.extras.hasFastTrackSecurity && (
        <Badge variant="secondary" icon="servicesIconFastTrackOutlined">
          Fast Track Security
        </Badge>
      )}
      {flight.extras.hasMealDeal && (
        <Badge variant="secondary" icon="facilitiesFoodAndDrinkOutlined">
          Food & Drink Voucher
        </Badge>
      )}
      {!hasExtras && <p className="-mt-0.5 text-base">No extras added</p>}
    </Data>
  )

  const passengerElement = (
    <Data className={cn("")}>
      <DataLabel className="mb-0.5">Passenger{passenger.infant && " + Infant"}</DataLabel>
      <DataValue className={cn("flex !gap-2.5 text-base")}>
        <Badge variant="secondary">
          <TNums content={passenger.id} />
        </Badge>
        <span>
          {passenger.firstName} {passenger.lastName}
        </span>
      </DataValue>
      {passenger.infant && (
        <DataValue className={cn("flex !gap-2.5 text-base")}>
          <Badge variant="secondary">
            <TNums content={passenger.infant.id} />
          </Badge>
          <span>{formatInfantPassengerTitle(passenger.infant)} (Infant)</span>
        </DataValue>
      )}
    </Data>
  )

  const seatElement = (
    <Data align="right" className="[grid-area:seatElement]">
      <DataLabel align="right">Seat</DataLabel>
      <DataValue align="right" icon={iconFromSeat(passenger.selectedSeat)}>
        {passenger.selectedSeat} {passenger.selectedSeatType}
      </DataValue>
    </Data>
  )

  const dateElement = (
    <Data align="right" className="[grid-area:dateElement]">
      <DataLabel align="right">Date</DataLabel>
      <DataValue align="right" icon="calendarDateRangeSolid">
        {format(flight.departureDate, "dd MMM yyyy")}
      </DataValue>
    </Data>
  )

  const timeElement = (
    <Data align="right" className="[grid-area:timeElement]">
      <DataLabel align="right">Takes Off</DataLabel>
      <DataValue align="right" icon={isDepartureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
        {format(flight.departureDate, "hh:mm a")}
      </DataValue>
    </Data>
  )

  const gateClosesElement = (
    <Data align="right" className="[grid-area:gateClosesElement]">
      <DataLabel align="right">Gate Closes</DataLabel>
      <DataValue align="right" icon={isGateClosureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
        {format(gateClosureDate, "hh:mm a")}
      </DataValue>
    </Data>
  )

  const barCodeElement = (
    <div className="flex h-full items-center gap-1 [grid-area:barCodeElement]">
      {/* <div className="relative after:absolute after:inset-0 after:border-2 after:border-primary"> */}
      <div className="flex h-28 items-center gap-1">
        <div className="relative h-full w-10">
          <BarCode className="h-full w-10 bg-white invert" />
          <div className="absolute inset-0 z-[1] border-md border-primary" />
        </div>
      </div>
      <div className="flex -rotate-180 items-center justify-end gap-x-2 text-xs tracking-wide [writing-mode:vertical-rl]">
        <TNums content={flight.reservationNumber} />
        <TNums content={flight.customerEntitlementsCode} />
        <TNums content={flight.checkInSequenceNumber} />
      </div>
    </div>
  )

  const footerElement = (
    <footer className="relative w-full">
      <div className="absolute left-0 top-0 w-full border-b-sm border-gray-200 print:left-0 print:border-b-sm" />
      <div className="flex items-start justify-between gap-x-[--gap-x] gap-y-[--gap-y] px-[--px] py-[--py] [grid-area:footerElement]">
        {passengerElement}
        {extrasElement}
      </div>
    </footer>
  )

  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden rounded-md border border-l-[length:theme('borderRadius.md')] border-l-green-600 bg-white text-primary outline-tertiary print:border-sm print:border-b-md print:outline-[0px]",
        "[--gap-x:1.5rem] [--gap-y:1.5rem] [--px:1.5rem] [--py:1.5rem]",
        className
      )}
    >
      {headerElement}
      <div className={cn("flex flex-auto shrink-0 items-center justify-end gap-x-[--gap-x] gap-y-[--gap-y] px-[--px] py-[--py]")}>
        {flightInfoElement}
        <div
          className="grid w-full max-w-max flex-auto place-items-end items-center gap-x-[--gap-x] gap-y-[--gap-y]"
          style={{
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gridTemplateAreas: `
            "seatElement       dateElement"
            "gateClosesElement timeElement"
          `,
          }}
        >
          {seatElement}
          {dateElement}
          {gateClosesElement}
          {timeElement}
        </div>
        {barCodeElement}
      </div>
      {footerElement}
    </div>
  )
}

export const Ticket: React.FC<TicketProps> = (props) => {
  return (
    <>
      <SmallTicket {...props} className="print:!hidden md:hidden" />
      <LargeTicket {...props} className="print:!flex max-md:hidden" />
    </>
  )
}
