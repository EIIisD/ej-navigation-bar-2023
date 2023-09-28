import { type Metadata } from "next"

import { Icon } from "@/components/icon"

export const metadata: Metadata = {
  title: "Userlytics",
}

export default function UserlyticsPage() {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-orange">
      <Icon name="easyJetLogo" className="h-auto w-[10vw] text-white [aspect-ratio:91/22]" />
    </div>
  )
}
