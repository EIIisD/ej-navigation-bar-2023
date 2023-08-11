"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useModalState } from "@/lib/use-modal-state"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogMain, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { TextButton } from "@/components/ui/text-button"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"

const printBookingFormSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string(),
  staySignedIn: z.boolean(),
})

export const dialogPrintBookingId = "dialog-print-booking"

export const DialogPrintBooking = ({ children }: { children?: React.ReactNode }) => {
  const [dialog] = useModalState(dialogPrintBookingId, true)

  const printBookingForm = useForm<z.infer<typeof printBookingFormSchema>>({
    resolver: zodResolver(printBookingFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      staySignedIn: false,
    },
  })

  const onSubmit = printBookingForm.handleSubmit((data: z.infer<typeof printBookingFormSchema>) => {
    console.log(data)
    dialog.close()
    printBookingForm.reset()
  })

  return (
    <Form {...printBookingForm}>
      <Dialog {...dialog.register}>
        {children && <DialogTrigger asChild>{children}</DialogTrigger>}
        <DialogBody asChild>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              return void onSubmit()
            }}
          >
            <DialogMain className={menuMobileListStyle()}>
              <DialogTitle className={menuMobileItemStyle({ variant: "title" })}>Sign in</DialogTitle>

              <p className={cn(menuMobileItemStyle(), "text-secondary")}>Sign in to view and manage your account and bookings.</p>

              <FormField
                control={printBookingForm.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem className={cn(menuMobileItemStyle({ border: "none" }), "flex-col gap-0 space-y-2")}>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input type="email" autoComplete="email" placeholder="name@mail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={printBookingForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem className={cn(menuMobileItemStyle({ border: "none" }), "flex-col gap-0 space-y-2")}>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" autoComplete="current-password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={printBookingForm.control}
                name="staySignedIn"
                render={({ field }) => (
                  <FormItem className={cn(menuMobileItemStyle({ border: "none" }), "flex-col gap-0 space-y-2")}>
                    <div className="flex items-center gap-3">
                      <FormControl>
                        <Checkbox id="staySignedIn" checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <label htmlFor="staySignedIn" className="cursor-pointer text-secondary">
                        Keep me signed in
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={menuMobileItemStyle()}>
                <TextButton type="button" className="text-sm font-bold text-orange">
                  Forgotten your details?
                </TextButton>
              </div>
            </DialogMain>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" mode="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Sign in</Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </Form>
  )
}
