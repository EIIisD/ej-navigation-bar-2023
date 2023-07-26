"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

import { languages } from "@/config/languages"
import { IMenu } from "@/config/menu"
import { cn, disablePageScroll } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import { AccountButton } from "@/components/navigation-bar/account-button"
import { MenuDesktop } from "@/components/navigation-bar/menu-desktop"
import { MenuMobile } from "@/components/navigation-bar/menu-mobile"
import {
  INavigationBarContext,
  NavigationBarContext,
  navigationBarContextDefs,
} from "@/components/navigation-bar/navigation-bar-context"

export const NavigationBar = () => {
  const [language, setLanguage] = React.useState<
    INavigationBarContext["language"]
  >(navigationBarContextDefs.language)

  const [menu, setMenu] = React.useState<INavigationBarContext["menu"]>(
    navigationBarContextDefs.menu
  )

  const [isSignedIn, setIsSignedIn] = React.useState<
    INavigationBarContext["isSignedIn"]
  >(navigationBarContextDefs.isSignedIn)

  const [openModals, setOpenModals] = React.useState<
    INavigationBarContext["openModals"]
  >(navigationBarContextDefs.openModals)

  React.useEffect(() => {
    const updatedMenu: IMenu = {
      ...menu,
      items: menu?.items?.map((item) => {
        const authenticatedItem = {
          ...item,
          isHidden: item.requireAuthentication ? !isSignedIn : undefined,
        }
        if (item.id === "language-select") {
          return {
            ...authenticatedItem,
            title: language,
            flag: languages.find(({ value }) => value === language)?.flag,
          }
        } else {
          return authenticatedItem
        }
      }),
    }

    setMenu(updatedMenu)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, language])

  if (openModals.length === 0) disablePageScroll(false)
  else disablePageScroll(true)

  const secondaryMenu = menu?.items?.filter((i) => {
    return !i.requireAuthentication && i.group === "Account"
  })

  return (
    <NavigationBarContext.Provider
      value={{
        language,
        setLanguage,
        menu,
        setMenu,
        isSignedIn,
        setIsSignedIn,
        openModals,
        setOpenModals,
      }}
    >
      <header className="sticky top-0 z-20 flex w-full flex-col-reverse bg-orange text-white shadow-xl [--menu-gap:theme('spacing.3')] print:hidden tablet-header-width:[--menu-gap:theme('spacing.4')] desktop-header-width:[--menu-gap:theme('spacing.8')]">
        {/* primary menu */}
        {/* the DOM order is reversed with css flex so that the primary menu is the first keyboard tab target */}
        <div className="mx-auto flex h-[--primary-header-height] w-full max-w-[--header-maxWidth] items-center gap-[--menu-gap] px-[--page-inset]">
          <div className="flex flex-1 items-center gap-[calc(var(--menu-gap)*2)]">
            <Link
              href="/"
              className="-mx-4 flex h-[--primary-header-height] max-w-max items-center gap-2 px-4 focus-visible:bg-white/20 focus-visible:outline-none"
            >
              <Icon name="easyJetLogo" className="w-24 [aspect-ratio:91/22]" />
            </Link>

            {/* desktop-only */}
            <div className="max-tablet-header-width:hidden">
              <MenuDesktop />
            </div>
          </div>

          <div className="mr-[calc(var(--page-inset-small)*-1)] flex h-[--primary-header-height] items-center justify-end gap-2 bg-gradient-to-r from-orange-light to-orange pl-[calc((var(--primary-header-height)/2)+var(--menu-gap))] pr-[--page-inset-small] [clip-path:polygon(calc(var(--primary-header-height)/2)_0,_100%_0,_100%_100%,_0%_100%)]">
            {/* desktop and mobile */}
            <AccountButton />

            {/* mobile only */}
            <div className="flex items-center gap-2 tablet-header-width:hidden">
              <MenuMobile />
            </div>
          </div>
        </div>

        {/* secondary menu */}
        {/* the DOM order is reversed with css flex so that the primary menu is the first keyboard tab target */}
        <div className="mx-auto flex h-[--secondary-header-height] w-full max-w-[--header-maxWidth] items-center justify-end gap-3 border-b border-orange-light px-[--page-inset] max-tablet-header-width:hidden">
          {secondaryMenu?.map((item, index) => {
            const ItemRenderer = item.dialogElement
              ? item.dialogElement
              : React.Fragment
            const isLink = !item.dialogElement
            const ItemTag = isLink ? Link : "button"
            return (
              <React.Fragment key={item.title}>
                <ItemRenderer>
                  <ItemTag
                    href="/"
                    className={cn(
                      buttonVariants({
                        variant: "linkReversed",
                        size: "text",
                      }),
                      "-mx-3 h-[--secondary-header-height] px-3"
                    )}
                  >
                    <span>{item.title}</span>
                    {!!item.flag && (
                      <Image
                        src={`/media/flags/${item.flag}.svg`}
                        alt={item.flag}
                        width={36}
                        height={28}
                        className="h-[1rem] w-auto shrink-0 overflow-hidden rounded-[4px] border-[1.5px] border-white bg-white"
                      />
                    )}
                  </ItemTag>
                </ItemRenderer>

                {index < secondaryMenu.length - 1 && (
                  <span className="select-none text-orange-light">|</span>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* borders to differentiate the header from the page content and the theme-color area on mobile, we use divs so that they don't impact the variable-controlled header height */}
        {/* we hide this top border for the desktop header because the secondary nav is a solid orange and doesn't require differentiation from the theme-color */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-orange-light tablet-header-width:hidden" />
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-orange-light" />
      </header>
    </NavigationBarContext.Provider>
  )
}
