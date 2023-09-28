import { type Metadata } from "next"
import Image from "next/image"

import { Footer } from "@/components/footer"
import { NavigationBar } from "@/components/navigation-bar"
import { Simulator } from "@/components/simulator"
import { SubNavigationBar } from "@/components/sub-navigation-bar"

export const metadata: Metadata = {
  title: "Home",
}

export default function IndexPage() {
  return (
    <Simulator
      screen={
        <>
          <NavigationBar />
          <SubNavigationBar />
          <section className="flex-auto bg-white">
            <div className="relative [aspect-ratio:16/9] md:[aspect-ratio:4/1]">
              <Image src="/media/hero-3.jpg" width={2755} height={3415} alt="" className="h-full object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0"></div>
            </div>
          </section>
          <main className="mx-auto max-w-[--page-maxWidth] flex-auto bg-white p-[--page-inset]">
            {/* <div className="h-[50vh] w-full rounded-2xl border-4 border-dashed border-sky-500"></div> */}
            {/* <h1 className="rotate-[-14deg] font-display text-7xl italic">Navigation Bar</h1> */}
            {/* <h1 className="font-display text-7xl">Navigation Bar 2023</h1> */}
          </main>
          <Footer />
        </>
      }
    />
  )
}
