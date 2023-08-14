"use client"

import React, { type Dispatch, type SetStateAction } from "react"

import { menu, type Menu } from "@/config/menu"

export interface NavigationBarContext {
  menu: Menu
  setMenu: Dispatch<SetStateAction<NavigationBarContext["menu"]>>
  isSignedIn: boolean
  setIsSignedIn: Dispatch<SetStateAction<NavigationBarContext["isSignedIn"]>>
}

export const navigationBarContextDefs = {
  menu: menu,
  setMenu: () => null,
  isSignedIn: false,
  setIsSignedIn: () => null,
}

export const NavigationBarContext = React.createContext<NavigationBarContext>({
  menu: navigationBarContextDefs.menu,
  setMenu: navigationBarContextDefs.setMenu,
  isSignedIn: navigationBarContextDefs.isSignedIn,
  setIsSignedIn: navigationBarContextDefs.setIsSignedIn,
})

export const useNavigationBarContext = () => React.useContext(NavigationBarContext)
