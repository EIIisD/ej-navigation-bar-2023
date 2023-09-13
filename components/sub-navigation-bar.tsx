"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Icon } from "@/components/icon"

export const SubNavigationBar = () => {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex h-[--general-bar-height] w-full items-center justify-center border-b border-gray-100 bg-white text-sm text-primary",
        pathname === "/" && "hidden"
        // pathname !== "/" && "hidden"
      )}
    >
      <div className="mx-auto flex w-full max-w-[--header-maxWidth] items-center justify-between px-[--page-inset]">
        <div className="flex items-center gap-1.5 max-tablet-header-width:hidden">
          <Link href="/" className="text-primary">
            easyJet
          </Link>
          <Icon name="arrowRight" className="h-4 w-4 text-tertiary" />
          <Link href="/" className="text-secondary">
            View booking
          </Link>
          <Icon name="arrowRight" className="h-4 w-4 text-tertiary" />
          <span className="text-secondary">Your boarding passes</span>
        </div>
        <div className="flex items-center gap-1.5 tablet-header-width:hidden">
          <Icon name="arrowLeft" className="h-4 w-4 text-orange" />
          <span className="font-bold text-orange">easyJet</span>
        </div>
        <div className="flex items-center">
          <button type="button" className="flex items-center gap-1.5 font-bold text-orange">
            My account
            <Icon name="arrowDown" className="h-4 w-4 text-orange" />
          </button>
        </div>
      </div>
    </div>
  )
}