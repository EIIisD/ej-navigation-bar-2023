import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { createBooking } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { Ticket } from "@/components/boarding-pass/ticket"
import { Simulator } from "@/components/simulator"

export default {
  meta: { plain: true, withShade: true },
} satisfies StoryDefault

export const Default: Story = () => {
  const [booking, setBooking] = React.useState(createBooking())
  const flight = booking.flights[0]
  const passenger = booking.passengers[0]

  useWindowKeyDown(({ key, shiftKey, metaKey }) => {
    if (key === "r" && !shiftKey && !metaKey) {
      const newBooking = createBooking()
      setBooking(newBooking)
      console.log(newBooking)
    }
  })

  return (
    <Simulator
      container={false}
      screen={
        <>
          <div className="absolute inset-x-0 top-[10mm] flex w-full flex-auto items-center justify-center">
            <div className="mx-auto w-full max-w-[840px]">
              <Ticket booking={booking} flight={flight} passenger={passenger} />
            </div>
          </div>
        </>
      }
      print={
        <>
          <div className="absolute inset-x-0 top-[10mm] flex w-full flex-auto items-center justify-center">
            <div className="max-w-[calc(790px-20mm)]">
              <Ticket booking={booking} flight={flight} passenger={passenger} />
            </div>
          </div>
        </>
      }
    />
  )
}
