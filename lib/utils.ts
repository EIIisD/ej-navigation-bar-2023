import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { IMenu } from "@/config/menu"

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
    } else {
      // When the modal is hidden, we want to remain at the top of the scroll position
      const scrollY = page.style.top
      page.style.position = ""
      page.style.top = ""
      window.scrollTo(0, parseInt(scrollY || "0") * -1)
    }
  }
}

export function wait(ms: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function findInMenu(
  targetMenu: IMenu,
  predicate: (item: IMenu) => boolean,
  returnParent: boolean = false
) {
  const traverse = (
    currentMenu: IMenu[],
    parentMenu: IMenu | null
  ): IMenu | null => {
    for (const item of currentMenu) {
      if (predicate(item)) return returnParent ? parentMenu : item
      if (item.items) {
        const found = traverse(item.items, item)
        if (found) return found
      }
    }
    return null
  }
  return traverse(targetMenu.items || [], targetMenu) || targetMenu
}

export function addToOpenModals(openModals: string[], id: string) {
  if (openModals.includes(id)) return openModals
  return [...openModals, id]
}

export function removeFromOpenModals(openModals: string[], id: string) {
  if (!openModals.includes(id)) return openModals
  return openModals.filter((item) => item !== id)
}
