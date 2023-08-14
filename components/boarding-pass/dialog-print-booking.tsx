"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useModalState } from "@/lib/use-modal-state"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogMain, DialogTitle } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { PrintBookingContext, printBookingContextDefs } from "@/components/boarding-pass/print-booking-context"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"
import { TNums } from "@/components/tnums"

const printBookingFormSchema = z.object({ passengers: z.array(z.string()) })

export const dialogPrintBookingId = "dialog-print-booking"

export const DialogPrintBooking = ({ children }: { children: React.ReactNode }) => {
  const [dialog] = useModalState(dialogPrintBookingId, true)
  const [booking, setBooking] = React.useState<PrintBookingContext["booking"]>(printBookingContextDefs.booking)

  const skipPassengerSelection = printBookingContextDefs.booking.passengers.length === 1 || true

  const [selectedPassengers, setSelectedPassengers] = React.useState<PrintBookingContext["selectedPassengers"]>(
    printBookingContextDefs.selectedPassengers
  )

  const printBookingForm = useForm<z.infer<typeof printBookingFormSchema>>({
    resolver: zodResolver(printBookingFormSchema),
    defaultValues: { passengers: booking.passengers.map((passenger) => passenger.id) },
  })

  const onSubmit = printBookingForm.handleSubmit((data: z.infer<typeof printBookingFormSchema>) => {
    setSelectedPassengers(booking.passengers.filter((passenger) => data.passengers.includes(passenger.id)))
    dialog.close()
  })

  React.useEffect(() => {
    setSelectedPassengers(booking.passengers)
    if (skipPassengerSelection) dialog.close()
  }, [booking.passengers, skipPassengerSelection, dialog])

  return (
    <PrintBookingContext.Provider
      value={{
        booking,
        setBooking,
        selectedPassengers,
        setSelectedPassengers,
      }}
    >
      {skipPassengerSelection ? (
        children
      ) : (
        <Form {...printBookingForm}>
          <Dialog {...dialog.register}>
            {children}
            <DialogBody asChild>
              <form
                onSubmit={(e) => {
                  e.preventDefault()

                  return void onSubmit()
                }}
              >
                <DialogMain className={menuMobileListStyle()}>
                  <DialogTitle className={cn(menuMobileItemStyle({ variant: "title" }), "items-baseline justify-between")}>
                    <span>Select Passengers</span>

                    <div className={cn("mb-2 justify-end font-sans")}>
                      <div className="relative flex items-center gap-3">
                        <FormLabel htmlFor="select-all-passengers" className="text-base/5 font-normal">
                          <span>{printBookingForm.watch("passengers").length === booking.passengers.length ? "Deselect all" : "Select all"}</span>
                          <div className="absolute inset-0" />
                        </FormLabel>
                        <Switch
                          id="select-all-passengers"
                          checked={printBookingForm.watch("passengers").length === booking.passengers.length}
                          onCheckedChange={(checked) => {
                            return checked
                              ? printBookingForm.setValue(
                                  "passengers",
                                  booking.passengers.map((passenger) => passenger.id)
                                )
                              : printBookingForm.setValue("passengers", [])
                          }}
                        />
                      </div>
                    </div>
                  </DialogTitle>

                  {booking.passengers.map((passenger, passengerIndex) => (
                    <FormField
                      key={passenger.id}
                      control={printBookingForm.control}
                      name="passengers"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={passenger.id}
                            className={cn(
                              menuMobileItemStyle({
                                border: passengerIndex === booking.passengers.length - 1 || false ? "none" : "default",
                              }),
                              "group relative items-start gap-[--page-inset-small] transition-colors duration-100 hover:bg-gray-50"
                            )}
                          >
                            <Checkbox
                              checked={field.value?.includes(passenger.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, passenger.id])
                                  : field.onChange(field.value?.filter((value) => value !== passenger.id))
                              }}
                            />
                            <FormLabel className="w-full text-base/5 font-normal peer-data-[state=checked]:font-bold">
                              <div className="flex w-full items-baseline justify-between gap-[--page-inset-small]">
                                <span>
                                  {passenger.firstName} {passenger.lastName} {passenger.infant && " + Infant"}
                                </span>{" "}
                                <TNums className="font-normal" content={passenger.id} />
                              </div>
                              {passenger.infant && (
                                <div className="mt-0.5 flex w-full items-baseline justify-between gap-[--page-inset-small] text-sm font-normal text-secondary">
                                  <span>
                                    {passenger.infant.firstName} {passenger.infant.lastName}
                                  </span>{" "}
                                  <TNums content={passenger.infant.id} />
                                </div>
                              )}
                              <div className="absolute inset-0" />
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                </DialogMain>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" mode="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Continue</Button>
                </DialogFooter>
              </form>
            </DialogBody>
          </Dialog>
        </Form>
      )}
    </PrintBookingContext.Provider>
  )
}
