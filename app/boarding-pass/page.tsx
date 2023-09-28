import { type Metadata } from "next"

import { LOCAL_ENV } from "@/lib/env"
import { DialogPrintBooking } from "@/components/boarding-pass/dialog-print-booking"
import { PrintBookingContextProvider } from "@/components/boarding-pass/print-booking-context"
import { PrintBookingPdf } from "@/components/boarding-pass/print-booking-pdf"
import { PrintBookingScreen } from "@/components/boarding-pass/print-booking-screen"
import { Footer } from "@/components/footer"
import { NavigationBar } from "@/components/navigation-bar"
import { Simulator } from "@/components/simulator"
import { SubNavigationBar } from "@/components/sub-navigation-bar"

export const metadata: Metadata = {
  title: "Your boarding passes",
}

export default function BoardingPassPage() {
  return (
    <Simulator
      screen={
        <>
          <NavigationBar />
          <SubNavigationBar />
          <PrintBookingContextProvider>
            {!LOCAL_ENV && <DialogPrintBooking />}
            <PrintBookingScreen />
          </PrintBookingContextProvider>
          <Footer />
        </>
      }
      print={
        <>
          <PrintBookingContextProvider>
            <PrintBookingPdf />
          </PrintBookingContextProvider>
        </>
      }
    />
  )
}
