"use client"

import React from "react"

import { languages } from "@/config/languages"
import { menu, type Menu } from "@/config/menu"

export interface NavigationBarContext {
  language: string
  setLanguage: (a: string) => void
  menu: Menu
  setMenu: (a: Menu) => void
  isSignedIn: boolean
  setIsSignedIn: (a: boolean) => void
  openModals: string[]
  setOpenModals: (a: string[]) => void
}

export const navigationBarContextDefs = {
  language: languages[0].value,
  setLanguage: () => null,
  menu: menu,
  setMenu: () => null,
  isSignedIn: false,
  setIsSignedIn: () => null,
  openModals: [],
  setOpenModals: () => null,
}

export const NavigationBarContext = React.createContext<NavigationBarContext>({
  language: navigationBarContextDefs.language,
  setLanguage: navigationBarContextDefs.setLanguage,
  menu: navigationBarContextDefs.menu,
  setMenu: navigationBarContextDefs.setMenu,
  isSignedIn: navigationBarContextDefs.isSignedIn,
  setIsSignedIn: navigationBarContextDefs.setIsSignedIn,
  openModals: navigationBarContextDefs.openModals,
  setOpenModals: navigationBarContextDefs.setOpenModals,
})

export const useNavigationBarContext = () => React.useContext(NavigationBarContext)
