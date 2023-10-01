"use client"

import { LOCAL_ENV } from "@/lib/env"
import { useDebugEffects } from "@/lib/use-debug-effects"
import { DialogPrintBooking } from "@/components/boarding-pass/dialog-print-booking"
import { PrintBookingPdf } from "@/components/boarding-pass/print-booking-pdf"
import { PrintBookingScreen } from "@/components/boarding-pass/print-booking-screen"
import { Footer } from "@/components/footer"
import { NavigationBar } from "@/components/navigation-bar"
import { SubNavigationBar } from "@/components/sub-navigation-bar"

export const PrintBooking = () => {
  useDebugEffects()

  return (
    <>
      <NavigationBar />
      <SubNavigationBar />
      <PrintBookingScreen />
      <Footer />
      {!LOCAL_ENV && <DialogPrintBooking />}
      <PrintBookingPdf />
    </>
  )
}
