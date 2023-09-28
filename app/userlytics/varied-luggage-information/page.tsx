import { type Metadata } from "next"

import { DialogPrintBooking } from "@/components/boarding-pass/dialog-print-booking"
import { PrintBookingContextProvider } from "@/components/boarding-pass/print-booking-context"
import { PrintBookingScreen } from "@/components/boarding-pass/print-booking-screen"
import { Footer } from "@/components/footer"
import { NavigationBar } from "@/components/navigation-bar"
import { SubNavigationBar } from "@/components/sub-navigation-bar"
import { booking } from "@/app/userlytics/varied-luggage-information/booking"

export const metadata: Metadata = {
  title: "Varied Luggage Information",
}

export default function VariedLuggageInformationPage() {
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
