"use client"

import Link from "next/link"

import { Icon } from "@/components/icon"

export const CarTrawlerAttributionBanner = () => (
  <Link
    href="corporate.cartrawler.com"
    className="flex h-8 items-center justify-end gap-1.5 rounded-full bg-[rgba(15,0,40,1)] px-4 text-white transition-opacity hover:opacity-80"
  >
    <div className="whitespace-nowrap text-sm">Powered by</div>
    <Icon name="carTrawlerLogo" className="h-3.5 [aspect-ratio:258/41]" />
  </Link>
)

export const BookingDotComAttributionBanner = () => (
  <Link
    href="booking.com"
    className="flex h-8 items-center justify-end gap-1.5 rounded-full bg-[#003b95] px-4 text-white transition-opacity hover:opacity-80"
  >
    <div className="whitespace-nowrap text-sm">Provided by</div>
    <Icon name="bookingDotComLogo" className="h-3.5 [aspect-ratio:180/30]" />
  </Link>
)

export const EasyJetHolidaysAttributionBanner = () => (
  <Link
    href="easyjet.com/holidays"
    className="flex h-8 items-center justify-end gap-1.5 rounded-full bg-orange px-4 text-white transition-opacity hover:opacity-80"
  >
    <div className="whitespace-nowrap text-sm">Provided by</div>
    <Icon name="easyJetHolidaysLogo" className="h-3.5 [aspect-ratio:204/52]" />
  </Link>
)
