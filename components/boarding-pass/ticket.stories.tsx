import React from "react"
import { type Story, type StoryDefault } from "@ladle/react"

import { createBooking } from "@/config/booking"
import useWindowKeyDown from "@/lib/use-window-keydown"
import { OldTicket } from "@/components/boarding-pass/archive/old-ticket"
import { Ticket } from "@/components/boarding-pass/ticket"

export default {
  meta: { pageWidth: true, withShade: true },
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
    <div className="grid gap-4 p-[--page-inset]">
      {/* <div className="fixed right-0 top-0 h-screen w-[30vw] overflow-scroll bg-black/90 p-6 text-xs text-white">
        <pre>
          {JSON.stringify(
            {
              ...booking,
              passenger,
              flight,
              passengers: undefined,
              flights: undefined,
            },
            null,
            2
          )}
        </pre>
      </div> */}
      <Ticket booking={booking} flight={flight} passenger={passenger} />
      {/* <div className="opacity-50">
        <OldTicket booking={booking} flight={flight} passenger={passenger} />
      </div> */}
    </div>
  )
}
