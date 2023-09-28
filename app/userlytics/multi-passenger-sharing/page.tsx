import { type Metadata } from "next"

import { DialogPrintBooking } from "@/components/boarding-pass/dialog-print-booking"
import { PrintBookingContextProvider } from "@/components/boarding-pass/print-booking-context"
import { PrintBookingScreen } from "@/components/boarding-pass/print-booking-screen"
import { Footer } from "@/components/footer"
import { NavigationBar } from "@/components/navigation-bar"
import { SubNavigationBar } from "@/components/sub-navigation-bar"
import { booking } from "@/app/userlytics/multi-passenger-sharing/booking"

export const metadata: Metadata = {
  title: "Multi-Passenger Sharing",
}

export default function MultiPassengerSharingPage() {
  return (
    <>
      <NavigationBar />
      <SubNavigationBar />
      <PrintBookingContextProvider predefinedBooking={booking}>
        <DialogPrintBooking />
        <PrintBookingScreen isPredefined />
      </PrintBookingContextProvider>
      <Footer />
    </>
  )
}
