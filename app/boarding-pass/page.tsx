import { type Metadata } from "next"

import { DialogPrintBooking } from "@/components/boarding-pass/dialog-print-booking"
import { PrintBooking } from "@/components/boarding-pass/print-booking"

export const metadata: Metadata = {
  title: "Boarding Pass",
}

export default function IndexPage() {
  return (
    <>
      <DialogPrintBooking>
        <PrintBooking />
      </DialogPrintBooking>
    </>
  )
}
