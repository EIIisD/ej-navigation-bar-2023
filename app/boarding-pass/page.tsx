import { type Metadata } from "next"

import { generateBoardingPass } from "@/lib/boarding-pass"
import { BoardingPassWithHelpers } from "@/components/boarding-pass"

export const metadata: Metadata = {
  title: "Boarding Pass",
}

export default function IndexPage() {
  const bp = generateBoardingPass()

  return (
    <>
      <BoardingPassWithHelpers bp={bp} />
    </>
  )
}
