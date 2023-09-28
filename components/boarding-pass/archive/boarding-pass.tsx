"use client"

import React from "react"

import { type IBoardingPass } from "@/lib/boarding-pass"
import { cn } from "@/lib/utils"
import { BarCode } from "@/components/barcode"
import { Icon, type IconName } from "@/components/icon"
import { TNums } from "@/components/tnums"

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
//     <dt className="text-base font-bold uppercase">{title}</dt>
//     <dd className="text-2xl">{value}</dd>
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

// const useBorders = false
// const useContainers = false

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

// const FeaturedIcon = ({ className, icon, ...props }: { className?: string; icon: IconName }) => {
//   return (
//     <div
//       className={cn(
//         "flex h-[--featured-icon-size] w-[--featured-icon-size] shrink-0 items-center justify-center rounded-md-cqi",
//         useBorders ? "border-[length:--border-width] text-primary" : "bg-primary text-white",
//         className
//       )}
//       {...props}
//     >
//       <Icon name={icon} className={cn(useBorders ? "h-[80%] w-[80%]" : "h-[66.6%] w-[66.6%]")} />
//     </div>
//   )
// }

const Grid: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className, ...props }) => {
  return (
    <div className={cn("grid", className)} {...props}>
      {children}
    </div>
  )
}

export interface TicketProps {
  bp: IBoardingPass
}

export const Ticket = ({ bp }: TicketProps) => {
  const {
    dateOfTravel,
    flightNumber,
    seatNumber,
    reservationNumber,
    checkInSequenceNumber,
    extras,
    customerEntitlementsCode,
    passenger,
    infantPassenger,
    departureAirport,
    arrivalAirport,
    gateClosureTime,
    scheduledTimeOfDeparture,
  } = bp

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
              {departureAirport.name}
            </DataLabel>
            <DataValue align="left" className="text-4xl-cqi font-light [grid-area:2/1]">
              {departureAirport.code}
            </DataValue>
            <DataValue align="left" className="[grid-area:3/1]">
              {departureAirport.terminal && `Terminal ${departureAirport.terminal}`}
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
              {arrivalAirport.name}
            </DataLabel>
            <DataValue align="right" className="text-4xl-cqi font-light [grid-area:2/3]">
              {arrivalAirport.code}
            </DataValue>
            <DataValue align="right" className="[grid-area:3/3]">
              {arrivalAirport.terminal && `Terminal ${arrivalAirport.terminal}`}
            </DataValue>
          </Grid>

          {/* passenger information + seat number */}
          <div className="flex w-full items-end justify-between gap-8-cqi gap-x-10-cqi self-end">
            <Data>
              <DataLabel>Passenger{infantPassenger && " + Infant"}</DataLabel>
              <DataValue>
                <TNums content={passenger.documentID} /> / {passenger.firstName} {passenger.lastName}
              </DataValue>
              {infantPassenger && (
                <DataValue>
                  <TNums content={infantPassenger.documentID} /> / {infantPassenger.firstName} {infantPassenger.lastName}
                </DataValue>
              )}
            </Data>

            <Data align="right">
              <DataLabel>Seat</DataLabel>
              <DataValue icon={iconFromSeat(seatNumber)}>
                <TNums content={seatNumber} />
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
                <TNums content={dateOfTravel.formattedValue} />
              </DataValue>
            </Data>
            <Data align="right">
              <DataLabel>Flight</DataLabel>
              <DataValue icon="flightsSolid">
                <TNums content={flightNumber} />
              </DataValue>
            </Data>
            <Data align="right">
              <DataLabel>Gate Closes</DataLabel>
              <DataValue icon={gateClosureTime.isBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
                <TNums content={gateClosureTime.formattedValue} />
              </DataValue>
            </Data>
            <Data align="right">
              <DataLabel>Takes Off</DataLabel>
              <DataValue icon={scheduledTimeOfDeparture.isBetween6AMand6PM ? "lucideSun" : "lucideMoon"}>
                <TNums content={scheduledTimeOfDeparture.formattedValue} />
              </DataValue>
            </Data>
          </Grid>

          {/* extras */}
          {(extras.hasFoodAndDrinkVoucher || extras.hasFastTrackSecurityAllowance || extras.hasFlexiFare) && (
            <Data align="right">
              <DataLabel>Extras</DataLabel>
              {extras.hasFoodAndDrinkVoucher && <DataValue icon="facilitiesFoodAndDrinkSolid">Food & Drink Voucher</DataValue>}
              {extras.hasFastTrackSecurityAllowance && <DataValue icon="servicesIconFastTrackOutlined">Fast Track Security</DataValue>}
              {extras.hasFlexiFare && <DataValue icon="calendarFlexiFlightsSolid">Flexi Fare</DataValue>}
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
            <TNums content={reservationNumber} />
            <div className="flex items-center justify-end gap-x-4-cqi">
              <TNums content={customerEntitlementsCode} />
              <TNums content={checkInSequenceNumber} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// interface InfoSectionProps {
//   className?: string
//   title?: string
//   icon?: IconName
//   children: React.ReactNode
// }

// const InfoSection = ({ className, children, title, icon, ...props }: InfoSectionProps) => {
//   return (
//     <div className={cn("flex items-start justify-start gap-[--spacing-sm]", className)} {...props}>
//       <FeaturedIcon icon={icon} />
//       <div className="flex flex-col gap-1">
//         {title && <div className="text-bp-sm/none font-bold">{title}</div>}
//         <div className="text-bp-sm/normal flex flex-col gap-1">{children}</div>
//       </div>
//     </div>
//   )
// }

// const Info = ({ bp }: IBoardingPassProps) => {
//   const {
//     departureAirport,
//     extras: { seatType, hasSpecialAssistance, hasSpeedyBoarding },
//     bagsAndHoldLuggage: { cabinBagSmall, cabinBagLarge, holdBag15KG, holdBag23KG, holdBag32KG, pram, sportsEquipment },
//   } = bp

//   const hasHoldLuggage = holdBag15KG || holdBag23KG || holdBag32KG || pram || sportsEquipment

//   return (
//     <div className={cn("row-span-2 grid grid-cols-2", useContainers && "rounded-xl border-[length:--border-width]")}>
//       <div className={cn("flex flex-col gap-[--spacing] pr-[--spacing]", useContainers && "p-[--spacing]")}>
//         <div className="text-bp-lg font-bold">Luggage and Bags</div>
//         <div className="flex flex-col gap-[--spacing]">
//           {(hasSpeedyBoarding || cabinBagLarge) && (
//             <div
//               className={cn(
//                 "text-bp-sm flex h-[--featured-icon-size] items-center justify-between gap-[--spacing-sm] rounded-md px-3",
//                 useBorders ? "border-[length:--border-width] text-primary" : "bg-primary text-white"
//               )}
//             >
//               <p className="text-[0.85em] font-bold">Use easyJet Plus Bag Drop</p>
//               <p className="text-[0.75em]/none font-bold uppercase">Speedy Boarding</p>
//             </div>
//           )}
//           {hasSpecialAssistance && (
//             <InfoSection icon="facilitiesWheelchairOutlined">
//               <p>
//                 Please contact a member of staff in the bag drop area who will assist you. Please try to arrive at least 2 hours before your flight.
//               </p>
//             </InfoSection>
//           )}
//           {!hasHoldLuggage && (
//             <InfoSection icon="luggageBagsAdditionalWeightOutlined">
//               <p>You have no hold luggage. Please check your cabin bag fits into the bag gauge and go directly to the departure gate.</p>
//             </InfoSection>
//           )}
//           <InfoSection icon="luggageBagsCabinBagOutlined">
//             <p>
//               You can bring on board ONE small cabin bag, which must fit under the seat in front of you. Max 45 x 36 x 20cm (including any handles or
//               wheels).
//             </p>
//             {cabinBagLarge && (
//               <p>
//                 You can also bring on board ONE large cabin bag, which must fit in the overhead locker. Max 56 x 45 x 25cm (including any handles or
//                 wheels). If there's no room, your large cabin bag will be placed in the hold for free.
//               </p>
//             )}
//           </InfoSection>
//         </div>
//       </div>
//       <div className={cn("flex flex-col gap-[--spacing] border-l-[length:--border-width] pl-[--spacing]", useContainers && "p-[--spacing]")}>
//         <div className="text-bp-lg font-bold">Departures</div>
//         <div className="flex flex-col gap-[--spacing]">
//           {false && (
//             <InfoSection title="Important Information" icon="warningOutlined">
//               <p>
//                 Customers travelling from this airport will need to have an airport printed boarding card which can be collected from our bag drop
//                 desk. Allow extra time to collect your boarding card and get through the airport.
//               </p>
//             </InfoSection>
//           )}
//           <InfoSection icon="copyDocumentOutlined">
//             <p>Photo ID is compulsory on all flights, please have it ready.</p>
//           </InfoSection>
//           {hasSpeedyBoarding && (
//             <InfoSection icon="servicesIconFastTrackOutlined">
//               <p>
//                 You can use fast track security lanes at this airport.{" "}
//                 {false && <>Security control gates are automatically timed to close 30 minutes before your departure.</>}
//               </p>
//             </InfoSection>
//           )}
//           <InfoSection icon="timeOutlined">
//             <p>Allow plenty of time to get through security and to your gate. {!false && <>Gates close 30 minutes before departure.</>}</p>
//           </InfoSection>
//         </div>
//       </div>
//     </div>
//   )
// }

// const Ads = ({ bp }: IBoardingPassProps) => {
//   return (
//     <div className="grid grid-cols-3 gap-[--spacing-lg]">
//       <div className={cn("flex flex-col gap-2 text-xs", useContainers && "rounded-xl border-[length:--border-width] p-[--spacing]")}>
//         <div className="text-bp-base font-bold">Flight Tracker</div>
//         {/* <p>3 easy steps to check your flight status:</p> */}
//         {/* <ol className="list-decimal list-inside space-y-2">
//           <li className="list-item">Go to the Flight Tracker on our mobile app or at easyJet.com</li>
//           <li className="list-item">Search for your flight by route or flight number</li>
//           <li className="list-item">Click to get live updates real-time on the move</li>
//         </ol> */}
//       </div>
//       <div className={cn("flex flex-col gap-2 text-xs", useContainers && "rounded-xl border-[length:--border-width] p-[--spacing]")}>
//         <div className="text-bp-base font-bold">Go Hands Free</div>
//         {/* <p className="text-[0.75em]">£7 | 8€ | CHF9</p> */}
//         {/* <p>Per person each way</p> */}
//         {/* <p>Simply drop your cabin bag at Bag Drop, cruise through the airport hassle free and leave the overhead locker rush behind.</p> */}
//         {/* <p className="text-[0.5em]">
//           Only one cabin bag per person [maximum size 56 x 45 x 25cm including handles and wheels to the easyJet Plus Bag Drop. Bags larger than this
//           will incur the relevant hold bag fee. Customers can remove a small item (45x36x20cm) from their cabin bag and take it on board with them. A
//           family bundle consists of one cabin bag per person (max number of passengers for the group bundle is 5 on a single booking) £16 | 20€ |
//           CHF20.
//         </p> */}
//       </div>
//       <div className={cn("flex flex-col gap-2 text-xs", useContainers && "rounded-xl border-[length:--border-width] p-[--spacing]")}>
//         <div className="text-bp-base font-bold">Tackling Our Carbon Emissions</div>
//         {/* <p>We're the first major airline to offset the carbon emissions from the fuel used for every single flight.</p> */}
//         {/* <p>Visit easyJet.com/sustainability to find out more.</p> */}
//       </div>
//     </div>
//   )
// }

export const BoardingPass = ({ bp }: IBoardingPassProps) => {
  // so this has 2 (3?) different layouts
  // 1. print (no margins, threshold colours and no borders)
  // 2. screen - desktop (margins, full-colour with borders, horizontal layout)
  // 3. screen - mobile? (margins, threshold colours and no borders, vertical layout)

  // print and desktop share the same layout, but print has no margins and desktop has borders

  if (false) {
    return (
      <div>
        <div className="border border-black">
          <div className="p-6">
            {["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl"].map((className) => (
              <p key={className} className={className}>
                {className}
              </p>
            ))}
          </div>
        </div>
        <div className="border border-black @container/pass">
          <div className="p-6-cqi">
            {[
              "text-xs-cqi",
              "text-sm-cqi",
              "text-base-cqi",
              "text-lg-cqi",
              "text-xl-cqi",
              "text-2xl-cqi",
              "text-3xl-cqi",
              "text-4xl-cqi",
              "text-5xl-cqi",
            ].map((className) => (
              <p key={className} className={className}>
                {className}
              </p>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="@container/pass">
        <Ticket bp={bp} />
      </div>
    </>
  )
}
