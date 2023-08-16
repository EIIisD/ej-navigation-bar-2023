"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formatFlightTitle, formatInfantPassengerTitle, formatPassengerTitle } from "@/config/booking"
import { useModalState } from "@/lib/use-modal-state"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogMain, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"
import { TNums } from "@/components/tnums"

const printBookingFormSchema = z.object({
  flights: z.array(z.string()).refine((flights) => flights.length > 0, {
    message: "At least one flight must be selected",
    path: ["flights"],
  }),
  passengers: z.array(z.string()).refine((passengers) => passengers.length > 0, {
    message: "At least one passenger must be selected",
    path: ["passengers"],
  }),
})

export const dialogPrintBookingId = "dialog-print-booking"

export const DialogPrintBooking = ({ children }: { children?: React.ReactNode }) => {
  const [dialog] = useModalState(dialogPrintBookingId, true)

  const { booking, setSelectedPassengers } = usePrintBookingContext()

  const printBookingForm = useForm<z.infer<typeof printBookingFormSchema>>({
    resolver: zodResolver(printBookingFormSchema),
    defaultValues: {
      flights: booking.flights.map((flight) => flight.uid),
      passengers: booking.passengers.map((passenger) => passenger.uid),
    },
  })

  const onSubmit = printBookingForm.handleSubmit((data: z.infer<typeof printBookingFormSchema>) => {
    setSelectedPassengers(booking.passengers.filter((passenger) => data.passengers.includes(passenger.uid)))
    dialog.close()
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
              <DialogTitle className={cn(menuMobileItemStyle({ variant: "title" }), "items-baseline justify-between")}>
                <span>Select Flights</span>

                <div className={cn("mb-2 justify-end font-sans")}>
                  <div className="relative flex items-center gap-3">
                    <FormLabel htmlFor="select-all-flights" className="text-base/5 font-normal">
                      <span>{printBookingForm.watch("flights").length === booking.flights.length ? "Deselect all" : "Select all"}</span>
                      <div className="absolute inset-0" />
                    </FormLabel>
                    <Switch
                      id="select-all-flights"
                      checked={printBookingForm.watch("flights").length === booking.flights.length}
                      onCheckedChange={(checked) => {
                        return checked
                          ? printBookingForm.setValue(
                              "flights",
                              booking.flights.map((flight) => flight.uid)
                            )
                          : printBookingForm.setValue("flights", [])
                      }}
                    />
                  </div>
                </div>
              </DialogTitle>

              {booking.flights.map((flight, flightIndex) => (
                <FormField
                  key={flight.uid}
                  control={printBookingForm.control}
                  name="flights"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={flight.uid}
                        className={cn(
                          menuMobileItemStyle({
                            border: flightIndex === booking.flights.length - 1 || false ? "none" : "default",
                          }),
                          "group relative items-start gap-[--page-inset-small] transition-colors duration-100 hover:bg-gray-50"
                        )}
                      >
                        <Checkbox
                          checked={field.value?.includes(flight.uid)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, flight.uid])
                              : field.onChange(field.value?.filter((value) => value !== flight.uid))
                          }}
                        />
                        <FormLabel className="w-full text-base/5 font-normal peer-data-[state=checked]:font-bold">
                          <div className="flex w-full items-baseline justify-between gap-[--page-inset-small]">{formatFlightTitle(flight)}</div>
                          <div className="absolute inset-0" />
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}

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
                              booking.passengers.map((passenger) => passenger.uid)
                            )
                          : printBookingForm.setValue("passengers", [])
                      }}
                    />
                  </div>
                </div>
              </DialogTitle>

              {booking.passengers.map((passenger, passengerIndex) => (
                <FormField
                  key={passenger.uid}
                  control={printBookingForm.control}
                  name="passengers"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={passenger.uid}
                        className={cn(
                          menuMobileItemStyle({
                            border: passengerIndex === booking.passengers.length - 1 || false ? "none" : "default",
                          }),
                          "group relative items-start gap-[--page-inset-small] transition-colors duration-100 hover:bg-gray-50"
                        )}
                      >
                        <Checkbox
                          checked={field.value?.includes(passenger.uid)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, passenger.uid])
                              : field.onChange(field.value?.filter((value) => value !== passenger.uid))
                          }}
                        />
                        <FormLabel className="w-full text-base/5 font-normal peer-data-[state=checked]:font-bold">
                          <div className="flex w-full items-baseline justify-between gap-[--page-inset-small]">
                            {formatPassengerTitle(passenger)} <TNums className="font-normal" content={passenger.id} />
                          </div>
                          {passenger.infant && (
                            <div className="mt-0.5 flex w-full items-baseline justify-between gap-[--page-inset-small] text-sm font-normal text-secondary">
                              {formatInfantPassengerTitle(passenger.infant)} <TNums content={passenger.infant.id} />
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
              <Button type="submit" disabled={printBookingForm.watch("passengers").length === 0}>
                Continue
              </Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </Form>
  )
}
