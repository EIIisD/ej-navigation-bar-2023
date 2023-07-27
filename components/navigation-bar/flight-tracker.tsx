"use client"

import { toTitleCase } from "@artsy/to-title-case"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const FlightTracker = () => {
  return (
    <div className="space-y-6 pr-[6px]">
      <div>
        <div className="text-base font-bold text-primary">
          {toTitleCase("Flight Tracker")}
        </div>
        <div className="mt-1 text-sm/4 text-secondary">
          Check your flight status by:
        </div>
      </div>
      <Tabs defaultValue="flight" className="grid gap-6">
        <TabsList>
          <TabsTrigger value="flight">Flight</TabsTrigger>
          <TabsTrigger value="route">Route</TabsTrigger>
        </TabsList>
        <TabsContent value="flight">
          <StatusByFlightForm />
        </TabsContent>
        <TabsContent value="route">
          <StatusByRouteForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const StatusByFlightForm = () => {
  const statusByFlightFormSchema = z.object({
    flightNumber: z.string().nonempty(),
  })

  const statusByFlightForm = useForm<z.infer<typeof statusByFlightFormSchema>>({
    resolver: zodResolver(statusByFlightFormSchema),
    defaultValues: {
      flightNumber: "",
    },
  })

  const onSubmit = statusByFlightForm.handleSubmit(
    (data: z.infer<typeof statusByFlightFormSchema>) => {
      console.log(data)
      statusByFlightForm.reset()
    }
  )

  return (
    <Form {...statusByFlightForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          return void onSubmit()
        }}
        className="grid gap-4"
      >
        <FormField
          control={statusByFlightForm.control}
          name="flightNumber"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>Flight number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234"
                  iconElement="searchAndMenuAirplaneModeAltSolid"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Check status
        </Button>
      </form>
    </Form>
  )
}

const StatusByRouteForm = () => {
  const statusByRouteFormSchema = z.object({
    flightOrigin: z.string().nonempty(),
    flightDestination: z.string().nonempty(),
  })

  const statusByRouteForm = useForm<z.infer<typeof statusByRouteFormSchema>>({
    resolver: zodResolver(statusByRouteFormSchema),
    defaultValues: {
      flightOrigin: "",
      flightDestination: "",
    },
  })

  const onSubmit = statusByRouteForm.handleSubmit(
    (data: z.infer<typeof statusByRouteFormSchema>) => {
      console.log(data)
      statusByRouteForm.reset()
    }
  )

  return (
    <Form {...statusByRouteForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault()

          return void onSubmit()
        }}
        className="grid gap-4"
      >
        <FormField
          control={statusByRouteForm.control}
          name="flightOrigin"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>From</FormLabel>
              <FormControl>
                <Input
                  placeholder="London Gatwick"
                  iconElementAfter="menuBurger"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={statusByRouteForm.control}
          name="flightDestination"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel>To</FormLabel>
              <FormControl>
                <Input
                  placeholder="Amsterdam"
                  iconElementAfter="menuBurger"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Check status
        </Button>
      </form>
    </Form>
  )
}
