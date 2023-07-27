import { Icon } from "@/components/icon"

export const BoardingPass = () => {
  return (
    // remove page inset when done testing (the pdf already gets a margin)
    <section className="flex-auto bg-white screen:max-w-[--page-maxWidth] p-[--page-inset] screen:mx-auto screen:w-full">
      <div className="rounded-2xl bg-orange text-white p-[--page-inset]">
        <Icon name="easyJetLogo" className="w-24 [aspect-ratio:91/22]" />
      </div>
    </section>
  )
}
