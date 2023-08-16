import { differenceInHours, differenceInMinutes, format, sub } from "date-fns"

import { type IBoardingPass } from "@/lib/boarding-pass"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"
import { TNums } from "@/components/tnums"

export interface TimelineProps {
  bp: IBoardingPass
}

export const Timeline = ({ bp }: TimelineProps) => {
  const hoursUntil = differenceInHours(bp.dateOfArrival.value, bp.dateOfTravel.value)
  const minutesUntil = differenceInMinutes(bp.dateOfArrival.value, bp.dateOfTravel.value) - hoursUntil * 60

  const timeline = [
    {
      content: "Arrive at the airport",
      notes: "Have your printed boarding card with you.",
      date: sub(bp.dateOfTravel.value, { minutes: 150 }),
      icon: "walkingSolid" as IconName,
      iconBackground: "bg-slate-500",
    },
    {
      content: "Security check",
      notes: "Have your boarding card and travel document ready for inspection.",
      date: sub(bp.dateOfTravel.value, { minutes: 90 }),
      icon: "checkmark" as IconName,
      iconBackground: "bg-blue-500",
    },
    {
      content: "Gate opens",
      notes: (
        <>
          <div>{"Your bag size will be checked at the gate."}</div>
          <div className="mt-2">{"Have your boarding card and travel document ready for inspection."}</div>
        </>
      ),
      date: sub(bp.dateOfTravel.value, { minutes: 45 }),
      icon: "luggageBagsCabinBagSolid" as IconName,
      iconBackground: "bg-slate-500",
    },
    {
      content: "Gate closes",
      notes: "Show your boarding pass to the cabin crew when getting on the plane.",
      date: sub(bp.dateOfTravel.value, { minutes: 30 }),
      icon: "mobilePrinterPrinterSolid" as IconName,
      iconBackground: "bg-slate-500",
    },
    {
      content: "Plane departs",
      notes: `Flight duration: ${hoursUntil.toString().padStart(2, "0")}h ${minutesUntil.toString().padStart(2, "0")}m.`,
      date: bp.dateOfTravel.value,
      icon: "flightTakeoffSolid" as IconName,
      iconBackground: "bg-orange",
    },
    {
      content: "Plane arrives",
      date: bp.dateOfArrival.value,
      icon: "flightLandSolid" as IconName,
      iconBackground: "bg-green-500",
    },
  ]

  return (
    <div className="flow-root max-w-sm rounded-xl bg-white p-8 pl-7 shadow ring-1 ring-black/10">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={eventIdx}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200/75" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-5">
                <div>
                  <span className={cn(event.iconBackground, "flex h-8 w-8 items-center justify-center rounded-full ring-8 ring-white")}>
                    <Icon name={event.icon} className="h-5 w-5 text-white" />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-base/6 font-bold text-primary">{event.content}</p>
                    {event.notes && <p className="mt-1 text-sm text-secondary">{event.notes}</p>}
                  </div>
                  <div className="min-w-[7ch] whitespace-nowrap text-right text-sm/6 text-tertiary">
                    <TNums content={format(event.date, "HH:mm a")} />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
