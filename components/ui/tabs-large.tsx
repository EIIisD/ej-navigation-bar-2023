"use client"

import React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/icon"

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
          className={cn(
            "scrollbar-none relative isolate flex h-12 items-center justify-start gap-4 overflow-x-auto pr-[--fade-width] [--fade-width:100px] [mask-image:linear-gradient(to_right,black_calc(100%-var(--fade-width)),transparent)]",
            className
          )}
          {...props}
        />

        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gray-200" />

        {isOverflowing && (
          <div className="absolute left-0 top-0 flex h-12 items-center">
            <Button
              variant="icon"
              mode="default"
              className={cn(
                "h-9 w-9 opacity-0 shadow-lg transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100",
                !showBackButton && "!opacity-0"
              )}
              onClick={() => tabsListRef.current?.scrollBy({ left: -100, behavior: "smooth" })}
            >
              <Icon name="arrowLeft" className="h-6 w-6" />
            </Button>
          </div>
        )}
        {isOverflowing && (
          <div className="absolute right-0 top-0 flex h-12 items-center">
            <Button
              variant="icon"
              mode="default"
              className={cn(
                "h-9 w-9 opacity-0 shadow-lg transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100",
                !showForwardButton && "!opacity-0"
              )}
              onClick={() => tabsListRef.current?.scrollBy({ left: 100, behavior: "smooth" })}
            >
              <Icon name="arrowRight" className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    )
  }
)

TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>>(
  ({ className, ...props }, ref) => (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "relative z-10 inline-flex h-12 items-center justify-center whitespace-nowrap px-1 text-base/none font-bold text-orange transition-all data-[state=active]:text-primary",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-[4px] data-[state=active]:after:bg-orange data-[state=inactive]:hover:after:bg-gray-200",
        className
      )}
      {...props}
    />
  )
)

TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Content>, React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>>(
  ({ className, ...props }, ref) => <TabsPrimitive.Content ref={ref} className={cn("mt-4", className)} {...props} />
)

TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
