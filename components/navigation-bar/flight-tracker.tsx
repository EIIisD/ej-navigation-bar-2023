"use client"

import { toTitleCase } from "@artsy/to-title-case"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const FlightTracker = () => {
  return (
    <div className="space-y-6">
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
  const statusByFlightForm = useForm()

  return (
    <Form {...statusByFlightForm}>
      <form
        onSubmit={statusByFlightForm.handleSubmit(console.log)}
        className="grid gap-4"
      >
        <FormField
          control={statusByFlightForm.control}
          name="flightNumber"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormControl>
                <Input placeholder="Flight number: e.g. 1234" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Check status</Button>
      </form>
    </Form>
  )
}

const StatusByRouteForm = () => {
  const statusByRouteForm = useForm()

  return (
    <Form {...statusByRouteForm}>
      <form
        onSubmit={statusByRouteForm.handleSubmit(console.log)}
        className="grid gap-4"
      >
        <FormField
          control={statusByRouteForm.control}
          name="flightOrigin"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormControl>
                <Input placeholder="From: e.g. London Gatwick" {...field} />
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
              <FormControl>
                <Input placeholder="To: e.g. Amsterdam" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Check status</Button>
      </form>
    </Form>
  )
}
