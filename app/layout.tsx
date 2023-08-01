import "@/styles/globals.css"

import React from "react"
import { type Metadata } from "next"

import { Footer } from "@/components/footer"
import { NavigationBar } from "@/components/navigation-bar"

export const metadata: Metadata = {
  title: {
    default: "easyJet",
    template: `%s - easyJet`,
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
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <NavigationBar />
          {children}
          <Footer />
        </body>
      </html>
    </>
  )
}
