import { type Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { Admin } from "@/components/admin"

export const metadata: Metadata = {
  title: "Admin",
}

export default function AdminPage() {
  return (
    <div className="p-12">
      <div className="flex flex-col gap-2">
        <Link href="userlytics/initial-interaction">Initial Interaction</Link>
        <Link href="userlytics/multi-flight-selection">Multi-Flight Selection</Link>
        <Link href="userlytics/multi-passenger-selection">Multi-Passenger Selection</Link>
        <Link href="userlytics/varied-luggage-information">Varied Luggage Information</Link>
        <Link href="userlytics/adverts-inclusion">Adverts Inclusion</Link>
        <Link href="userlytics/multi-passenger-sharing">Multi-Passenger Sharing</Link>
      </div>

      <div className="mt-9">
        <Admin />
      </div>
    </div>
  )
}
