"use client"

import React from "react"
import Link from "next/link"
import * as MenuPrimitive from "@radix-ui/react-navigation-menu"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cva } from "class-variance-authority"
import { motion } from "framer-motion"

import { type Menu } from "@/config/menu"
import { cn } from "@/lib/utils"
import { Icon, type IconName } from "@/components/icon"
import { AnimatedArrowIcon } from "@/components/navigation-bar/animated-arrow-icon"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

const contentEditable = false

const Menu = {
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

const Tabs = {
  TabsContent: TabsPrimitive.TabsContent,
  Root: TabsPrimitive.Root,
  List: TabsPrimitive.List,
  Trigger: TabsPrimitive.Trigger,
  Content: motion(TabsPrimitive.Content),
}

const MenuLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    title: string
    description?: string
    iconElement?: IconName
  }
>(({ title, description, iconElement: IconElement, ...props }, ref) => {
  const [showArrow, setShowArrow] = React.useState(false)

  return (
    <Menu.Link onSelect={(e) => contentEditable && e.preventDefault()} asChild>
      <Link
        href="/"
        ref={ref}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
        onFocus={() => setShowArrow(true)}
        onBlur={() => setShowArrow(false)}
        className="group -m-3 -mr-8 flex items-start gap-4 rounded-lg p-3 pr-8 [--avg-height:2.25rem]"
        {...props}
      >
        <div className="flex h-[--avg-height] shrink-0 items-center justify-center">
          {!!IconElement && <Icon name={IconElement} className="h-7 w-7 text-orange transition-colors duration-100 group-hover:text-orange-darker" />}
        </div>
        <div className="flex min-h-[--avg-height] flex-col justify-center">
          <div className="relative max-w-max text-sm/4 font-bold text-primary">
            <span contentEditable={contentEditable} suppressContentEditableWarning={contentEditable}>
              {title}
            </span>
            {""}
            <AnimatedArrowIcon show={showArrow} leading="4" />
          </div>
          {!!description && (
            <div
              className="mt-1 line-clamp-1 text-sm/4 text-secondary transition-colors duration-100 group-hover:text-primary"
              contentEditable={contentEditable}
              suppressContentEditableWarning={contentEditable}
            >
              {description}
            </div>
          )}
        </div>
      </Link>
    </Menu.Link>
  )
})

MenuLink.displayName = "MenuLink"

const ControlledTabs = ({ menuItem }: { menuItem: Menu }) => {
  const defaultItem = menuItem.items?.[0]

  const [activeItem, setActiveItem] = React.useState<string | undefined>(defaultItem?.title)

  return (
    <Tabs.Root
      value={activeItem}
      onValueChange={setActiveItem}
      defaultValue={defaultItem?.title}
      orientation="vertical"
      className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] place-content-start divide-x-[0.5px] max-desktop-header-width:mx-[--page-inset] max-desktop-header-width:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]"
    >
      <Tabs.List loop className="grid place-content-start overflow-hidden">
        {menuItem?.items?.map((tab) => (
          <Tabs.Trigger
            key={tab.title}
            value={tab.title}
            onMouseEnter={() => {
              setActiveItem(tab.title)
            }}
            className="group relative flex items-center rounded-none border-b-[0.5px] text-orange transition-colors duration-200 last:border-none focus-visible:-outline-offset-1 data-[state=active]:text-primary"
          >
            {activeItem === tab.title && (
              <motion.div layoutId={menuItem.title} transition={{ duration: 0.25 }} className="absolute inset-0 bg-gray-400/5">
                <div className="h-full w-1 bg-orange" />
              </motion.div>
            )}
            <div className="relative ml-1 flex w-full items-start gap-3 px-[--page-inset] py-[--page-inset-small]">
              <div className="flex-auto">
                <h3 className="flex items-start gap-2 text-lg/6">
                  {tab.iconElement === "facilitiesWheelchairOutlined" && (
                    <div className="flex h-6 items-center justify-center">
                      <Icon name={tab.iconElement} className="h-5 w-5 shrink-0" />
                    </div>
                  )}
                  <span contentEditable={contentEditable} suppressContentEditableWarning={contentEditable}>
                    {tab.title}
                  </span>
                </h3>
                {!!tab.description && (
                  <p
                    className="mt-2 line-clamp-2 text-sm text-secondary"
                    contentEditable={contentEditable}
                    suppressContentEditableWarning={contentEditable}
                  >
                    {tab.description}
                  </p>
                )}
              </div>
              <div className="flex h-6 items-center justify-center text-gray-300 transition-colors duration-300 group-data-[state=active]:text-primary">
                <Icon name="chevronRight" className="h-4 w-4 shrink-0" />
              </div>
            </div>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <div className="grid grid-cols-1 grid-rows-1 overflow-hidden">
        {menuItem?.items?.map((tab, index) => {
          const isActiveTab = tab.title === activeItem

          const isBeforeActiveTab = menuItem?.items && index < menuItem?.items?.findIndex((i) => i.title === activeItem)

          return (
            <Tabs.Content
              className="grid grid-cols-2 place-content-start place-items-start gap-x-7 gap-y-[--page-inset] px-[--page-inset-large] py-[--page-inset-small] will-change-[transform,opacity] [grid-area:1/1]"
              key={tab.title}
              value={tab.title}
              initial={false}
              forceMount={true}
              variants={{
                hidden: {
                  opacity: 0,
                  y: isBeforeActiveTab ? -72 : 72,
                  pointerEvents: "none",
                  transition: { duration: 0.25 },
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  pointerEvents: "initial",
                  transition: { duration: 0.25 },
                },
              }}
              animate={isActiveTab ? "visible" : "hidden"}
              tabIndex={isActiveTab ? undefined : -1}
            >
              {tab?.items?.map((tabLink) => <MenuLink key={tabLink.title} tabIndex={isActiveTab ? undefined : -1} {...tabLink} />)}
            </Tabs.Content>
          )
        })}
      </div>
      <div className="py-[--page-inset-small] pl-[--page-inset] max-desktop-header-width:hidden">
        {menuItem.widgetElement && <menuItem.widgetElement />}
      </div>
      <div className="absolute bottom-0 right-0 border-none px-[--page-inset] py-[--page-inset-small] text-primary">
        {menuItem.attributionBannerElement && <menuItem.attributionBannerElement />}
      </div>
    </Tabs.Root>
  )
}

export const menuDesktopTriggerStyle = cva(
  "group/menu-trigger relative mx-[calc(var(--menu-gap)/-2)] flex h-[--primary-header-height] items-center justify-center gap-1.5 px-[calc(var(--menu-gap)/2)] font-bold focus-visible:bg-white/20 focus-visible:outline-none"
)

export const MenuDesktop = () => {
  const navigationBarContext = useNavigationBarContext()

  const primaryMenu = navigationBarContext.menu.items?.filter((i) => i.group === "Menu")

  return (
    <Menu.Root className="z-10 flex max-w-max flex-1 items-center justify-center [&>[style='position:relative']]:[position:unset!important]">
      <Menu.List className="group flex flex-1 list-none items-center justify-center gap-[--menu-gap]">
        {primaryMenu?.map((menuItem, menuItemIndex) => {
          return (
            <Menu.Item key={menuItemIndex}>
              <Menu.Trigger className={menuDesktopTriggerStyle()}>
                <span className="line-clamp-1 break-all">{menuItem.title}</span>
                <Icon name="arrowDown" className="h-4 w-4 transition duration-200 group-data-[state=open]/menu-trigger:-rotate-180" />
                <div className="absolute inset-x-[calc(var(--menu-gap)/2)] bottom-3 h-[2px] rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover/menu-trigger:opacity-25 group-focus/menu-trigger:opacity-25 group-data-[state=open]/menu-trigger:opacity-100" />
              </Menu.Trigger>
              <Menu.Content
                className={cn(
                  !!menuItem.attributionBannerElement ? "pb-[calc(var(--page-inset-small)*2+theme('height.8'))]" : "pb-[--page-inset-small]",
                  "absolute inset-x-0 top-0 mx-auto w-full max-w-[--header-maxWidth] pt-[--page-inset-small]",
                  "data-[motion^=from-]:duration-300 data-[motion^=to-]:duration-200 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52"
                )}
              >
                <ControlledTabs menuItem={menuItem} />
              </Menu.Content>
            </Menu.Item>
          )
        })}
      </Menu.List>

      <div className="fixed inset-x-0 top-[--header-height] overflow-hidden [--shadow-clip-padding:45px]">
        <Menu.Viewport
          className={cn(
            "peer relative z-[2] mx-auto h-[calc(var(--radix-navigation-menu-viewport-height)+var(--shadow-clip-padding))] w-full max-w-[--header-maxWidth] overflow-hidden transition-[height]",
            "data-[state=closed]:duration-200 data-[state=open]:duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-4 data-[state=open]:slide-in-from-top-4",
            "will-change-contents"
          )}
        />
        <div
          className={cn(
            "absolute inset-0 bottom-[--shadow-clip-padding] z-[1] bg-white shadow-xl",
            "peer-[[data-state=closed]]:duration-200 peer-[[data-state=open]]:duration-300 peer-[[data-state=open]]:animate-in peer-[[data-state=closed]]:animate-out peer-[[data-state=closed]]:fade-out-0 peer-[[data-state=open]]:fade-in-0 peer-[[data-state=closed]]:slide-out-to-top-4 peer-[[data-state=open]]:slide-in-from-top-4"
          )}
        />
      </div>
    </Menu.Root>
  )
}
