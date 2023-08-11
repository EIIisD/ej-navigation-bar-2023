"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import { cva } from "class-variance-authority"
import { AnimatePresence, motion } from "framer-motion"

import { type Menu } from "@/config/menu"
import { useModalState } from "@/lib/use-modal-state"
import { cn, findInMenu } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

const Menu = {
  Root: DialogPrimitive.Root,
  Trigger: DialogPrimitive.Trigger,
  Portal: DialogPrimitive.Portal,
  Content: motion(DialogPrimitive.Content),
  Title: DialogPrimitive.Title,
  Close: DialogPrimitive.Close,
}

const MotionLink = motion(Link)

export const menuMobileListStyle = cva("flex h-full flex-col p-[calc(var(--page-inset)/2)] pb-24 text-primary")

export const menuMobileItemStyle = cva("flex items-start gap-[--page-inset] px-[calc(var(--page-inset)/2)]", {
  variants: {
    variant: {
      default: "py-4",
      attributionWidget: "-mt-6 pb-8",
      title: "!gap-3 pb-8 pt-10 font-display text-4xl",
      hiddenTitle: "py-6",
    },
    border: {
      default: "border-b-[0.5px]",
      none: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const menuMobileId = "menu-mobile"

export const MenuMobile = () => {
  const navigationBarContext = useNavigationBarContext()
  const [menu] = useModalState(menuMobileId)
  const [activeMenuTitle, setActiveMenuTitle] = React.useState<string>(navigationBarContext.menu.title)

  const isBaseMenu = activeMenuTitle === navigationBarContext.menu.title
  const activeMenu = findInMenu(navigationBarContext.menu, (i) => i.title === activeMenuTitle)
  const activeMenuParent = findInMenu(navigationBarContext.menu, (i) => i.title === activeMenuTitle, true)

  const handleNavigate = (menu: Menu) => {
    const message = `You successfully clicked "${menu.title}". Please keep in mind that this page is not currently in the demo.`
    if (menu.items && menu.items.length !== 0) setActiveMenuTitle(menu.title)
    else alert(message)
  }

  return (
    <Menu.Root {...menu.register} modal={false}>
      <Menu.Trigger asChild>
        <button
          type="button"
          className="group/menu-icon relative grid h-[--primary-header-height] w-[--primary-header-height] shrink-0 place-items-center focus-visible:bg-white/20"
          data-state={menu.isOpen ? "open" : "closed"}
        >
          <div className="grid w-6 grid-rows-3 gap-[0.3125rem] [&>*]:col-span-full [&>*]:h-[0.15625rem] [&>*]:rounded-full [&>*]:bg-current [&>*]:transition-all [&>*]:duration-200">
            <div className="row-[1] group-data-[state=open]/menu-icon:translate-y-3 group-data-[state=open]/menu-icon:scale-0 group-data-[state=open]/menu-icon:opacity-0" />
            <div className="row-[2] group-data-[state=open]/menu-icon:rotate-45" />
            <div className="row-[2] group-data-[state=open]/menu-icon:-rotate-45" />
            <div className="row-[3] group-data-[state=open]/menu-icon:-translate-y-3 group-data-[state=open]/menu-icon:scale-0 group-data-[state=open]/menu-icon:opacity-0" />
          </div>
        </button>
      </Menu.Trigger>
      <Menu.Portal forceMount>
        <React.Fragment key="portal-child-fragment">
          <AnimatePresence>
            {menu.isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: { duration: 0.3 },
                }}
                exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
                className="fixed inset-0 top-[--header-height] z-30 bg-white"
              >
                <Menu.Content
                  key={`${activeMenuTitle}-${navigationBarContext.language}`}
                  onInteractOutside={(e) => e.preventDefault()}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        when: "beforeChildren",
                      },
                    },
                  }}
                  className={cn(menuMobileListStyle(), "overflow-y-scroll")}
                >
                  {activeMenu.groups?.map((group, groupIndex) => {
                    const motionProps = {
                      variants: {
                        hidden: {
                          x: "var(--page-inset)",
                          opacity: 0,
                          transition: {
                            type: "tween",
                            duration: 0.2,
                          },
                        },
                        visible: {
                          x: 0,
                          opacity: 1,
                          transition: {
                            type: "tween",
                            duration: 0.3,
                          },
                        },
                      },
                    }

                    const groupItems = activeMenu.items?.filter((i) => i.group === group.title)

                    return (
                      <React.Fragment key={`${groupIndex}-fragment`}>
                        {group.hasVisibleLabel === false && (
                          <motion.div
                            {...motionProps}
                            key={`${groupIndex}-label-hidden`}
                            className={menuMobileItemStyle({
                              variant: "hiddenTitle",
                            })}
                          >
                            <VisuallyHidden.Root>{group.title}</VisuallyHidden.Root>
                          </motion.div>
                        )}
                        {group.hasVisibleLabel !== false && (
                          <motion.h2
                            {...motionProps}
                            key={`${groupIndex}-label`}
                            className={menuMobileItemStyle({
                              variant: "title",
                            })}
                          >
                            <React.Fragment>
                              <span>{group.title}</span>
                              {!!group.iconElement && <Icon name={group.iconElement} className="h-[1em] w-[1em] text-secondary" />}
                            </React.Fragment>
                          </motion.h2>
                        )}
                        {activeMenu.attributionBannerElement && (
                          <motion.div
                            {...motionProps}
                            key={`${groupIndex}-attribution-widget`}
                            className={menuMobileItemStyle({
                              variant: "attributionWidget",
                            })}
                          >
                            <activeMenu.attributionBannerElement />
                          </motion.div>
                        )}
                        {groupItems
                          ?.filter((i) => i.isHidden !== true)
                          ?.map((groupItem, groupItemIndex) => {
                            const isLastChild = groupItemIndex === groupItems.length - 1 || false

                            const hasSubMenu = groupItem.items && groupItem.items.length !== 0

                            const itemContents = (
                              <>
                                {!!groupItem.iconElement && (
                                  <div className="grid h-11 shrink-0 place-items-center">
                                    <Icon name={groupItem.iconElement} className="h-7 w-7 shrink-0 text-orange" />
                                  </div>
                                )}
                                <div className="flex flex-1 items-center gap-[--page-inset] place-self-center">
                                  <div>
                                    <div
                                      className={cn(
                                        "line-clamp-1 flex items-center gap-3",
                                        groupIndex === 0 && "font-bold",
                                        groupItem.description ? "text-base" : "text-lg"
                                      )}
                                    >
                                      <span>{groupItem.title}</span>
                                      {!!groupItem.secondaryItemElement && (
                                        <Icon
                                          name={groupItem.secondaryItemElement}
                                          className="h-[1.375rem] w-[1.375rem] shrink-0 rounded text-tertiary"
                                        />
                                      )}
                                      {!!groupItem.flag && (
                                        <Image
                                          src={`/media/flags/${groupItem.flag}.svg`}
                                          alt={groupItem.flag}
                                          width={36}
                                          height={28}
                                          className="h-auto w-[1.375rem] rounded-[4px] border-[1.5px] border-primary bg-primary"
                                        />
                                      )}
                                    </div>
                                    {!!groupItem.description && (
                                      <div className="line-clamp-2 max-w-[28ch] text-sm text-secondary">{groupItem.description}</div>
                                    )}
                                  </div>
                                </div>

                                <div
                                  className={cn("grid h-11 w-[--primary-header-height] shrink-0 place-items-center", !hasSubMenu && "w-0 opacity-0")}
                                >
                                  <Icon name="chevronRight" className="h-5 w-5 text-orange" />
                                </div>
                              </>
                            )

                            if (!!groupItem.dialogElement) {
                              return (
                                <groupItem.dialogElement key={`${groupItemIndex}-item-with-dialog-wrapper`}>
                                  <motion.button
                                    {...motionProps}
                                    key={`${groupItemIndex}-item-with-dialog`}
                                    type="button"
                                    className={menuMobileItemStyle({
                                      border: isLastChild ? "none" : "default",
                                    })}
                                  >
                                    {itemContents}
                                  </motion.button>
                                </groupItem.dialogElement>
                              )
                            }

                            if (!hasSubMenu && groupItem.id !== "sign-out") {
                              return (
                                <MotionLink
                                  {...motionProps}
                                  key={`${groupItemIndex}-item-without-submenu`}
                                  href="/"
                                  className={menuMobileItemStyle({
                                    border: isLastChild ? "none" : "default",
                                  })}
                                >
                                  {itemContents}
                                </MotionLink>
                              )
                            }

                            return (
                              <motion.button
                                {...motionProps}
                                key={`${groupItemIndex}-item-with-submenu`}
                                type="button"
                                className={menuMobileItemStyle({
                                  border: isLastChild ? "none" : "default",
                                })}
                                onClick={() => {
                                  if (groupItem.id === "sign-out") {
                                    navigationBarContext.setIsSignedIn(false)
                                    menu.close()
                                  } else {
                                    handleNavigate(groupItem)
                                  }
                                }}
                              >
                                {itemContents}
                              </motion.button>
                            )
                          })}
                      </React.Fragment>
                    )
                  })}

                  <div className="fixed bottom-[--page-inset] place-self-center">
                    <Menu.Close asChild>
                      <Button
                        type="button"
                        className="rounded-full text-base font-bold shadow-lg"
                        onClick={(e) => {
                          if (!isBaseMenu) {
                            e.preventDefault()
                            handleNavigate(activeMenuParent)
                          }
                        }}
                      >
                        {isBaseMenu ? (
                          <>
                            <Icon name="crossSmall" className="-ml-1.5 h-5 w-5" />
                            Close
                          </>
                        ) : (
                          <>
                            <Icon name="arrowLeft" className="-ml-1.5 h-5 w-5" />
                            {activeMenuParent.title}
                          </>
                        )}
                      </Button>
                    </Menu.Close>
                  </div>
                </Menu.Content>
              </motion.div>
            )}
          </AnimatePresence>
        </React.Fragment>
      </Menu.Portal>
    </Menu.Root>
  )
}
