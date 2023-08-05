import { type Metadata } from "next"

import { generateBoardingPass } from "@/lib/boarding-pass"
import { BoardingPass } from "@/components/boarding-pass"

export const metadata: Metadata = {
  title: "Boarding Pass",
}

export default function IndexPage() {
  const bp = generateBoardingPass()

  return (
    <>
      {/* remove page inset when done testing (the pdf already gets a margin) */}
      {/* <section className="flex-auto bg-white screen:max-w-[--page-maxWidth] p-[--page-inset] screen:mx-auto screen:w-full"> */}
      <section className="flex-auto bg-white screen:mx-auto screen:w-full screen:max-w-[--page-maxWidth]">
        <BoardingPass bp={bp} />
      </section>
    </>
  )
}
