import { type Metadata } from "next"

import { generateBoardingPass } from "@/lib/boarding-pass"
import { BoardingPass } from "@/components/boarding-pass"

export const metadata: Metadata = {
  title: "Boarding Pass",
}

export default function IndexPage() {
  const boardingPass = generateBoardingPass()

  return (
    <>
      {/* remove page inset when done testing (the pdf already gets a margin) */}
      {/* <section className="flex-auto bg-white screen:max-w-[--page-maxWidth] p-[--page-inset] screen:mx-auto screen:w-full"> */}
      <section className="flex-auto bg-white screen:max-w-3xl p-[--page-inset] screen:mx-auto screen:w-full">
        <BoardingPass boardingPass={boardingPass} />
      </section>
    </>
  )
}
