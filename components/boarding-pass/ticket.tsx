/* eslint-disable @typescript-eslint/no-unused-vars */
import { format, sub } from "date-fns"

import { type Booking, type Flight, type Passenger } from "@/config/booking"
import { cn } from "@/lib/utils"
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

const cardStyles = "bg-white shadow rounded-[6px] outline outline-1 outline-black/5"

const FlightIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 56 29" className={cn(className)}>
      <ellipse cx="53.2893" cy="14.5622" rx="2.13158" ry="2.27068" fill="currentColor" />
      <ellipse cx="2.13158" cy="14.5622" rx="2.13158" ry="2.27068" fill="currentColor" />
      <line x1="4.26318" y1="14.8184" x2="51.1579" y2="14.8184" stroke="currentColor" strokeDasharray="2 2" />
      <path
        d="M24.0897 28.9404C24.5796 28.9404 25.0287 28.6528 25.3009 28.1988L31.6838 16.8321L39.169 16.8321C40.2986 16.8321 41.2104 15.818 41.2104 14.5617C41.2104 13.3055 40.2986 12.2915 39.169 12.2915L31.6838 12.2915L25.3009 0.924726C25.0423 0.470663 24.5796 0.183105 24.0897 0.183105C23.137 0.183105 22.4429 1.21228 22.7287 2.24149L25.5595 12.2915L18.0743 12.2915L16.237 9.56709C16.1145 9.37033 15.9104 9.26437 15.6926 9.26437L14.8897 9.26437C14.4405 9.26437 14.1139 9.74872 14.2364 10.2331L15.3524 14.5617L14.2364 18.8905C14.1139 19.3748 14.4405 19.8592 14.8897 19.8592L15.6926 19.8592C15.9104 19.8592 16.1145 19.7532 16.237 19.5564L18.0743 16.8321L25.5595 16.8321L22.7287 26.882C22.4429 27.9112 23.137 28.9404 24.0897 28.9404Z"
        fill="currentColor"
      />
    </svg>
  )
}

export const Ticket = ({ booking, flight, passenger }: { booking: Booking; flight: Flight; passenger: Passenger }) => {
  const gateClosureDate = sub(flight.departureDate, { minutes: 30 })
  const isGateClosureBetween6AMand6PM = gateClosureDate.getHours() >= 6 && gateClosureDate.getHours() < 18
  const isDepartureBetween6AMand6PM = flight.departureDate.getHours() >= 6 && flight.departureDate.getHours() < 18

  return (
    <div className={cn("overflow-hidden", cardStyles, "border-l-[6px] border-l-green-600")}>
      <div className="flex items-center justify-between border-b px-[--page-inset-small] py-4 text-sm/5">
        <div className="flex items-center gap-2">
          <Icon name="easyJetLogo" className="relative h-5 w-auto translate-y-[-0.5px] [aspect-ratio:91/22]" />
          <div className="font-bold">{format(flight.departureDate, "d MMM yyyy")}</div>
        </div>

        <div>
          Flight No. <span className="font-bold">{flight.number}</span>
        </div>
      </div>

      <div className="grid">
        <div></div>
      </div>

      {/* <div className="grid grid-cols-[1fr_max-content_1fr_0.2fr] items-start gap-12 p-[--page-inset-small]">
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-secondary">Departing</div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold">{flight.departureAirport.name}</span>{" "}
            <span className="ml-0.5 align-text-top text-sm text-secondary">({flight.departureAirport.code})</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span>{format(flight.departureDate, "EEE d MMMM yyyy 'at' HH:mm")}</span>
            {flight.departureAirport.terminal && (
              <>
                <span>•</span>
                <span>Terminal {flight.departureAirport.terminal}</span>
              </>
            )}
          </div>
        </div>
        <FlightIcon className="w-16 self-center text-gray-300" />
        <div>
          <div className="text-xs font-bold uppercase tracking-wide text-secondary">Arriving</div>
          <div className="mt-2.5">
            <span className="text-2xl font-bold">{flight.arrivalAirport.name}</span>{" "}
            <span className="ml-0.5 align-text-top text-sm text-secondary">({flight.arrivalAirport.code})</span>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <span>{format(flight.arrivalDate, "EEE d MMMM yyyy 'at' HH:mm")}</span>
            {flight.arrivalAirport.terminal && (
              <>
                <span>•</span>
                <span>Terminal {flight.arrivalAirport.terminal}</span>
              </>
            )}
          </div>
        </div>
      </div> */}

      {/* <div className="p-[--page-inset-small] pt-0 text-sm text-secondary">Bag drop opens at 04:00 and closes at 06:00</div> */}
    </div>
  )
}
