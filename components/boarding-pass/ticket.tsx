import { format } from "date-fns"

import { Flight, type Booking } from "@/config/booking"
import { cn } from "@/lib/utils"
import { BarCode } from "@/components/barcode"
import { Icon, type IconName } from "@/components/icon"
import { TNums } from "@/components/tnums"

const Data = ({ className, align = "left", ...props }: { className?: string; align?: "left" | "right"; children: React.ReactNode }) => {
  return <div className={cn("flex flex-col gap-1-cqi", align === "left" ? "items-start text-left" : "items-end text-right", className)} {...props} />
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
    <div
      className={cn(
        "min-h-[theme('spacing[4-cqi]')] min-w-[1ch] bg-[--dev-2] text-sm-cqi/4-cqi font-bold",
        align === "left" ? "justify-self-start text-left" : "justify-self-end text-right",
        className
      )}
      {...props}
    >
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
        "flex min-h-[theme('spacing[6-cqi]')] min-w-[1ch] items-center gap-1.5-cqi bg-[--dev-1] text-base-cqi/6-cqi",
        align === "left" ? "justify-self-start text-left" : "justify-self-end text-right",
        className
      )}
      {...props}
    >
      <Icon name={icon} className="h-[1em] w-[1em]" />
      {children}
    </div>
  )
}

const Grid: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className, ...props }) => {
  return (
    <div className={cn("grid", className)} {...props}>
      {children}
    </div>
  )
}

export const Ticket = ({ flight }: { flight: Flight }) => {
  return (
    <div className="flex overflow-hidden rounded-xl bg-white text-base-cqi shadow-xl ring-1 ring-black/5">
      <div className="h-[inherit] w-[4px] bg-orange" />
      <div className="flex w-full gap-x-10-cqi gap-y-8-cqi p-8-cqi">
        {/* variable width column */}
        <Grid className="grid-cols-1 grid-rows-3 items-start justify-between gap-x-10-cqi gap-y-8-cqi">
          {/* easyJet logo + title */}
          <div className="flex w-full items-center justify-start gap-4-cqi">
            <Icon name="easyJetLogo" className="relative h-7-cqi w-auto [aspect-ratio:91/22]" />
            <div className="rounded-full bg-primary px-3-cqi py-1.5-cqi text-sm-cqi/none font-bold text-white">Boarding Pass</div>
            {/* <div className="text-lg-cqi/none font-bold text-primary">Boarding Pass</div> */}
          </div>

          {/* departure airport + arrival airport */}
          <Grid className="grid-cols-[minmax(0,max-content)_minmax(0,1fr)_minmax(0,max-content)] gap-x-6-cqi gap-y-1-cqi">
            <DataLabel align="left" className="max-w-[unset] [grid-area:1/1]">
              {flight.departureAirport.name}
            </DataLabel>
            <DataValue align="left" className="text-4xl-cqi font-light [grid-area:2/1]">
              {flight.departureAirport.code}
            </DataValue>
            <DataValue align="left" className="[grid-area:3/1]">
              {flight.departureAirport.terminal && `Terminal ${flight.departureAirport.terminal}`}
            </DataValue>
            <div className="flex items-center justify-center gap-2-cqi [grid-area:span_3/2]">
              <div className="flex items-center gap-1-cqi">
                <div className="h-1.5-cqi w-1.5-cqi rounded-full bg-primary" />
                <div className="h-1-cqi w-1-cqi rounded-full bg-primary" />
                <div className="h-1-cqi w-1-cqi rounded-full bg-primary" />
                <div className="h-1-cqi w-1-cqi rounded-full bg-primary" />
              </div>
              <Icon name="searchAndMenuAirplaneModeAltSolid" className="h-8-cqi w-8-cqi" />
              <div className="flex items-center gap-1-cqi">
                <div className="h-1-cqi w-1-cqi rounded-full bg-primary" />
                <div className="h-1-cqi w-1-cqi rounded-full bg-primary" />
                <div className="h-1-cqi w-1-cqi rounded-full bg-primary" />
                <div className="h-1.5-cqi w-1.5-cqi rounded-full bg-primary" />
              </div>
            </div>
            <DataLabel align="right" className="max-w-[unset] [grid-area:1/3]">
              {flight.arrivalAirport.name}
            </DataLabel>
            <DataValue align="right" className="text-4xl-cqi font-light [grid-area:2/3]">
              {flight.arrivalAirport.code}
            </DataValue>
            <DataValue align="right" className="[grid-area:3/3]">
              {flight.arrivalAirport.terminal && `Terminal ${flight.arrivalAirport.terminal}`}
            </DataValue>
          </Grid>

          {/* passenger information + seat number */}
          <div className="flex w-full items-end justify-between gap-8-cqi gap-x-10-cqi self-end">
            <Data>
              <DataLabel>Passenger{flight.infantPassenger && " + Infant"}</DataLabel>
              <DataValue>
                <TNums content={flight.passenger.documentID} /> / {flight.passenger.firstName} {flight.passenger.lastName}
              </DataValue>
              {infantPassenger && (
                <DataValue>
                  <TNums content={flight.infantPassenger.documentID} /> / {flight.infantPassenger.firstName} {flight.infantPassenger.lastName}
                </DataValue>
              )}
            </Data>

            <Data align="right">
              <DataLabel>Seat</DataLabel>
              <DataValue icon={iconFromSeat(flight.seatNumber)}>
                <TNums content={flight.seatNumber} />
              </DataValue>
            </Data>
          </div>
        </Grid>

        {/* constant width column */}
        <div className="flex flex-auto flex-col items-end justify-between gap-8-cqi gap-x-10-cqi">
          {/* date + flight number */}
          <Grid className="grid-cols-2 gap-8-cqi gap-x-10-cqi">
            <Data align="right">
              <DataLabel>Date</DataLabel>
              <DataValue icon="calendarDateRangeSolid">
                <TNums content={flight.dateOfTravel.formattedValue} />
              </DataValue>
            </Data>
            <Data align="right">
              <DataLabel>Flight</DataLabel>
              <DataValue icon="flightsSolid">
                <TNums content={flight.flightNumber} />
              </DataValue>
            </Data>
            <Data align="right">
              <DataLabel>Gate Closes</DataLabel>
              <DataValue icon={flight.gateClosureTime.isBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
                <TNums content={flight.gateClosureTime.formattedValue} />
              </DataValue>
            </Data>
            <Data align="right">
              <DataLabel>Takes Off</DataLabel>
              <DataValue icon={flight.scheduledTimeOfDeparture.isBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
                <TNums content={flight.scheduledTimeOfDeparture.formattedValue} />
              </DataValue>
            </Data>
          </Grid>

          {/* extras */}
          {(flight.extras.hasFoodAndDrinkVoucher || flight.extras.hasFastTrackSecurityAllowance || flight.extras.hasFlexiFare) && (
            <Data align="right">
              <DataLabel>Extras</DataLabel>
              {flight.extras.hasFoodAndDrinkVoucher && <DataValue icon="facilitiesFoodAndDrinkSolid">Food & Drink Voucher</DataValue>}
              {flight.extras.hasFastTrackSecurityAllowance && <DataValue icon="servicesIconFastTrackOutlined">Fast Track Security</DataValue>}
              {flight.extras.hasFlexiFare && <DataValue icon="calendarFlexiFlightsSolid">Flexi Fare</DataValue>}
            </Data>
          )}
        </div>

        {/* constant width barcode column */}
        <div className="flex gap-1-cqi">
          {/* barcode */}
          <div className="relative after:absolute after:inset-0 after:border-2 after:border-primary">
            <BarCode className="h-full w-10-cqi bg-white invert" />
          </div>

          {/* reservation number + customer entitlements code + check-in sequence number */}
          <div className="flex -rotate-180 items-center justify-between gap-x-4-cqi text-sm-cqi tracking-wide [writing-mode:vertical-rl]">
            <TNums content={flight.reservationNumber} />
            <div className="flex items-center justify-end gap-x-4-cqi">
              <TNums content={flight.customerEntitlementsCode} />
              <TNums content={flight.checkInSequenceNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
