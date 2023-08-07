"use client"

import React from "react"
import Image from "next/image"
import { differenceInDays, differenceInHours, format } from "date-fns"

import { generateBoardingPass, type IBoardingPass } from "@/lib/boarding-pass"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-large"
import { BoardingPass } from "@/components/boarding-pass/boarding-pass"
import { Icon } from "@/components/icon"
import { TNums } from "@/components/tnums"

const TimeUntil = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
  const daysUntil = differenceInDays(endDate, startDate)
  const hoursUntil = differenceInHours(endDate, startDate) - daysUntil * 24

  const items = [
    { label: "Days", value: daysUntil },
    { label: "Hours", value: hoursUntil },
  ].filter((o) => o.value)

  if (items.length === 0) return null

  return (
    <div className="flex items-stretch justify-start gap-[--gap] [--gap:theme('spacing.2')] [--padding:calc(var(--size)*0.11)] [--size:theme('width.16')] lg:[--gap:theme('spacing.2')] lg:[--size:theme('width.20')]">
      {items.map((item, index) => (
        <div
          key={index}
          className="relative inline-flex w-[--size] flex-col items-center justify-between overflow-hidden rounded-xl bg-white py-[--padding] text-primary shadow [aspect-ratio:1/1]"
        >
          <div
            className={cn(
              "absolute top-0 h-1/2 w-[calc(var(--size)*2+var(--gap))] bg-gray-200/60 [clip-path:var(--clip-angle-box)]",
              index === 0 ? "left-0" : "right-0"
            )}
          />
          <TNums className="isolate mb-[-0.2em] font-display text-[calc(var(--size)*0.6)]/none" content={item.value.toString().padStart(2, "0")} />
          <div className="isolate text-[calc(var(--size)*0.2125)]/none text-secondary">{item.label}</div>
        </div>
      ))}
      <div className="ml-[calc(var(--gap)/2)] self-end pb-[--padding] text-[calc(var(--size)*0.2125)]/none font-bold">Until Take Off</div>
    </div>
  )
}

export const BoardingPassWithHelpers = ({ bp: defaultBp }: { bp: IBoardingPass }) => {
  const [bp, setBp] = React.useState<IBoardingPass>(defaultBp)
  const [devMode, setDevMode] = React.useState<boolean>(false)
  const [pageMode, setPageMode] = React.useState<boolean>(false)

  const now = new Date()

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "r") {
        setBp(generateBoardingPass())
      } else if (event.key === "d") {
        setDevMode(!devMode)
      } else if (event.key === "f") {
        setPageMode(!pageMode)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [devMode, pageMode])

  return (
    <>
      <div className="print:hidden">
        <div className="relative flex w-full flex-col items-center justify-center @container/hero [--angle-height:calc(100cqh-(100cqh*var(--clip-angle)))] [clip-path:var(--clip-angle-section)]">
          {false ? (
            <>
              <Image src="/media/hero-1.jpg" width={2755} height={3415} alt="" className="h-full object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0"></div>
            </>
          ) : (
            <div className="absolute inset-0 bg-[conic-gradient(at_125%_50%,#b78cf7,#ff7c94,#ffcf0d,#ff7c94,#b78cf7)] hue-rotate-[190deg]" />
          )}
          <div className="isolate w-full max-w-[--page-maxWidth] p-[--page-inset] py-[calc(var(--angle-height)/3)] text-white">
            <div className="w-full space-y-[--page-inset-large]">
              <div>
                {/* <div className="min-h-[--angle-height] w-full bg-red-500"></div> */}
                <div className="text-base/none font-bold">Your flight to</div>
                <h1 className="mt-3 font-display text-6xl/none lg:text-8xl/none">
                  {bp.arrivalAirport.country} <span className="text-[1ex]/none">({bp.arrivalAirport.code})</span>
                </h1>
                <div className="mt-1 text-base/none lg:text-xl/none">
                  On {format(bp.dateOfTravel.value, "EEEE, do MMMM yyyy")} at {format(bp.dateOfTravel.value, "HH:mm a")}
                </div>
              </div>
              <div className="flex items-start justify-between gap-[--page-inset] max-lg:flex-col">
                <TimeUntil startDate={now} endDate={bp.dateOfTravel.value} />
                <button
                  type="button"
                  className="flex h-[--height] w-full max-w-max items-center justify-start overflow-hidden rounded-xl bg-white shadow [--height:theme('height[20]')]"
                  onClick={() => window.print()}
                >
                  <div className="grid h-[--height] shrink-0 place-items-center bg-orange px-4 text-white [clip-path:var(--clip-angle-box-right)]">
                    <Icon name="mobilePrinterPrinterSolid" className="mr-7 h-[calc(var(--height)*0.6)] w-[calc(var(--height)*0.6)]" />
                  </div>
                  <div className="ml-3 mr-8 flex-auto space-y-1">
                    <div className="font-display text-3xl/none text-primary">Print Boarding Pass</div>
                    <div className="text-sm/none text-secondary">Required by some airports</div>
                  </div>
                  <Icon name="chevronRight" className="mr-4 h-6 w-6 shrink-0 text-orange" />
                </button>
              </div>
            </div>
            <div className="h-[calc(var(--angle-height)/3)] w-full" />
          </div>
        </div>
      </div>
      <section className="flex-auto bg-white screen:mx-auto screen:w-full screen:max-w-[--page-maxWidth]">
        <Tabs defaultValue="1" className="mx-auto max-w-[--page-maxWidth] flex-auto bg-white p-[--page-inset]">
          <TabsList className="print:hidden">
            <TabsTrigger value="1">Boarding Pass</TabsTrigger>
            <TabsTrigger value="2">Bags and Seats</TabsTrigger>
            <TabsTrigger value="3">Departures</TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <BoardingPass bp={bp} />
          </TabsContent>
          <TabsContent value="2">
            <div>Content</div>
          </TabsContent>
          <TabsContent value="3">
            <div>Content</div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}
