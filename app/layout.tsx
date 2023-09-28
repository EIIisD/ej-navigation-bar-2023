import "./globals.css"

import React from "react"
import { type Metadata } from "next"

import { VERCEL_ENV } from "@/lib/env"
import { DevelopmentEffects } from "@/components/development-effects"

export const metadata: Metadata = {
  title: {
    default: "easyJet",
    template: `%s | easyJet`,
  },
  description: "Private demo of a new design for the easyJet.com main menu.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
  },
  themeColor: [{ color: "#F60" }],
  icons: [
    {
      rel: "icon",
      type: "image/svg+xml",
      url: "/favicon.svg",
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log(`Running in ${VERCEL_ENV} environment.`)

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        {children}
        {VERCEL_ENV === "development" && <DevelopmentEffects />}
      </html>
    </>
  )
}
