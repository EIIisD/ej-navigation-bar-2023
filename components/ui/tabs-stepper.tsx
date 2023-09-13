"use client"

import React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<React.ElementRef<typeof TabsPrimitive.List>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>>(
  ({ className, ...props }, ref) => {
    const [isOverflowing, setIsOverflowing] = React.useState(false)
    const [scrollPosition, setScrollPosition] = React.useState(0)
    const tabsListRef = React.useRef<HTMLElement | null>(null)

    const checkOverflow = () => {
      if (tabsListRef.current) {
        setIsOverflowing(tabsListRef.current.offsetWidth < tabsListRef.current.scrollWidth)
        setScrollPosition(tabsListRef.current.scrollLeft)
      }
    }

    React.useEffect(() => {
      checkOverflow()
      window.addEventListener("resize", checkOverflow)
      window.addEventListener("scroll", checkOverflow)

      return () => {
        window.removeEventListener("resize", checkOverflow)
        window.removeEventListener("scroll", checkOverflow)
      }
    }, [])

    React.useEffect(() => {
      const handleScroll = () => {
        if (tabsListRef.current) {
          setScrollPosition(Math.floor(tabsListRef.current.scrollLeft))
        }
      }

      tabsListRef.current?.addEventListener("scroll", handleScroll)

      return () => {
        tabsListRef.current?.removeEventListener("scroll", handleScroll)
      }
    }, [])

    const showBackButton = scrollPosition > 0
    const showForwardButton = tabsListRef.current && scrollPosition < tabsListRef.current.scrollWidth - tabsListRef.current.clientWidth - 1

    return (
      <div className="group relative">
        <TabsPrimitive.List
          ref={(el) => {
            if (typeof ref === "function") {
              ref(el)
            } else if (ref) {
              ref.current = el
            }

            tabsListRef.current = el
          }}
          className={cn("scrollbar-none relative isolate grid auto-cols-fr grid-flow-col overflow-x-auto", className)}
          {...props}
        />

        {/* {isOverflowing && (
          <div
            className={cn(
              "absolute left-0 top-0 flex h-12 w-12 items-center justify-start opacity-0 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100",
              !showBackButton && "pointer-events-none touch-none !opacity-0"
            )}
          >
            <div className="pointer-events-none absolute inset-0 -right-24 bottom-[1px] touch-none bg-gradient-to-r from-white/100 via-white/80 to-white/0" />
            <Button
              unstyled
              variant="icon"
              mode="default"
              className={cn("relative flex h-12 w-12 items-center justify-center text-orange")}
              onClick={() => tabsListRef.current?.scrollBy({ left: -100, behavior: "smooth" })}
            >
              <Icon name="arrowLeft" className="h-6 w-6" />
            </Button>
          </div>
        )}
        {isOverflowing && (
          <div
            className={cn(
              "absolute right-0 top-0 flex h-12 w-12 items-center justify-end opacity-0 transition-opacity duration-300 hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100",
              !showForwardButton && "pointer-events-none touch-none !opacity-0"
            )}
          >
            <div className="pointer-events-none absolute inset-0 -left-24 bottom-[1px] touch-none bg-gradient-to-l from-white/100 via-white/80 to-white/0" />
            <Button
              unstyled
              variant="icon"
              mode="default"
              className={cn("relative flex h-12 w-12 items-center justify-center text-orange")}
              onClick={() => tabsListRef.current?.scrollBy({ left: 100, behavior: "smooth" })}
            >
              <Icon name="arrowRight" className="h-6 w-6" />
            </Button>
          </div>
        )} */}
      </div>
    )
  }
)

TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative z-10 inline-flex min-h-[3rem] items-center justify-center px-0.5 transition-all",
        "data-[state=inactive]:[--primary:theme('colors.secondary.DEFAULT')] data-[state=inactive]:[--secondary:theme('colors.secondary.DEFAULT')] data-[state=inactive]:[--tertiary:theme('colors.gray.300')]",
        "data-[state=active]:[--primary:theme('colors.primary.DEFAULT')] data-[state=active]:[--secondary:theme('colors.primary.DEFAULT')] data-[state=active]:[--tertiary:theme('colors.orange.DEFAULT')]",
        "data-[state=inactive]:[--highlight-bg:theme('colors.gray.200')] data-[state=inactive]:[--highlight-fg:theme('colors.secondary.DEFAULT')]",
        "data-[state=active]:[--highlight-bg:theme('colors.orange.DEFAULT')] data-[state=active]:[--highlight-fg:theme('colors.white')]",
        "text-[--primary]",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-[4px] after:transition-colors data-[state=active]:after:bg-orange data-[state=inactive]:hover:after:bg-gray-300",
        className
      )}
      {...props}
    >
      {children}
    </TabsPrimitive.Trigger>
  )
)

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn("", className)} {...props} />
)

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
