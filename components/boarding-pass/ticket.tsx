/* eslint-disable @typescript-eslint/no-unused-vars */
import { type CSSProperties } from "react"
import { format, sub } from "date-fns"

import { type Airport } from "@/config/airports"
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
      className={cn("flex flex-col gap-x-1 gap-y-1.5", align === "left" ? "items-start text-left" : "items-end text-right", className)}
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
      className={cn("flex items-center gap-1.5 text-sm/4", align === "left" ? "justify-start text-left" : "justify-end text-right", className)}
      {...props}
    >
      <Icon name={icon} className="h-[1em] w-[1em]" />
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
    <svg viewBox="0 0 92 37" className={cn(className)}>
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

export const Ticket = ({ booking, flight, passenger }: { booking: Booking; flight: Flight; passenger: Passenger }) => {
  const gateClosureDate = sub(flight.departureDate, { minutes: 30 })
  const isGateClosureBetween6AMand6PM = gateClosureDate.getHours() >= 6 && gateClosureDate.getHours() < 18
  const isDepartureBetween6AMand6PM = flight.departureDate.getHours() >= 6 && flight.departureDate.getHours() < 18

  const headerElement = (
    <div className="flex items-center justify-between border-b border-dashed border-white/50 px-[--page-inset-small] py-4 text-sm/5">
      <div className="flex items-center gap-3">
        <Icon name="easyJetLogo" className="relative h-5 w-auto [aspect-ratio:91/22]" />
        <div className="font-bold">Boarding pass</div>
      </div>
      <div>
        Flight No. <span className="font-bold">{flight.number}</span>
      </div>
    </div>
  )

  const flightInfoElement = (
    <Grid
      className="gap-1.5 [grid-area:flightInfoElement]"
      style={{
        gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr) minmax(0,3fr)",
        gridTemplateAreas: `
          "departureAirportName     .          arrivalAirportName"
          "departureAirportCode     flightIcon arrivalAirportCode"
          "departureAirportTerminal .          arrivalAirportTerminal"
        `,
      }}
    >
      <DataLabel className="max-w-[unset] self-end [grid-area:departureAirportName]">{flight.departureAirport.name}</DataLabel>
      <DataValue className="text-4xl font-light [grid-area:departureAirportCode]">{flight.departureAirport.code}</DataValue>
      <DataValue className="[grid-area:departureAirportTerminal]">
        {flight.departureAirport.terminal ? `Terminal ${flight.departureAirport.terminal}` : ""}
      </DataValue>
      <FlightIcon className="self-center text-black [grid-area:flightIcon]" />
      <DataLabel align="right" className="max-w-[unset] self-end [grid-area:arrivalAirportName]">
        {flight.arrivalAirport.name}
      </DataLabel>
      <DataValue align="right" className="text-4xl font-light [grid-area:arrivalAirportCode]">
        {flight.arrivalAirport.code}
      </DataValue>
      <DataValue align="right" className="[grid-area:arrivalAirportTerminal]">
        {flight.arrivalAirport.terminal ? `Terminal ${flight.arrivalAirport.terminal}` : ""}
      </DataValue>
    </Grid>
  )

  const extrasElement = (
    <Data align="right" className="flex-row flex-wrap justify-end [grid-area:extrasElement]">
      <DataLabel className="basis-[100%] text-right only:hidden">Extras</DataLabel>
      {flight.extras.hasSpeedyBoarding && (
        <Badge variant="default" icon="servicesIconFastTrackOutlined">
          Speedy Boarding
        </Badge>
      )}
      {flight.extras.hasEasyJetPlusBagDrop && (
        <Badge variant="default" icon="luggageLuggageDropOutlined">
          easyJet Plus Bag Drop
        </Badge>
      )}
      {flight.extras.hasFastTrackSecurity && (
        <Badge variant="default" icon="servicesIconFastTrackOutlined">
          Fast Track Security
        </Badge>
      )}
      {flight.extras.hasMealDeal && (
        <Badge variant="default" icon="facilitiesFoodAndDrinkOutlined">
          Food & Drink Voucher
        </Badge>
      )}
      {booking.bookingFareType === "FLEXI" && (
        <Badge variant="default" icon="calendarFlexiFlightsSolid">
          FLEXI
        </Badge>
      )}
    </Data>
  )

  const passengerElement = (
    <Data className="[grid-area:passengerElement]">
      <DataLabel>Passenger{passenger.infant && " + Infant"}</DataLabel>
      <DataValue className="gap-2">
        <Badge variant="default">
          <TNums content={passenger.id} />
        </Badge>
        {passenger.firstName} {passenger.lastName}
      </DataValue>
      {passenger.infant && (
        <DataValue className="gap-2">
          <Badge variant="default">
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
        <TNums content={passenger.selectedSeat} /> ({passenger.selectedSeatType})
      </DataValue>
    </Data>
  )

  const dateElement = (
    <Data align="right" className="[grid-area:dateElement]">
      <DataLabel>Date</DataLabel>
      <DataValue icon="calendarDateRangeSolid">{format(flight.departureDate, "EEE, dd MMM yyyy")}</DataValue>
    </Data>
  )

  const timeElement = (
    <Data align="right" className="[grid-area:timeElement]">
      <DataLabel>Takes Off</DataLabel>
      <DataValue icon={isDepartureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
        <TNums content={format(flight.departureDate, "hh:mm a")} />
      </DataValue>
    </Data>
  )

  const gateClosesElement = (
    <Data align="right" className="[grid-area:gateClosesElement]">
      <DataLabel>Gate Closes</DataLabel>
      <DataValue icon={isGateClosureBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
        <TNums content={format(gateClosureDate, "hh:mm a")} />
      </DataValue>
    </Data>
  )

  const barCodeElement = (
    <div className="flex h-full gap-1 [grid-area:barCodeElement]">
      <div className="relative after:absolute after:inset-0 after:border-2 after:border-primary">
        <BarCode className="h-full w-10 bg-white invert" />
      </div>
      <div className="flex -rotate-180 items-center justify-between gap-x-4 text-sm tracking-wide [writing-mode:vertical-rl]">
        <TNums content={flight.reservationNumber} />
        <div className="flex items-center justify-end gap-x-4">
          <TNums content={flight.customerEntitlementsCode} />
          <TNums content={flight.checkInSequenceNumber} />
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative overflow-hidden rounded-[6px] bg-orange text-white shadow outline outline-1 outline-black/5">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-black opacity-10 mix-blend-color-dodge" />
      {headerElement}
      <div
        className={cn("grid flex-auto items-start gap-8 p-[--page-inset-small]")}
        style={{
          gridTemplateColumns: "minmax(0,3fr) minmax(0,2fr) minmax(0,2fr) auto",
          gridTemplateAreas: `
            "flightInfoElement seatElement       dateElement   barCodeElement"
            "flightInfoElement gateClosesElement timeElement   barCodeElement"
            "passengerElement  extrasElement     extrasElement barCodeElement"
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

      {/* <div className="p-[--page-inset-small] pt-0 text-sm text-secondary">Bag drop opens at 04:00 and closes at 06:00</div> */}
    </div>
  )
}
