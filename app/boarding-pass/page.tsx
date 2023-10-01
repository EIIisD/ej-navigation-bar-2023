import { type Metadata } from "next"

import { PrintBooking } from "@/components/boarding-pass/print-booking"
import { PrintBookingContextProvider } from "@/components/boarding-pass/print-booking-context"
import { booking } from "@/app/boarding-pass/booking"

export const metadata: Metadata = {
  title: "Your boarding passes",
}

export default function BoardingPassPage() {
  return (
    <PrintBookingContextProvider predefinedBooking={booking}>
      <PrintBooking />
    </PrintBookingContextProvider>
  )
}
