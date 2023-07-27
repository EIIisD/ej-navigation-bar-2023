import { type Metadata } from "next"

import { boardingPassLog } from "@/lib/boarding-pass"

export const metadata: Metadata = {
  title: "Boarding Pass",
}

export default function IndexPage() {
  boardingPassLog()

  return (
    <>
      <section className="flex-auto bg-white">
        <main className="mx-auto max-w-[--page-maxWidth] flex-auto p-[--page-inset]">
          <div className="grid gap-[--page-inset]">
            <div className="grid gap-4 py-3">
              <h1 className="font-display text-4xl text-primary">
                easyJet Boarding Pass Demo
              </h1>
              <p className="text-base text-secondary">
                This is a private demo of a new design for the easyJet.com main
                menu and is for research and testing purposes only. Please be
                advised that this is not the actual easyJet website, if you are
                looking for the actual easyJet website please visit easyJet.com.
              </p>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}
