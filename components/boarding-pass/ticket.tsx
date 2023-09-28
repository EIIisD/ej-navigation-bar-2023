/* eslint-disable @typescript-eslint/no-unused-vars */
import { type CSSProperties } from "react"
import { format, sub } from "date-fns"

import { formatInfantPassengerTitle, type Booking, type Flight, type Passenger } from "@/config/booking"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { BarCode } from "@/components/barcode"
import { Icon, type IconName } from "@/components/icon"
import { TNums } from "@/components/tnums"

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
    <div
      className={cn("flex flex-col gap-x-2 gap-y-1.5", align === "left" ? "items-start text-left" : "items-end text-right", className)}
      {...props}
    />
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
    <div className={cn("text-sm/4 font-bold", align === "left" ? "justify-start text-left" : "justify-end text-right", className)} {...props}>
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
      className={cn(
        "flex items-center gap-2 whitespace-nowrap text-sm/4 [.threshold_&]:gap-1.5",
        align === "left" ? "justify-start text-left" : "justify-end text-right",
        className
      )}
      {...props}
    >
      {!!icon && (
        <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-100 [.threshold_&]:contents">
          <Icon name={icon} className="h-4 w-4 text-primary [.threshold_&]:h-3.5 [.threshold_&]:w-3.5" />
        </div>
      )}
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

const FlightIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      <FlightIconMaximum className={className} />
      <FlightIconMinimum className={className} />
    </>
  )
}

const FlightIconMaximum: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 92 37" className={cn(className, "[.threshold_&]:hidden")}>
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
    <svg viewBox="0 0 31 29" className={cn(className, "hidden scale-50 [.threshold_&]:block")}>
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
}

export const Ticket: React.FC<TicketProps> = ({ booking, flight, passenger }) => {
  const gateClosureDate = sub(flight.departureDate, { minutes: 30 })
  const isGateClosureBetween6AMand6PM = gateClosureDate.getHours() >= 6 && gateClosureDate.getHours() < 18
  const isDepartureBetween6AMand6PM = flight.departureDate.getHours() >= 6 && flight.departureDate.getHours() < 18

  const headerElement = (
    <header className="relative w-full">
      <div className="absolute bottom-0 left-[6px] h-2 w-full border-b border-gray-300 [.threshold_&]:left-0" />
      <div className="flex items-center justify-between px-6 py-4 text-sm/5">
        <div className="flex items-center gap-4">
          <Icon name="easyJetLogo" className="relative hidden h-5 w-auto [aspect-ratio:91/22] [.threshold_&]:block" />
          <div className="translate-y-[17%] font-display text-3xl/4 tracking-wide [.threshold_&]:hidden">Boarding pass</div>
          {booking.bookingLabel !== "None" && (
            <Badge
              variant="default"
              className={cn({
                "bg-[#347C76] pt-px font-bold": booking.bookingLabel === "FLEXI",
                "bg-[#1478BE] pt-px font-bold": booking.bookingLabel === "Standby Fare",
                "bg-[#333333] pt-px font-bold": booking.bookingLabel === "Worldwide by easyJet",
                "bg-[#FF6600] pt-px font-bold": booking.bookingLabel === "easyJet Holidays" || booking.bookingLabel === "Staff Travel",
              })}
            >
              {booking.bookingLabel}
            </Badge>
          )}
        </div>
        <div>
          Flight No. <span className="font-bold">{flight.number}</span>
        </div>
      </div>
    </header>
  )

  const flightInfoElement = (
    <Grid
      className="w-full max-w-[--flight-info-max] gap-x-3 gap-y-1 [--flight-info-col-max:7rem] [--flight-info-max:20rem] [grid-area:flightInfoElement] [.threshold_&]:[--flight-info-col-max:7rem] [.threshold_&]:[--flight-info-max:16rem]"
      style={{
        gridTemplateColumns: "minmax(0,4fr) minmax(0,3fr) minmax(0,4fr)",
        gridTemplateAreas: `
          "departureAirportName     .          arrivalAirportName"
          "departureAirportCode     flightIcon arrivalAirportCode"
          "departureAirportTerminal .          arrivalAirportTerminal"
        `,
      }}
    >
      <div className="flex w-full flex-col items-start [grid-area:departureAirportName]">
        <DataLabel className="max-w-[--flight-info-col-max] !leading-4">{flight.departureAirport.name}</DataLabel>
      </div>
      <div className="flex w-full justify-start [grid-area:departureAirportCode]">
        <DataValue className="max-w-[--flight-info-col-max] text-4xl font-light tracking-wide">{flight.departureAirport.code}</DataValue>
      </div>
      <div className="flex w-full justify-start [grid-area:departureAirportTerminal]">
        <DataValue className="max-w-[--flight-info-col-max] text-secondary">
          {flight.departureAirport.terminal ? `Terminal ${flight.departureAirport.terminal}` : ""}
        </DataValue>
      </div>
      <FlightIcon className="self-center text-secondary [grid-area:flightIcon]" />
      <div className="flex w-full flex-col items-end [grid-area:arrivalAirportName]">
        <DataLabel align="right" className="max-w-[--flight-info-col-max] !leading-4">
          {flight.arrivalAirport.name}
        </DataLabel>
      </div>
      <div className="flex w-full justify-end [grid-area:arrivalAirportCode]">
        <DataValue align="right" className="max-w-[--flight-info-col-max] text-4xl font-light tracking-wide">
          {flight.arrivalAirport.code}
        </DataValue>
      </div>
      <div className="flex w-full justify-end [grid-area:arrivalAirportTerminal]">
        <DataValue align="right" className="max-w-[--flight-info-col-max] text-secondary">
          {flight.arrivalAirport.terminal ? `Terminal ${flight.arrivalAirport.terminal}` : ""}
        </DataValue>
      </div>
    </Grid>
  )

  const extrasElement = (
    <Data align="right" className="flex-row flex-wrap justify-end [grid-area:extrasElement]">
      {/* <Data align="right" className="flex-col items-end [grid-area:extrasElement]"> */}
      <DataLabel className="basis-[100%] text-right only:hidden">Extras</DataLabel>
      <DataValue className="pt-0.5">
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
      </DataValue>
    </Data>
  )

  const passengerElement = (
    <Data className="[grid-area:passengerElement]">
      <DataLabel>Passenger{passenger.infant && " + Infant"}</DataLabel>
      <DataValue className="gap-2 pt-0.5">
        <Badge variant="secondary">
          <TNums content={passenger.id} />
        </Badge>
        {passenger.firstName} {passenger.lastName}
      </DataValue>
      {passenger.infant && (
        <DataValue className="gap-2 pt-0.5">
          <Badge variant="secondary">
            <TNums content={passenger.infant.id} />
          </Badge>
          {formatInfantPassengerTitle(passenger.infant)} (Infant)
        </DataValue>
      )}
    </Data>
  )

  const seatElement = (
    <Data align="right" className="[grid-area:seatElement]">
      <DataLabel>Seat</DataLabel>
      <DataValue icon={iconFromSeat(passenger.selectedSeat)}>
        {passenger.selectedSeat} {passenger.selectedSeatType}
      </DataValue>
    </Data>
  )

  const dateElement = (
    <Data align="right" className="[grid-area:dateElement]">
      <DataLabel>Date</DataLabel>
      <DataValue icon="calendarDateRangeSolid">{format(flight.departureDate, "dd MMM yyyy")}</DataValue>
    </Data>
  )

  const timeElement = (
    <Data align="right" className="[grid-area:timeElement]">
      <DataLabel>Takes Off</DataLabel>
      <DataValue icon={isDepartureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>{format(flight.departureDate, "hh:mm a")}</DataValue>
    </Data>
  )

  const gateClosesElement = (
    <Data align="right" className="[grid-area:gateClosesElement]">
      <DataLabel>Gate Closes</DataLabel>
      <DataValue icon={isGateClosureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>{format(gateClosureDate, "hh:mm a")}</DataValue>
    </Data>
  )

  const barCodeElement = (
    <div className="flex h-full gap-1 [grid-area:barCodeElement]">
      {/* <div className="relative after:absolute after:inset-0 after:border-2 after:border-primary"> */}
      <div className="flex h-28 gap-1">
        <div className="relative h-full w-10">
          <BarCode className="h-full w-10 bg-white invert" />
          <div className="absolute inset-0 z-10 border-2 border-primary" />
        </div>
        <div className="flex  -rotate-180 items-center justify-end gap-x-2 text-xs tracking-wide [writing-mode:vertical-rl]">
          <TNums content={flight.reservationNumber} />
          <TNums content={flight.customerEntitlementsCode} />
          <TNums content={flight.checkInSequenceNumber} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative overflow-hidden rounded-[6px] bg-white text-primary shadow outline outline-[0.5px] outline-tertiary [.threshold_&]:border [.threshold_&]:outline-[0px]">
      <div
        className={cn("absolute inset-0 right-auto w-[6px]", {
          // this might vary depending on whether the user is checked in etc.
          "bg-green-500": true,
        })}
      />
      <div className="events-none absolute inset-0 rounded-[inherit] border border-black/50 mix-blend-overlay" />
      {headerElement}

      <div
        className={cn("grid flex-auto items-start gap-8 p-6")}
        style={{
          gridTemplateColumns: "minmax(0,4fr) minmax(0,2fr) minmax(0,1.5fr) minmax(0,1.5fr) auto",
          gridTemplateAreas: `
            "flightInfoElement flightInfoElement seatElement       dateElement   barCodeElement"
            "flightInfoElement flightInfoElement gateClosesElement timeElement   barCodeElement"
            "passengerElement  passengerElement extrasElement  extrasElement extrasElement"
          `,
        }}
      >
        {flightInfoElement}
        {dateElement}
        {gateClosesElement}
        {timeElement}
        {extrasElement}
        {passengerElement}
        {seatElement}
        {barCodeElement}
      </div>
      {/* <div className="p-6 pt-0 text-sm text-secondary">Bag drop opens at 04:00 and closes at 06:00</div> */}
    </div>
  )
}
