import { type Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Home",
}

export default function IndexPage() {
  return (
    <>
      <section className="flex-auto bg-white">
        <div className="relative [aspect-ratio:16/9] md:[aspect-ratio:4/1]">
          <Image
            src="/media/hero-3.jpg"
            width={2755}
            height={3415}
            alt=""
            className="h-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/0"></div>
        </div>
      </section>
      <main className="mx-auto max-w-[--page-maxWidth] flex-auto bg-white p-[--page-inset]">
        <div className="grid gap-[--page-inset]">
          <div className="grid gap-4 py-3">
            <h1 className="font-display text-4xl text-primary">
              easyJet Menu Demo
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
    </>
  )
}
