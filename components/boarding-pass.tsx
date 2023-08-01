"use client"

import React from "react"
import Image from "next/image"
import { cva } from "class-variance-authority"

import { generateBoardingPass, type IBoardingPass } from "@/lib/boarding-pass"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarCode } from "@/components/barcode"
import { Icon, IconName } from "@/components/icon"

const useBorders = false

interface IBoardingPassProps {
  bp: IBoardingPass
}

const iconFromSeat = (seat: string): IconName => {
  // if (seat.includes("A") || seat.includes("F")) return "seatWindow"
  // if (seat.includes("B") || seat.includes("E")) return "seatMiddle"
  // if (seat.includes("C") || seat.includes("D")) return "seatAisle"
  if (seat.includes("A") || seat.includes("F")) return "seatsSideSolid"
  if (seat.includes("B") || seat.includes("E")) return "seatsSideSolid"
  if (seat.includes("C") || seat.includes("D")) return "seatsSideSolid"
}

const TNums: React.FC<{
  text: string
}> = ({ text, ...props }) => {
  return (
    <div className="inline-flex" {...props}>
      {text.split("").map((char, index) =>
        isNaN(Number(char)) ? (
          <div key={`${char}-${index}`}>{char}</div>
        ) : char === " " ? (
          <div key={`${char}-${index}`} className="inline-block w-[0.375ch] max-w-[0.375ch] min-w-[0.375ch] text-center">
            {char}
          </div>
        ) : (
          <div key={`${char}-${index}`} className="inline-block w-[1ch] max-w-[1ch] min-w-[1ch] text-center">
            {char}
          </div>
        )
      )}
    </div>
  )
}

const FlightConnectionIcon = () => {
  return (
    <div className="flex items-center justify-center gap-[8px] [--dot-gap:4px] [--dot-size:3px] [--departs-dot-size:6px] [--arrives-dot-size:6px]">
      <div className="flex items-center gap-[--dot-gap]">
        <div
          className={cn("rounded-full h-[--departs-dot-size] w-[--departs-dot-size]", useBorders ? "border-[length:--border-width]" : "bg-primary")}
        />
        <div className="rounded-full h-[--dot-size] w-[--dot-size] bg-primary" />
        <div className="rounded-full h-[--dot-size] w-[--dot-size] bg-primary" />
        <div className="rounded-full h-[--dot-size] w-[--dot-size] bg-primary" />
      </div>
      <Icon name="searchAndMenuAirplaneModeAltSolid" className="h-8 w-8" />
      <div className="flex items-center gap-[--dot-gap]">
        <div className="rounded-full h-[--dot-size] w-[--dot-size] bg-primary" />
        <div className="rounded-full h-[--dot-size] w-[--dot-size] bg-primary" />
        <div className="rounded-full h-[--dot-size] w-[--dot-size] bg-primary" />
        <div
          className={cn("rounded-full h-[--arrives-dot-size] w-[--arrives-dot-size]", useBorders ? "border-[length:--border-width]" : "bg-primary")}
        />
      </div>
    </div>
  )
}

const Data = ({ className, align = "left", ...props }: { className?: string; align?: "left" | "right"; children: React.ReactNode }) => {
  return <div className={cn("flex flex-col gap-1", align === "left" ? "items-start text-left" : "items-end text-right", className)} {...props} />
}

const DataLabel = ({ className, children, ...props }: { className?: string; children: React.ReactNode }) => {
  return (
    <div className={cn("font-bold text-bp-sm", className)} {...props}>
      <span>{children}</span>
    </div>
  )
}

const DataValue = ({ className, children, icon, ...props }: { className?: string; icon?: IconName; children: React.ReactNode }) => {
  return (
    <div className={cn("inline-flex items-center gap-[0.375ch]", className)} {...props}>
      <Icon name={icon} className="h-[1em] w-[1em]" />
      <span>{children}</span>
    </div>
  )
}

const FeaturedIcon = ({ className, icon, ...props }: { className?: string; icon: IconName }) => {
  return (
    <div
      className={cn(
        "flex items-center shrink-0 justify-center h-[--featured-icon-size] w-[--featured-icon-size] rounded-lg",
        useBorders ? "border-[length:--border-width] text-primary" : "bg-primary text-white",
        className
      )}
      {...props}
    >
      <Icon name={icon} className={cn(useBorders ? "w-[80%] h-[80%]" : "w-[66.6%] h-[66.6%]")} />
    </div>
  )
}

const Ticket = ({ bp }: IBoardingPassProps) => {
  const {
    dateOfTravel,
    flightNumber,
    gateClosureTime,
    seatNumber,
    reservationNumber,
    checkInSequenceNumber,
    checkedInLuggageBooked,
    fastTrackSecurityAllowance,
    flexiFarePurchase,
    customerEntitlementsCode,
    passenger,
    infantPassenger,
    departureAirport,
    arrivalAirport,
    scheduledTimeOfDeparture,
  } = bp

  return (
    <div className="flex gap-[--spacing] gap-x-[--spacing-lg] p-[--spacing] border-[length:--border-width] rounded-xl">
      {/* variable width column */}
      <div className="flex flex-col gap-x-[--spacing-lg] items-start justify-between">
        {/* easyJet logo + title */}
        <div className="flex items-start justify-start gap-[--spacing-sm] w-full">
          <div className="h-[theme('fontSize.bp-lg')] max-h-[theme('fontSize.bp-lg')] w-contents flex items-center justify-start">
            <Icon name="easyJetLogo" className="h-[5mm] relative top-[0%] w-auto [aspect-ratio:91/22]" />
          </div>

          {/* <div className="font-bold text-bp-sm px-[9px] py-[3.5px] bg-primary rounded-full text-white">Boarding Pass</div> */}
          <div className="font-bold text-bp-lg text-primary">Boarding Pass</div>
        </div>

        {/* departure airport + arrival airport */}
        <div className="flex items-end justify-between gap-[--page-inset] w-full">
          <Data>
            <DataLabel className="max-w-[unset]">{departureAirport.name}</DataLabel>
            <DataValue icon={undefined} className="text-bp-xl font-light">
              {departureAirport.code}
            </DataValue>
          </Data>

          <FlightConnectionIcon />

          <Data align="right">
            <DataLabel className="max-w-[unset]">{arrivalAirport.name}</DataLabel>
            <DataValue icon={undefined} className="text-bp-xl font-light">
              {arrivalAirport.code}
            </DataValue>
          </Data>
        </div>

        {/* passenger information + seat number */}
        <div className="flex items-end gap-[--spacing] gap-x-[--spacing-lg] justify-between w-full">
          <Data>
            <DataLabel>Passenger{infantPassenger && " + Infant"}</DataLabel>
            <DataValue icon="promoFilterIconsExploreOnFootAltSolid">
              <TNums text={passenger.passportNumber} /> / {passenger.firstName} {passenger.lastName}
            </DataValue>
            {infantPassenger && (
              <DataValue icon="infantSolid">
                <TNums text={infantPassenger.passportNumber} /> / {infantPassenger.firstName} {infantPassenger.lastName}
              </DataValue>
            )}
          </Data>

          <Data align="right">
            <DataLabel>Seat</DataLabel>
            <DataValue icon={iconFromSeat(seatNumber)}>
              <TNums text={seatNumber} />
            </DataValue>
          </Data>
        </div>
      </div>

      {/* constant width column */}
      <div className="flex flex-col flex-auto gap-[--spacing] gap-x-[--spacing-lg] items-end justify-between">
        {/* date + flight number */}
        <div className="flex items-start gap-[--spacing] gap-x-[--spacing-lg]">
          <Data align="right">
            <DataLabel>Date</DataLabel>
            <DataValue icon="calendarDateRangeSolid">
              <TNums text={dateOfTravel} />
            </DataValue>
          </Data>

          <Data align="right">
            <DataLabel>Flight</DataLabel>
            <DataValue icon="flightsSolid">
              <TNums text={flightNumber} />
            </DataValue>
          </Data>
        </div>

        {/* icons */}
        <div className="flex items-start gap-[--spacing-sm]">
          {[
            {
              visible: checkedInLuggageBooked,
              icon: "luggageBagsAdditionalWeightOutlined" satisfies IconName,
            },
            {
              visible: fastTrackSecurityAllowance,
              icon: "servicesIconFastTrackOutlined" satisfies IconName,
            },
            {
              visible: flexiFarePurchase,
              icon: "calendarFlexiFlightsSolid" satisfies IconName,
            },
          ]
            .filter((o) => o.visible)
            .map(({ icon }, index) => (
              <FeaturedIcon key={index} icon={icon} />
            ))}
        </div>

        {/* gate closes time + departure time (merged) */}
        {/* <div className="flex items-start gap-[--spacing] gap-x-[--spacing-lg]">
          <Data align="right">
            <DataLabel>Gate Closes / Departs</DataLabel>
            <DataValue icon="timeOutlined">
              <TNums text={`${gateClosureTime} / ${scheduledTimeOfDeparture}`} />
            </DataValue>
          </Data>
        </div> */}

        {/* gate closes time + departure time */}
        <div className="flex items-start gap-[--spacing] gap-x-[--spacing-lg]">
          <Data align="right">
            <DataLabel>Gate Closes</DataLabel>
            <DataValue icon="timeOutlined">
              <TNums text={gateClosureTime} />
            </DataValue>
          </Data>

          <Data align="right">
            <DataLabel>Departs</DataLabel>
            <DataValue icon="flightTakeoffSolid">
              <TNums text={scheduledTimeOfDeparture} />
            </DataValue>
          </Data>
        </div>
      </div>

      {/* constant width barcode column */}
      <div className="flex gap-[0.375ch]">
        {/* barcode */}
        <BarCode className="h-full w-10 bg-white" />

        {/* reservation number + customer entitlements code + check-in sequence number */}
        <div className="flex items-center gap-x-[--spacing-sm] justify-between [writing-mode:vertical-rl] -rotate-180 text-bp-sm">
          <TNums text={reservationNumber} />
          <div className="flex items-center justify-end gap-x-[--spacing-sm]">
            <TNums text={customerEntitlementsCode} />
            <TNums text={checkInSequenceNumber} />
          </div>
        </div>
      </div>
    </div>
  )
}

const InfoSection = ({
  className,
  children,
  title,
  icon,
  ...props
}: {
  className?: string
  title?: string
  icon?: IconName
  children: React.ReactNode
}) => {
  return (
    <div className={cn("flex items-start justify-start gap-[--spacing-sm]", className)} {...props}>
      <FeaturedIcon icon={icon} />
      <div className="flex flex-col gap-1">
        {title && <div className="font-bold text-bp-sm leading-none trim-start">{title}</div>}
        <div className="flex flex-col gap-1 text-bp-sm leading-normal">{children}</div>
      </div>
    </div>
  )
}

const Info = ({ bp }: IBoardingPassProps) => {
  const {
    departureAirport,
    extras: { seatType, hasSpecialAssistance, hasHoldBag, hasLargeCabinBag, hasSpeedyBoarding },
    development: { showAirportSpecificInformation },
  } = bp
  return (
    <div className="grid grid-cols-2 border-[length:--border-width] rounded-xl row-span-2">
      <div className="flex flex-col gap-[--spacing] p-[--spacing]">
        <div className="font-bold text-bp-lg">Luggage and Bags</div>
        <div className="flex flex-col gap-[--spacing]">
          {(hasSpeedyBoarding || hasLargeCabinBag) && (
            <div
              className={cn(
                "flex items-center justify-between gap-[--spacing-sm] px-4 h-[--featured-icon-size] rounded-full text-bp-sm",
                useBorders ? "border-[length:--border-width] text-primary" : "bg-primary text-white"
              )}
            >
              <p className="[font-size:0.85em]">Use easyJet Plus Bag Drop</p>
              <p className="[font-size:0.75em] leading-none uppercase font-bold">Speedy Boarding</p>
            </div>
          )}
          {hasSpecialAssistance && (
            <InfoSection icon="facilitiesWheelchairOutlined">
              <p>
                Please contact a member of staff in the bag drop area who will assist you. Please try to arrive at least 2 hours before your flight.
              </p>
            </InfoSection>
          )}
          {!hasHoldBag && (
            <InfoSection icon="luggageBagsAdditionalWeightOutlined">
              <p>You have no hold luggage. Please check your cabin bag fits into the bag gauge and go directly to the departure gate.</p>
            </InfoSection>
          )}
          <InfoSection icon="luggageBagsCabinBagOutlined">
            <p>
              You can bring on board ONE small cabin bag, which must fit under the seat in front of you. Max 45 x 36 x 20cm (including any handles or
              wheels).
            </p>
            {hasLargeCabinBag && (
              <>
                <p>
                  You can also bring on board ONE large cabin bag, which must fit in the overhead locker. Max 56 x 45 x 25cm (including any handles or
                  wheels). If there's no room, your large cabin bag will be placed in the hold for free.
                </p>
              </>
            )}
          </InfoSection>
        </div>
      </div>
      <div className="flex flex-col gap-[--spacing] p-[--spacing] border-l-[length:--border-width]">
        <div className="font-bold text-bp-lg">Departures</div>
        <div className="flex flex-col gap-[--spacing]">
          {showAirportSpecificInformation && (
            <InfoSection title="Important Information" icon="warningOutlined">
              <p>
                Customers travelling from this airport will need to have an airport printed boarding card which can be collected from our bag drop
                desk. Allow extra time to collect your boarding card and get through the airport.
              </p>
            </InfoSection>
          )}
          <InfoSection icon="copyDocumentOutlined">
            <p>Photo ID is compulsory on all flights, please have it ready.</p>
          </InfoSection>
          {hasSpeedyBoarding && (
            <InfoSection icon="servicesIconFastTrackOutlined">
              <p>
                You can use fast track security lanes at this airport.{" "}
                {showAirportSpecificInformation && <>Security control gates are automatically timed to close 30 minutes before your departure.</>}
              </p>
            </InfoSection>
          )}
          <InfoSection icon="timeOutlined">
            <p>
              Allow plenty of time to get through security and to your gate.{" "}
              {!showAirportSpecificInformation && <>Gates close 30 minutes before departure.</>}
            </p>
          </InfoSection>
        </div>
      </div>
    </div>
  )
}

const Ads = ({ bp }: IBoardingPassProps) => {
  return (
    <div className="grid grid-cols-3 gap-[--spacing-lg]">
      <div className="flex flex-col gap-2 p-[--spacing] border-[length:--border-width] rounded-xl text-bp-sm">
        <div className="font-bold text-bp-base">Flight Tracker</div>
        <p>3 easy steps to check your flight status:</p>
        <ol className="list-decimal list-inside space-y-2">
          <li className="list-item">Go to the Flight Tracker on our mobile app or at easyJet.com</li>
          <li className="list-item">Search for your flight by route or flight number</li>
          <li className="list-item">Click to get live updates real-time on the move</li>
        </ol>
      </div>
      <div className="flex flex-col gap-2 p-[--spacing] border-[length:--border-width] rounded-xl text-bp-sm">
        <div className="font-bold text-bp-base">Go Hands Free</div>
        {/* <p className="[font-size:0.75em]">£7 | 8€ | CHF9</p> */}
        <p>Per person each way</p>
        <p>Simply drop your cabin bag at Bag Drop, cruise through the airport hassle free and leave the overhead locker rush behind.</p>
        {/* <p className="[font-size:0.5em]">
          Only one cabin bag per person [maximum size 56 x 45 x 25cm including handles and wheels to the easyJet Plus Bag Drop. Bags larger than this
          will incur the relevant hold bag fee. Customers can remove a small item (45x36x20cm) from their cabin bag and take it on board with them. A
          family bundle consists of one cabin bag per person (max number of passengers for the group bundle is 5 on a single booking) £16 | 20€ |
          CHF20.
        </p> */}
      </div>
      <div className="flex flex-col gap-2 p-[--spacing] border-[length:--border-width] rounded-xl text-bp-sm">
        <div className="font-bold text-bp-base">Tackling Our Carbon Emissions</div>
        <p>We're the first major airline to offset the carbon emissions from the fuel used for every single flight.</p>
        <p>Visit easyJet.com/sustainability to find out more.</p>
      </div>
    </div>
  )
}

export const BoardingPass = ({ bp: defaultBp }: IBoardingPassProps) => {
  const [bp, setBp] = React.useState<IBoardingPass>(defaultBp)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "r") {
        setBp(generateBoardingPass())
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <div className="group/pass text-bp-base relative grid grid-rows-4 grid-cols-1 screen:p-[--margin] gap-[calc(var(--margin)*2)] print:h-[calc(100vh-var(--margin))] mx-auto print:w-[calc(100vw-var(--margin))]">
      <div className="absolute inset-y-0 print:-inset-y-[--margin] print:inset-x-0 screen:inset-x-[--margin] flex flex-col justify-between pointer-events-none touch-none">
        <div className="border-t border-dashed opacity-0" />
        <div className="border-t border-dashed opacity-100" />
        <div className="border-t border-dashed opacity-0" />
        <div className="border-t border-dashed opacity-100" />
        <div className="border-t border-dashed opacity-0" />
      </div>
      <Ticket bp={bp} />
      <Info bp={bp} />
      <Ads bp={bp} />
    </div>
  )
  return (
    <div className="group/pass text-bp-base relative grid grid-rows-4 grid-cols-1 p-[--margin] gap-[calc(var(--margin)*2)] max-h-[297mm] max-w-[210mm] w-full h-[297mm] overflow-hidden mx-auto">
      <div className="absolute inset-y-0 inset-x-[--margin] flex flex-col justify-between pointer-events-none touch-none">
        <div className="border-t border-dashed opacity-0" />
        <div className="border-t border-dashed opacity-100" />
        <div className="border-t border-dashed opacity-0" />
        <div className="border-t border-dashed opacity-100" />
        <div className="border-t border-dashed opacity-0" />
      </div>
      <Ticket bp={bp} />
      <Info bp={bp} />
      <Ads bp={bp} />
    </div>
  )
}

// const cutoutStyle = cva(
//   "rounded-full h-[--pass-cutout-size] w-[--pass-cutout-size] absolute border border-[--pass-border-color] mx-[0px] bg-white",
//   {
//     variants: {
//       align: {
//         left: "left-0 -translate-x-1/2",
//         right: "right-0 translate-x-1/2",
//       },
//     },
//   }
// )

// const Data = ({
//   title,
//   value,
//   className,
// }: {
//   title: string
//   value: string
//   className?: string
// }) => (
//   <dl
//     className={cn(
//       "flex flex-col gap-2.5 justify-start flex-shrink-0 max-w-max",
//       className
//     )}
//   >
//     <dt className="text-base trim-both font-bold uppercase">{title}</dt>
//     <dd className="text-2xl trim-both">{value}</dd>
//   </dl>
// )

// export const BoardingPass = ({ boardingPass }: IBoardingPassProps) => {
//   console.log(boardingPass)

//   return (
//     <div className="group/pass relative grid gap-[--page-inset-large] rounded-2xl bg-orange text-white p-[--page-inset] ring-1 ring-[--pass-border-color] ring-inset overflow-hidden">
//       <div className="flex items-start justify-between gap-[--page-inset]">
//         <Icon
//           name="easyJetLogo"
//           className="w-40 [aspect-ratio:91/22] flex-shrink-0"
//         />
//         <div className="flex-auto shrink" />
//         <Data
//           title="Gate"
//           value={boardingPass.departureAirport.terminal}
//           align="right"
//         />
//         <Data
//           title="Seat"
//           value={boardingPass.seatNumber}
//           align="right"
//         />
//       </div>
//       <div className="flex items-end justify-between gap-[--page-inset]">
//         <Data
//           title="Departure"
//           value={boardingPass.departureAirport.code}
//           className="items-start [&>dd]:text-6xl [&>dd]:font-light"
//         />
//         <div className="flex-auto shrink" />
//         <div className="flex items-center justify-center gap-6">
//           <div className="flex items-center gap-3">
//             <div className="rounded-full h-1 w-1 bg-white" />
//             <div className="rounded-full h-1 w-1 bg-white" />
//             <div className="rounded-full h-1 w-1 bg-white" />
//           </div>
//           <Icon
//             name="searchAndMenuAirplaneModeAltSolid"
//             className="h-12 w-12"
//           />
//           <div className="flex items-center gap-3">
//             <div className="rounded-full h-1 w-1 bg-white" />
//             <div className="rounded-full h-1 w-1 bg-white" />
//             <div className="rounded-full h-1 w-1 bg-white" />
//           </div>
//         </div>
//         <div className="flex-auto shrink" />
//         <Data
//           title="Arrival"
//           value={boardingPass.arrivalAirport.code}
//           className="items-end [&>dd]:text-6xl [&>dd]:font-light"
//         />
//       </div>
//       <div className="mx-[calc(var(--pass-cutout-margin)*-1)] w-[calc(100%+var(--pass-cutout-margin)*2)] h-[--pass-cutout-size] overflow-x-hidden relative">
//         <div className={cutoutStyle({ align: "left" })} />
//         <div className={cutoutStyle({ align: "right" })} />
//       </div>
//       <div className="flex items-start justify-between gap-[--page-inset]">
//         <Data
//           title="Flight"
//           value={boardingPass.flightNumber}
//           className="items-start [&>dd]:text-xl"
//         />
//         <Data
//           title="Date"
//           value={boardingPass.dateOfTravel}
//           className="items-start [&>dd]:text-xl"
//         />
//         <Data
//           title="Boarding"
//           value={boardingPass.gateClosureTime}
//           className="items-start [&>dd]:text-xl"
//         />
//         <div className="flex-auto shrink" />
//         <Data
//           title="Class"
//           value={boardingPass.seatNumber}
//           className="items-end [&>dd]:text-xl"
//         />
//       </div>
//       <div className="flex items-start justify-between gap-[--page-inset]">
//         <Data
//           title="Passenger"
//           value={`${boardingPass.passenger.firstName} ${boardingPass.passenger.lastName}`}
//           className="items-start [&>dd]:text-xl"
//         />
//         <div className="flex-auto shrink" />
//         <Data
//           title="Status"
//           value="Checked in"
//           className="items-end [&>dd]:text-xl"
//         />
//       </div>
//       <div className="h-[20vh]"></div>
//     </div>
//   )
// }
