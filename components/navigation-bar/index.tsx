"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useUrlSearchParams } from "use-url-search-params"

import { languagesMap } from "@/config/languages"
import { type Menu } from "@/config/menu"
import { cn } from "@/lib/utils"
import { textButtonVariants } from "@/components/ui/text-button"
import { Icon } from "@/components/icon"
import { MenuAside } from "@/components/navigation-bar/menu-aside"
import { MenuDesktop } from "@/components/navigation-bar/menu-desktop"
import { NavigationBarContext, navigationBarContextDefs } from "@/components/navigation-bar/navigation-bar-context"

type Visibility = "hidden" | "visible"

export const NavigationBar = () => {
  const [menu, setMenu] = React.useState<NavigationBarContext["menu"]>(navigationBarContextDefs.menu)
  const [isSignedIn, setIsSignedIn] = React.useState<NavigationBarContext["isSignedIn"]>(navigationBarContextDefs.isSignedIn)
  const [params] = useUrlSearchParams()
  const searchParams = useSearchParams()

  const secondaryMenu = menu?.items?.filter((i) => !i.requireAuthentication && i.group === "Account")

  React.useEffect(() => {
    const currentLanguage = params.language?.toString() ?? languagesMap.en_US.locale

    const updatedMenu: Menu = {
      ...menu,
      items: menu?.items?.map((item) => {
        const authenticatedItem = {
          ...item,
          isHidden: item.requireAuthentication ? !isSignedIn : undefined,
        }

        if (item.id === "language-select") {
          return {
            ...authenticatedItem,
            title: languagesMap?.[currentLanguage]?.value,
            flag: languagesMap?.[currentLanguage]?.flag,
          }
        } else {
          return authenticatedItem
        }
      }),
    }

    setMenu(updatedMenu)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, searchParams])

  return (
    <NavigationBarContext.Provider
      value={{
        menu,
        setMenu,
        isSignedIn,
        setIsSignedIn,
      }}
    >
      <header
        className={cn(
          "sticky top-0 z-20 flex w-full flex-col [--menu-gap:theme('spacing.3')] tablet-header-width:[--menu-gap:theme('spacing.4')] desktop-header-width:[--menu-gap:theme('spacing.8')]",
          // hide the header entirely if it has no visible contents
          "[&:not(:has([data-primary-header=visible],[data-secondary-header=visible],[data-tertiary-header=visible]))]:hidden"
        )}
      >
        <div className="relative z-10 flex flex-col-reverse bg-orange text-white">
          {/* primary menu */}
          {/* the DOM order is reversed with css flex so that the primary menu is the first keyboard tab target */}
          <div
            className="mx-auto flex h-[--primary-header-height] w-full max-w-[--header-maxWidth] items-center gap-[--menu-gap] px-[--page-inset] data-[primary-header=hidden]:hidden"
            data-primary-header={"visible" satisfies Visibility}
          >
            <div className="flex flex-1 items-center gap-[calc(var(--menu-gap)*2)]">
              <Link
                href="/"
                className="-mx-4 flex h-[--primary-header-height] max-w-max items-center gap-2 px-4 focus-visible:bg-white/20 focus-visible:outline-none"
              >
                <Icon name="easyJetLogo" className="w-[min(theme('width.28'),25cqw)] [aspect-ratio:91/22]" />
              </Link>

              {/* desktop-only */}
              <div className="max-tablet-header-width:hidden">
                <MenuDesktop />
              </div>
            </div>

            <MenuAside />
          </div>

          {/* secondary menu */}
          {/* the DOM order is reversed with css flex so that the primary menu is the first keyboard tab target */}
          <div
            className="mx-auto flex h-[--secondary-header-height] w-full max-w-[--header-maxWidth] items-center justify-end gap-3 border-b border-orange-light px-[--page-inset] data-[secondary-header=hidden]:hidden max-tablet-header-width:hidden"
            data-secondary-header={"visible" satisfies Visibility}
          >
            {secondaryMenu?.map((item, index) => {
              const ItemRenderer = item.dialogElement ? item.dialogElement : React.Fragment

              const isLink = !item.dialogElement
              const ItemTag = isLink ? Link : "button"

              return (
                <React.Fragment key={item.title}>
                  <ItemRenderer>
                    <ItemTag href="/" className={cn(textButtonVariants({}), "-mx-3 h-[--secondary-header-height] px-3 text-sm")}>
                      <span>{item.title}</span>
                      {!!item.flag && (
                        <Image
                          src={`/media/flags/${item.flag}.svg`}
                          alt={item.flag}
                          width={36}
                          height={28}
                          className="h-[1rem] w-auto shrink-0 overflow-hidden rounded-[4px] border-[1.5px] border-white bg-white"
                          priority
                        />
                      )}
                    </ItemTag>
                  </ItemRenderer>

                  {index < secondaryMenu.length - 1 && <span className="select-none text-orange-light">|</span>}
                </React.Fragment>
              )
            })}
          </div>

          {/* borders to differentiate the header from the page content and the theme-color area on mobile, we use divs so that they don't impact the variable-controlled header height */}
          {/* we hide this top border for the desktop header because the secondary nav is a solid orange and doesn't require differentiation from the theme-color */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-orange-light tablet-header-width:hidden" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-orange-light" />
        </div>

        {/* notice bar - incomplete */}
        {/* <section
          className="flex h-[--tertiary-header-height] w-full items-center justify-center bg-white text-sm text-primary data-[tertiary-header=hidden]:hidden"
          data-tertiary-header={pathname === "/" ? "hidden" : "visible"}
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
        </section> */}
      </header>
    </NavigationBarContext.Provider>
  )
}
