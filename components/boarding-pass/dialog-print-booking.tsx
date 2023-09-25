"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formatInfantPassengerTitle } from "@/config/booking"
import { useModalState } from "@/lib/use-modal-state"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogMain, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { usePrintBookingContext } from "@/components/boarding-pass/print-booking-context"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"

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

  const { booking, setSelectedPassengers, setSelectedFlights } = usePrintBookingContext()

  const printBookingForm = useForm<z.infer<typeof printBookingFormSchema>>({
    resolver: zodResolver(printBookingFormSchema),
    defaultValues: {
      // flights: booking.flights.map((flight) => flight.uid),
      // passengers: booking.passengers.map((passenger) => passenger.uid),
      flights: [],
      passengers: [],
    },
  })

  const onSubmit = printBookingForm.handleSubmit((data: z.infer<typeof printBookingFormSchema>) => {
    setSelectedPassengers(booking.passengers.filter((passenger) => data.passengers.includes(passenger.uid)))
    setSelectedFlights(booking.flights.filter((flight) => data.flights.includes(flight.uid)))
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
                <span>Your boarding passes</span>
              </DialogTitle>

              <div className={cn(menuMobileItemStyle({ variant: "default" }), "-mt-4 pb-8 pt-0")}>
                <p>Please choose the flights and passengers for whom you'd like to print boarding passes.</p>
              </div>

              <DialogTitle className={cn(menuMobileItemStyle({ variant: "default" }), "items-baseline justify-between border-b text-base font-bold")}>
                <span>Select Flights</span>

                <div className={cn("justify-end")}>
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
                          "group relative items-start gap-[--page-inset-small] transition-colors duration-100 hover:bg-gray-50/50 [&:has([checked])]:bg-gray-50"
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
                        <FormLabel className="w-full text-base/5 font-normal">
                          <div className="flex w-full items-baseline justify-between gap-[--page-inset-small]">
                            {flight.departureAirport.name} to {flight.arrivalAirport.name}
                            <Badge variant="secondary">{flight.number}</Badge>
                          </div>
                          <div className="mt-0.5 flex w-full items-baseline justify-between gap-[--page-inset-small] text-sm font-normal text-secondary">
                            {format(flight.departureDate, "EEEE, do MMMM yyyy")}
                          </div>
                          <div className="absolute inset-0" />
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}

              <DialogTitle
                className={cn(
                  menuMobileItemStyle({ variant: "default" }),
                  "mt-[--page-inset] items-baseline justify-between border-b text-base font-bold"
                )}
              >
                <span>Select Passengers</span>

                <div className={cn("justify-end")}>
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
                          "group relative items-start gap-[--page-inset-small] transition-colors duration-100 hover:bg-gray-50/50 [&:has([checked])]:bg-gray-50"
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
                        <FormLabel className="w-full text-base/5 font-normal">
                          <div className="flex w-full items-baseline justify-between gap-[--page-inset-small]">
                            {passenger.firstName} {passenger.lastName}
                            <Badge variant="secondary">{passenger.id}</Badge>
                          </div>
                          {passenger.infant && (
                            <div className="mt-0.5 flex w-full items-baseline justify-between gap-[--page-inset-small] text-sm font-normal text-secondary">
                              {formatInfantPassengerTitle(passenger.infant)} (infant)
                              {/* <TNums content={passenger.infant.id} /> */}
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
