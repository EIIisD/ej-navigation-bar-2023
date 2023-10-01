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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"

const printAllFormSchema = z.object({
  includeAdverts: z.boolean(),
})

export const dialogPrintAllId = "dialog-print-all"

export const DialogPrintAll = ({ children }: { children: React.ReactNode }) => {
  const [dialog] = useModalState(dialogPrintAllId)
  const bookingContext = usePrintBookingContext()
  const { showAdverts, setShowAdverts, printMode, setPrintMode } = bookingContext

  if (printMode) {
    dialog.close()
  }

  const printAllForm = useForm<z.infer<typeof printAllFormSchema>>({
    resolver: zodResolver(printAllFormSchema),
    defaultValues: {
      includeAdverts: showAdverts,
    },
  })

  const onSubmit = printAllForm.handleSubmit((data: z.infer<typeof printAllFormSchema>) => {
    console.log(data)
    setShowAdverts(data.includeAdverts)
    setPrintMode(true)
    dialog.close()
  })

  return (
    <Form {...printAllForm}>
      <Dialog {...dialog.register}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogBody asChild>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              return void onSubmit()
            }}
          >
            <DialogMain className={menuMobileListStyle()}>
              <DialogTitle className={cn(menuMobileItemStyle({ variant: "title" }), "items-baseline justify-between")}>
                <span>Print your boarding passes</span>
              </DialogTitle>

              <div className={cn(menuMobileItemStyle({ variant: "default" }), "-mt-4 pb-8 pt-0")}>
                <p>Print all your boarding passes at once, ideal for multiple flights or group travel.</p>
              </div>
              <hr className="mb-6" />

              <FormField
                control={printAllForm.control}
                name="includeAdverts"
                render={({ field }) => (
                  <FormItem className={cn(menuMobileItemStyle({ border: "none" }), "flex-col gap-0 space-y-2")}>
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox id="includeAdverts" checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <label htmlFor="includeAdverts" className="-mt-0.5 cursor-pointer text-secondary">
                        <p className="font-bold text-primary">Include adverts?</p>
                        <p className="mt-1 text-sm">You can include adverts for updates on offers, or exclude them for a simpler boarding pass.</p>
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogMain>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" mode="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Print all</Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </Form>
  )
}
