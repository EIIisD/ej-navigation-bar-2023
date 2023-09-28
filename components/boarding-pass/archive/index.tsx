"use client"

import React, { type CSSProperties } from "react"

import { createBooking } from "@/config/booking"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs-large"
import { Icon } from "@/components/icon"

export const BoardingPassWithHelpers = () => {
  const [devMode, setDevMode] = React.useState<boolean>(false)
  const [pageMode, setPageMode] = React.useState<boolean>(false)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "d") {
        setDevMode(!devMode)
      } else if (event.key === "f") {
        setPageMode(!pageMode)
      } else if (event.key === "b") {
        console.log(createBooking())
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
      <section className="mx-auto w-full max-w-[--page-maxWidth] flex-auto bg-white">
        <Tabs defaultValue="1" className="mx-auto max-w-[--page-maxWidth] flex-auto bg-white p-[--page-inset]">
          <TabsList>
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
