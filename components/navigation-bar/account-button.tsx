"use client"

import React from "react"
import { toTitleCase } from "@artsy/to-title-case"

import { addToOpenModals, cn, removeFromOpenModals } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import { menuDesktopTriggerStyle } from "@/components/navigation-bar/menu-desktop"
import { menuMobileId } from "@/components/navigation-bar/menu-mobile"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

const userNameExamples = {
  long: "Sivakrishnavenkata",
  normal: "Sivakrish",
}

export const AccountButton = () => {
  const navigationBarContext = useNavigationBarContext()

  const onSignIn = () => {
    navigationBarContext.setIsSignedIn(true)
    navigationBarContext.setOpenModals(
      removeFromOpenModals(navigationBarContext.openModals, menuMobileId)
    )
  }

  const onSignOut = () => {
    navigationBarContext.setIsSignedIn(false)
    navigationBarContext.setOpenModals(
      removeFromOpenModals(navigationBarContext.openModals, menuMobileId)
    )
  }

  return (
    <div>
      {navigationBarContext.isSignedIn ? (
        <div>
          {/* mobile only */}
          <Button
            variant="reversed"
            size="sm"
            onClick={() => {
              navigationBarContext.setOpenModals(
                addToOpenModals(navigationBarContext.openModals, menuMobileId)
              )
            }}
            className="desktop-header-width:hidden"
          >
            <Icon name="usersSolid" className="-ml-1 h-4 w-4" />
            <span>{toTitleCase(`Hello`)}</span>
          </Button>

          {/* desktop only */}
          <button
            type="button"
            className={cn(
              menuDesktopTriggerStyle(),
              "max-desktop-header-width:hidden"
            )}
            onClick={onSignOut}
          >
            <span className="max-w-[15ch] truncate break-all">
              {toTitleCase(`Hello ${userNameExamples.long}`)}
            </span>
            <Icon
              name="arrowDown"
              className="relative h-4 w-4 transition duration-200 group-data-[state=open]/menu-trigger:rotate-180"
            />
            <div className="absolute inset-x-4 bottom-3 h-[2px] rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover/menu-trigger:opacity-25 group-focus/menu-trigger:opacity-25 group-data-[state=open]/menu-trigger:opacity-100" />
          </button>
        </div>
      ) : (
        <Button variant="reversed" size="sm" onClick={onSignIn}>
          <Icon name="usersOutlined" className="-ml-1 h-4 w-4" />
          <span>{toTitleCase(`Sign in`)}</span>
        </Button>
      )}
    </div>
  )
}
