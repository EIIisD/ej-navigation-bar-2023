import { type Metadata } from "next"

import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Userlytics testing",
}

export default function UserlyticsPage() {
  return (
    <div>
      <h1 className="font-display text-3xl">Userlytics testing starting point</h1>
      <div>
        <Button>1. Scenario — Cabin and hold luggage</Button>
        <Button>2. Scenario — Normal</Button>
        <Button>3. Scenario — Worst</Button>
      </div>
    </div>
  )
}
