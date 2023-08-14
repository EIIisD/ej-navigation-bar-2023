import { clsx, type ClassValue } from "clsx"
import { customAlphabet } from "nanoid"
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

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

export const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 7)

const disablePageScroll = (disable: boolean) => {
  if (typeof window === "object") {
    const page = document.documentElement

    if (disable === true) {
      page.style.position = "fixed"
      page.style.top = `-${window.scrollY}px`
      page.style.insetInline = `0px`
    } else {
      const scrollY = page.style.top
      page.style.position = ""
      page.style.top = ""
      page.style.insetInline = ""
      window.scrollTo(0, parseInt(scrollY ?? "0") * -1)
    }
  }
}

const wait = (ms = 1000) => new Promise((resolve) => setTimeout(resolve, ms))

const findInMenu = (targetMenu: Menu, predicate: (item: Menu) => boolean, returnParent = false) => {
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

const arrayElement = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)]

const arrayElements = <T>(array: T[], count?: number): T[] => {
  const result = []

  for (let i = 0; i < (count ?? Math.ceil(Math.random() * array.length)); i++) {
    result.push(arrayElement(array))
  }

  return result
}

const is = (probability: number): boolean => {
  if (probability <= 0) return false
  if (probability >= 1) return true

  return Math.random() < probability
}

export { twMerge, cn, disablePageScroll, wait, findInMenu, arrayElement, arrayElements, is }

export const keyBy = <T extends object, K extends keyof T>(array: T[], key: K) => {
  return array.reduce(
    (accumulator, current) => {
      return { ...accumulator, [current[key]]: current }
    },
    {} as Record<T[K], T>
  )
}
