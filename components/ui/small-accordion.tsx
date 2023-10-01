"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn("border-t first:border-none", className)} {...props} />)

AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group relative flex flex-1 items-center justify-between px-[--px] py-[--py] transition-all data-[state=closed]:text-orange",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-6 w-6 shrink-0 text-orange transition-transform duration-200 group-data-[state=open]:rotate-180" />
      <div className="absolute left-0 top-0 w-full border-b-sm border-gray-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "relative overflow-hidden bg-gray-50/50 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="absolute left-0 top-0 w-full border-b-sm border-gray-200" />
    <div className="px-[--px] py-[--py]">{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export {
  Accordion as SmallAccordion,
  AccordionItem as SmallAccordionItem,
  AccordionTrigger as SmallAccordionTrigger,
  AccordionContent as SmallAccordionContent,
}
