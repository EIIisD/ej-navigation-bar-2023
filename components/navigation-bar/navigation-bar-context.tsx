"use client"

import React from "react"

import { languages } from "@/config/languages"
import { menu, Menu } from "@/config/menu"

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
  setLanguage: () => {},
  menu: menu,
  setMenu: () => {},
  isSignedIn: false,
  setIsSignedIn: () => {},
  openModals: [],
  setOpenModals: () => {},
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

export const useNavigationBarContext = () =>
  React.useContext(NavigationBarContext)
