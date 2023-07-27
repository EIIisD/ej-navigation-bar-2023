"use client"

import { cva } from "class-variance-authority"

import { type IBoardingPass } from "@/lib/boarding-pass"
import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

interface IBoardingPassProps {
  boardingPass: IBoardingPass
}

const cutoutStyle = cva(
  "rounded-full h-[--pass-cutout-size] w-[--pass-cutout-size] absolute border border-[--pass-border-color] mx-[0px] bg-white",
  {
    variants: {
      align: {
        left: "left-0 -translate-x-1/2",
        right: "right-0 translate-x-1/2",
      },
    },
  }
)

const Data = ({
  title,
  value,
  className,
}: {
  title: string
  value: string
  className?: string
}) => (
  <dl
    className={cn(
      "flex flex-col gap-2.5 justify-start flex-shrink-0 max-w-max",
      className
    )}
  >
    <dt className="text-base trim-both font-bold uppercase">{title}</dt>
    <dd className="text-2xl trim-both">{value}</dd>
  </dl>
)

export const BoardingPass = ({ boardingPass }: IBoardingPassProps) => {
  console.log(boardingPass)

  return (
    <div className="group/pass relative grid gap-[--page-inset-large] rounded-2xl bg-orange text-white p-[--page-inset] ring-1 ring-[--pass-border-color] ring-inset overflow-hidden">
      <div className="flex items-start justify-between gap-[--page-inset]">
        <Icon
          name="easyJetLogo"
          className="w-40 [aspect-ratio:91/22] flex-shrink-0"
        />
        <div className="flex-auto shrink" />
        <Data
          title="Gate"
          value={boardingPass.departureAirport.terminal}
          className="items-end"
        />
        <Data
          title="Seat"
          value={boardingPass.seatNumber}
          className="items-end"
        />
      </div>
      <div className="flex items-end justify-between gap-[--page-inset]">
        <Data
          title="Departure"
          value={boardingPass.departureAirport.code}
          className="items-start [&>dd]:text-6xl [&>dd]:font-light"
        />
        <div className="flex-auto shrink" />
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full h-1 w-1 bg-white" />
            <div className="rounded-full h-1 w-1 bg-white" />
            <div className="rounded-full h-1 w-1 bg-white" />
          </div>
          <Icon
            name="searchAndMenuAirplaneModeAltSolid"
            className="h-12 w-12"
          />
          <div className="flex items-center gap-3">
            <div className="rounded-full h-1 w-1 bg-white" />
            <div className="rounded-full h-1 w-1 bg-white" />
            <div className="rounded-full h-1 w-1 bg-white" />
          </div>
        </div>
        <div className="flex-auto shrink" />
        <Data
          title="Arrival"
          value={boardingPass.arrivalAirport.code}
          className="items-end [&>dd]:text-6xl [&>dd]:font-light"
        />
      </div>
      <div className="mx-[calc(var(--pass-cutout-margin)*-1)] w-[calc(100%+var(--pass-cutout-margin)*2)] h-[--pass-cutout-size] overflow-x-hidden relative">
        <div className={cutoutStyle({ align: "left" })} />
        <div className={cutoutStyle({ align: "right" })} />
      </div>
      <div className="flex items-start justify-between gap-[--page-inset]">
        <Data
          title="Flight"
          value={boardingPass.flightNumber}
          className="items-start [&>dd]:text-xl"
        />
        <Data
          title="Date"
          value={boardingPass.dateOfTravel}
          className="items-start [&>dd]:text-xl"
        />
        <Data
          title="Boarding"
          value={boardingPass.gateClosureTime}
          className="items-start [&>dd]:text-xl"
        />
        <div className="flex-auto shrink" />
        <Data
          title="Class"
          value={boardingPass.seatNumber}
          className="items-end [&>dd]:text-xl"
        />
      </div>
      <div className="flex items-start justify-between gap-[--page-inset]">
        <Data
          title="Passenger"
          value={`${boardingPass.passenger.firstName} ${boardingPass.passenger.lastName}`}
          className="items-start [&>dd]:text-xl"
        />
        <div className="flex-auto shrink" />
        <Data
          title="Status"
          value="Checked in"
          className="items-end [&>dd]:text-xl"
        />
      </div>
      <div className="h-[20vh]"></div>
    </div>
  )
}
