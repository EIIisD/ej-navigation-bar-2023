import { type Metadata } from "next"

import { generateBoardingPass } from "@/lib/boarding-pass"
import { BoardingPassWithHelpers } from "@/components/boarding-pass"
import { DialogPrintBooking } from "@/components/boarding-pass/dialog-print-booking"

export const metadata: Metadata = {
  title: "Boarding Pass",
}

export default function IndexPage() {
  return (
    <>
      <DialogPrintBooking />
      <BoardingPassWithHelpers bp={generateBoardingPass()} />
    </>
  )
}
