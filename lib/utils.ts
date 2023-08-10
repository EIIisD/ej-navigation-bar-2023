import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

import { type Menu } from "@/config/menu"

const twMerge = extendTailwindMerge({
  theme: {
    fontSize: ["xs-cqi", "sm-cqi", "base-cqi", "lg-cqi", "xl-cqi", "2xl-cqi", "3xl-cqi", "4xl-cqi", "5xl-cqi"],
    colors: ["orange", "orange-light", "orange-dark", "orange-darker", "primary", "secondary", "tertiary"],
    boxShadow: ["up", "sm-up", "md-up", "lg-up", "xl-up", "2xl-up"],
    spacing: [
      "0-cqi",
      "0.5-cqi",
      "1-cqi",
      "1.5-cqi",
      "2-cqi",
      "2.5-cqi",
      "3-cqi",
      "3.5-cqi",
      "4-cqi",
      "5-cqi",
      "6-cqi",
      "7-cqi",
      "8-cqi",
      "9-cqi",
      "10-cqi",
      "11-cqi",
      "12-cqi",
      "14-cqi",
      "16-cqi",
      "20-cqi",
      "24-cqi",
      "28-cqi",
      "32-cqi",
      "36-cqi",
      "40-cqi",
      "44-cqi",
      "48-cqi",
      "52-cqi",
      "56-cqi",
      "60-cqi",
      "64-cqi",
      "72-cqi",
      "80-cqi",
      "96-cqi",
    ],
    lineHeight: ["3-cqi", "4-cqi", "5-cqi", "6-cqi", "7-cqi", "8-cqi", "9-cqi", "10-cqi"],
    borderRadius: ["cqi", "sm-cqi", "md-cqi", "lg-cqi", "xl-cqi", "2xl-cqi", "3xl-cqi"],
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function disablePageScroll(disable: boolean) {
  if (typeof window === "object") {
    const page = document.documentElement

    if (disable === true) {
      // When the modal is shown, we want a fixed body
      page.style.position = "fixed"
      page.style.top = `-${window.scrollY}px`
      page.style.insetInline = `0px`
    } else {
      // When the modal is hidden, we want to remain at the top of the scroll position
      const scrollY = page.style.top
      page.style.position = ""
      page.style.top = ""
      page.style.insetInline = ""
      window.scrollTo(0, parseInt(scrollY ?? "0") * -1)
    }
  }
}

export function wait(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function findInMenu(targetMenu: Menu, predicate: (item: Menu) => boolean, returnParent = false) {
  const traverse = (currentMenu: Menu[], parentMenu: Menu | null): Menu | null => {
    for (const item of currentMenu) {
      if (predicate(item)) return returnParent ? parentMenu : item

      if (item.items) {
        const found = traverse(item.items, item)
        if (found) return found
      }
    }

    return null
  }

  return traverse(targetMenu.items ?? [], targetMenu) ?? targetMenu
}

export function addToOpenModals(openModals: string[], id: string) {
  if (openModals.includes(id)) return openModals

  return [...openModals, id]
}

export function removeFromOpenModals(openModals: string[], id: string) {
  if (!openModals.includes(id)) return openModals

  return openModals.filter((item) => item !== id)
}

export const arrayElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

export const is = (probability: number): boolean => {
  if (probability <= 0) return false
  if (probability >= 1) return true

  return Math.random() < probability
}
