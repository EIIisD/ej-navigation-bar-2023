import { type Metadata } from "next"

import { boardingPassLog } from "@/lib/boarding-pass"
import { BoardingPass } from "@/components/boarding-pass"

export const metadata: Metadata = {
  title: "Boarding Pass",
}

export default function IndexPage() {
  // boardingPassLog()

  return (
    <>
      <BoardingPass />
    </>
  )
}
