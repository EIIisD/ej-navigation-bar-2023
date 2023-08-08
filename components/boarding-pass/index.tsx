"use client"

import React, { type CSSProperties } from "react"
import Image from "next/image"
import { add, differenceInDays, differenceInHours, differenceInMinutes, format, sub } from "date-fns"

import { generateBoardingPass, type IBoardingPass } from "@/lib/boarding-pass"
import { cn } from "@/lib/utils"
import { Button, buttonEffects } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-large"
import { BoardingPass } from "@/components/boarding-pass/boarding-pass"
import { Timeline } from "@/components/boarding-pass/timeline"
import { Icon, type IconName } from "@/components/icon"
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
        <div key={index} className={cn("rounded-xl [--button-bg:theme('colors.white')] [--button-border:theme('colors.black/5%')]", buttonEffects)}>
          <div className="relative inline-flex w-[--size] flex-col items-center justify-between overflow-hidden rounded-[inherit] py-[--padding] text-primary [aspect-ratio:1/1]">
            <div
              className={cn(
                "pointer-events-none absolute top-0 h-1/2 w-[calc(var(--size)*2+var(--gap))] touch-none bg-gray-200/60 [clip-path:var(--clip-angle-box)]",
                index === 0 ? "left-0" : "right-0"
              )}
            />
            <TNums className="isolate mb-[-0.2em] font-display text-[calc(var(--size)*0.6)]/none" content={item.value.toString().padStart(2, "0")} />
            <div className="isolate text-[calc(var(--size)*0.2)]/none text-secondary">{item.label}</div>
          </div>
        </div>
      ))}
      <div className="ml-[calc(var(--gap)/2)] self-end pb-[--padding] text-base/none font-bold">Until Takeoff</div>
    </div>
  )
}

const HeroButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string
    description: string
    icon: IconName
  }
>(({ className, title, description, icon, ...props }, ref) => {
  return (
    <button
      type="button"
      className={cn(
        "flex h-[--height] w-full items-center justify-start [--height:theme('height[20]')]",
        "rounded-xl [--button-bg:theme('colors.white')] [--button-border:theme('colors.black/5%')]",
        buttonEffects,
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="grid h-[--height] shrink-0 place-items-center rounded-l-[calc(var(--rounded)-1px)] bg-orange px-4 text-white shadow-[shadow:inset_0_0_0_1px_theme('colors.white/35%')] [clip-path:var(--clip-angle-box-right)]">
        <Icon name={icon} className="mr-4 h-[calc(var(--height)*0.6)] w-[calc(var(--height)*0.6)]" />
      </div>
      <div className="ml-4 mr-8 flex-auto space-y-1">
        <div className="font-display text-3xl/none text-primary">{title}</div>
        <div className="text-sm/none text-secondary">{description}</div>
      </div>
      <Icon name="chevronRight" className="mr-4 h-6 w-6 shrink-0 text-orange" />
    </button>
  )
})

HeroButton.displayName = "HeroButton"

export const BoardingPassWithHelpers = ({ bp: defaultBp }: { bp: IBoardingPass }) => {
  const [bp, setBp] = React.useState<IBoardingPass>(defaultBp)
  const [devMode, setDevMode] = React.useState<boolean>(false)
  const [pageMode, setPageMode] = React.useState<boolean>(false)

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
    <div
      style={
        {
          "--dev-1": devMode ? "lch(95 20 .2turn)" : undefined,
          "--dev-2": devMode ? "lch(95 20 .6turn)" : undefined,
        } as CSSProperties
      }
    >
      <div className="@container/hero print:hidden">
        <div className="relative flex w-full flex-col items-center justify-center [--angle-height:calc(100cqh-(100cqh*var(--clip-angle)))]">
          <div className="h-[calc(var(--angle-height)/8)] w-full" />
          {false ? (
            <>
              <Image src="/media/hero-1.jpg" width={2755} height={3415} alt="" className="h-full object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0"></div>
            </>
          ) : (
            <>
              <div className="absolute inset-0 bottom-[5%] bg-slate-100 [clip-path:var(--clip-angle-section-sub)]" />
              <div className="absolute inset-0 bg-[conic-gradient(at_125%_50%,#b78cf7,#ff7c94,#ffcf0d,#ff7c94,#b78cf7)] hue-rotate-[190deg] [clip-path:var(--clip-angle-section)]" />
            </>
          )}
          <div className="relative w-full max-w-[--page-maxWidth] p-[--page-inset] py-[--page-inset-large] text-white">
            {/* spacer for the bottom angle */}
            <div className="w-full space-y-[--page-inset-large]">
              <div>
                <div className="text-base/none font-bold">Your flight to</div>
                <h1 className="mt-3 font-display text-6xl/none lg:text-8xl/none">
                  {bp.arrivalAirport.country} <span className="text-[1ex]/none">({bp.arrivalAirport.code})</span>
                </h1>
                <div className="text-base/none lg:text-xl/none">
                  On {format(bp.dateOfTravel.value, "EEEE, do MMMM yyyy")} at {format(bp.dateOfTravel.value, "HH:mm a")}
                </div>
              </div>
              <hr className="border-white/20" />
              <div className="flex items-start justify-between gap-[--page-inset] max-lg:flex-col">
                <TimeUntil startDate={new Date()} endDate={bp.dateOfTravel.value} />
                <div className="flex flex-col justify-start gap-4 lg:items-end">
                  <HeroButton
                    title="Print Boarding Pass"
                    description="Required by some airports"
                    icon="mobilePrinterPrinterSolid"
                    onClick={() => window.print()}
                  />
                </div>
              </div>
            </div>
            {/* spacer for the bottom angle */}
            <div className="h-[calc(var(--angle-height)/3)] w-full" />
          </div>
        </div>
      </div>
      <section className="flex-auto bg-white screen:mx-auto screen:w-full screen:max-w-[--page-maxWidth]">
        <Tabs defaultValue="1" className="mx-auto max-w-[--page-maxWidth] flex-auto bg-white p-[--page-inset]">
          <TabsList className="print:hidden">
            <TabsTrigger value="1">
              <Icon name="mobilePrinterMobileBookingOutlined" className="mr-2.5 h-7 w-7" />
              Boarding Pass
            </TabsTrigger>
            <TabsTrigger value="2">
              <Icon name="luggageIconSolid" className="mr-2.5 h-7 w-7" />
              Your Luggage
            </TabsTrigger>
            <TabsTrigger value="3">
              <Icon name="servicesIconAirportLoungeSolid" className="mr-2.5 h-7 w-7" />
              Your Seats
            </TabsTrigger>
            {/* <TabsTrigger value="4">Airport Guide</TabsTrigger> */}
            <TabsTrigger className="ml-auto" value="4">
              <Icon name="withSuitcaseSolid" className="mr-2.5 h-7 w-7" />
              Airport Guide
              {/* <Button size="sm" asChild>
                <div>Airport Guide</div>
              </Button> */}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="1">
            <div className="grid gap-16 py-8 pb-24">
              <div className="grid h-[50vh] w-full place-content-center rounded-3xl border-2 border-dashed border-blue-300">
                <h1 className="font-bold text-blue-400">Boarding Pass</h1>
              </div>
              {/* <div className="grid gap-6">
              <h1 className="font-display text-5xl text-primary">Your Boarding Pass</h1>
              <BoardingPass bp={bp} />
            </div>
            <div className="grid gap-6">
              <h1 className="font-display text-5xl text-primary">Flight Schedule</h1>
              <Timeline bp={bp} />
            </div> */}
            </div>
          </TabsContent>
          <TabsContent value="2">
            <div className="grid gap-16 py-8 pb-24">
              <div className="grid h-[50vh] w-full place-content-center rounded-3xl border-2 border-dashed border-blue-300">
                <h1 className="font-bold text-blue-400">Your Luggage</h1>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="3">
            <div className="grid gap-16 py-8 pb-24">
              <div className="grid h-[50vh] w-full place-content-center rounded-3xl border-2 border-dashed border-blue-300">
                <h1 className="font-bold text-blue-400">Your Seats</h1>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="4">
            <div className="grid gap-16 py-8 pb-24">
              <div className="grid h-[50vh] w-full place-content-center rounded-3xl border-2 border-dashed border-blue-300">
                <h1 className="font-bold text-blue-400">Airport Guide</h1>
              </div>
            </div>
          </TabsContent>
          {/* <TabsContent value="4">
            <div>Airport Guide</div>
          </TabsContent> */}
        </Tabs>
      </section>
    </div>
  )
}
