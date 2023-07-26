"use client"

import React from "react"
import { toTitleCase } from "@artsy/to-title-case"
import * as MenuPrimitive from "@radix-ui/react-navigation-menu"

import { addToOpenModals, cn, removeFromOpenModals } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import { DialogSignIn } from "@/components/navigation-bar/dialog-sign-in"
import { menuDesktopTriggerStyle } from "@/components/navigation-bar/menu-desktop"
import {
  MenuMobile,
  menuMobileId,
  menuMobileItemStyle,
} from "@/components/navigation-bar/menu-mobile"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

const Dropdown = {
  Root: MenuPrimitive.Root,
  Sub: MenuPrimitive.Sub,
  List: MenuPrimitive.List,
  Item: MenuPrimitive.Item,
  Trigger: MenuPrimitive.Trigger,
  Link: MenuPrimitive.Link,
  Indicator: MenuPrimitive.Indicator,
  Content: MenuPrimitive.Content,
  Viewport: MenuPrimitive.Viewport,
}

const userNameExamples = {
  long: "Sivakrishnavenkata",
  normal: "Sivakrish",
}

export const MenuAside = () => {
  const navigationBarContext = useNavigationBarContext()

  const menuItems = navigationBarContext.menu.items?.filter(
    (item) => item.group === "Account" && item.isHidden === false
  )

  return (
    <Dropdown.Root className="relative z-50 flex max-w-max flex-1 items-center justify-center">
      <div className="mr-[calc(var(--page-inset-small)*-1)] flex h-[--primary-header-height] items-center justify-end gap-2 bg-gradient-to-r from-orange-light to-orange pl-[calc((var(--primary-header-height)/2)+var(--menu-gap))] pr-[--page-inset-small] [clip-path:polygon(calc(var(--primary-header-height)/2)_0,_100%_0,_100%_100%,_0%_100%)]">
        {navigationBarContext.isSignedIn ? (
          <>
            {/* mobile only */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                if (!navigationBarContext.openModals.includes(menuMobileId)) {
                  navigationBarContext.setOpenModals(
                    addToOpenModals(
                      navigationBarContext.openModals,
                      menuMobileId
                    )
                  )
                } else {
                  navigationBarContext.setOpenModals(
                    removeFromOpenModals(
                      navigationBarContext.openModals,
                      menuMobileId
                    )
                  )
                }
              }}
              className="desktop-header-width:hidden"
            >
              <Icon name="usersSolid" className="-ml-1 h-4 w-4" />
              <span>{toTitleCase(`Hello`)}</span>
            </Button>

            {/* desktop only */}
            <Dropdown.List className="group flex flex-1 list-none items-center justify-center space-x-1 max-desktop-header-width:hidden">
              <Dropdown.Item>
                <Dropdown.Trigger asChild>
                  <button type="button" className={menuDesktopTriggerStyle()}>
                    <span className="max-w-[15ch] truncate break-all">
                      {toTitleCase(`Hello ${userNameExamples.long}`)}
                    </span>
                    <Icon
                      name="arrowDown"
                      className="relative h-4 w-4 transition duration-200 group-data-[state=open]/menu-trigger:rotate-180"
                    />
                    <div className="absolute inset-x-4 bottom-3 h-[2px] rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover/menu-trigger:opacity-25 group-focus/menu-trigger:opacity-25 group-data-[state=open]/menu-trigger:opacity-100" />
                  </button>
                </Dropdown.Trigger>

                <Dropdown.Content
                  className={cn(
                    "relative flex flex-col rounded-lg bg-white text-primary shadow-xl",
                    "group-data-[state=open]:fade-in-0",
                    "group-data-[state=closed]:fade-out-0",
                    "group-data-[state=open]:zoom-in-95 group-data-[state=open]:slide-in-from-top-2",
                    "group-data-[state=closed]:zoom-out-95 group-data-[state=closed]:slide-out-to-top-2",
                    "group-data-[state=open]:duration-200 group-data-[state=open]:ease-out group-data-[state=open]:animate-in",
                    "group-data-[state=closed]:duration-75 group-data-[state=closed]:ease-in group-data-[state=closed]:animate-out"
                  )}
                >
                  <div className="absolute bottom-full right-[--page-inset] h-[--indicator-height] w-[calc(2_*_var(--indicator-height))] bg-white [--indicator-height:0.5rem] [clip-path:polygon(50%_0%,_0%_100%,_100%_100%)]" />
                  <div className="flex flex-col overflow-hidden rounded-[inherit]">
                    {menuItems?.map((item, itemIndex) => (
                      <Dropdown.Link key={itemIndex} asChild>
                        <button
                          type="button"
                          className={menuMobileItemStyle({
                            border:
                              itemIndex === menuItems.length - 1
                                ? "none"
                                : "default",
                            className:
                              "min-w-[23ch] font-bold hover:bg-gray-50 transition-colors duration-100",
                          })}
                          onClick={() => {
                            if (item.id === "sign-out") {
                              navigationBarContext.setIsSignedIn(false)
                            }
                          }}
                        >
                          {item.title}
                        </button>
                      </Dropdown.Link>
                    ))}
                  </div>
                </Dropdown.Content>
              </Dropdown.Item>
            </Dropdown.List>
          </>
        ) : (
          <DialogSignIn>
            <Button type="button" variant="outline" size="sm">
              <Icon name="usersOutlined" className="-ml-1 h-4 w-4" />
              <span>{toTitleCase(`Sign in`)}</span>
            </Button>
          </DialogSignIn>
        )}

        <div className="flex items-center gap-2 tablet-header-width:hidden">
          <MenuMobile />
        </div>
      </div>

      <div className="absolute right-0 top-full z-50 flex justify-center">
        <Dropdown.Viewport
          className={cn(
            "origin-top-center group peer relative mt-1 h-[var(--radix-navigation-menu-viewport-height)] w-full",
            "data-[state=open]:duration-200 data-[state=open]:ease-out data-[state=open]:animate-in",
            "data-[state=closed]:duration-75 data-[state=closed]:ease-in data-[state=closed]:animate-out"
          )}
        />
      </div>
    </Dropdown.Root>
  )
}
