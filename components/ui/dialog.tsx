"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogClose = DialogPrimitive.Close

const useExperimentalStyling = false

const sharedDialogAnimation = cn(
  "data-[state=open]:duration-300 data-[state=open]:ease-out data-[state=open]:animate-in",
  "data-[state=closed]:duration-200 data-[state=closed]:ease-in data-[state=closed]:animate-out"
)

const DialogBody = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center bg-black/25 px-[--page-inset-small] py-[--header-height] backdrop-blur-sm tablet-header-width:items-center",
        "data-[state=open]:fade-in-0",
        "data-[state=closed]:fade-out-0",
        sharedDialogAnimation
      )}
    >
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "flex max-h-full w-full flex-col rounded-xl bg-white text-primary shadow-xl tablet-header-width:max-w-[--dialog-maxWidth]",
          "data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-4",
          "data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-top-4",
          sharedDialogAnimation,
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Overlay>
  </DialogPrimitive.Portal>
))
DialogBody.displayName = DialogPrimitive.Content.displayName

const DialogMain = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex-1 overflow-y-scroll",
      useExperimentalStyling
        ? "[mask-image:linear-gradient(black_80%,transparent)]"
        : "",
      className
    )}
    {...props}
  />
)
DialogMain.displayName = "DialogScrollArea"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex shrink-0 items-center justify-end gap-[calc(var(--page-inset)/3)] px-[--page-inset] py-[calc(var(--page-inset)/2)]",
      useExperimentalStyling ? "" : "shadow-md-up",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = DialogPrimitive.Title

const DialogDescription = DialogPrimitive.Description

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogBody,
  DialogMain,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
