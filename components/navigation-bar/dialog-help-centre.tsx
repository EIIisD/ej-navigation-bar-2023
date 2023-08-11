"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useModalState } from "@/lib/use-modal-state"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogMain, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"

const topSearches = [
  "Disruption Help Hub",
  "Help Homepage",
  "Flight Tracker",
  "Travel information",
  "Bag allowance",
  "Damaged or delayed bags",
  "Advanced passenger information",
  "Boarding",
]

const helpCentreFormSchema = z.object({
  searchQuery: z.string({
    required_error: "Your search query is empty. Please try again.",
  }),
})

export const dialogHelpCentreId = "dialog-help-centre"

export const DialogHelpCentre = ({ children }: { children: React.ReactNode }) => {
  const [dialog] = useModalState(dialogHelpCentreId)

  const helpCentreForm = useForm<z.infer<typeof helpCentreFormSchema>>({
    resolver: zodResolver(helpCentreFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  })

  const onSubmit = helpCentreForm.handleSubmit((data: z.infer<typeof helpCentreFormSchema>) => {
    console.log(data)
    dialog.close()
    helpCentreForm.reset()
  })

  return (
    <Form {...helpCentreForm}>
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
              <DialogTitle className={menuMobileItemStyle({ variant: "title" })}>Help centre</DialogTitle>

              <FormField
                control={helpCentreForm.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem className={cn(menuMobileItemStyle({ border: "none" }), "flex-col gap-4")}>
                    <FormLabel className="text-base">What do you need help with?</FormLabel>
                    <FormControl>
                      <Input iconElement="searchAndMenuSearchOutlined" placeholder="Search FAQs" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className={cn(menuMobileItemStyle({ border: "none" }), "flex-col gap-4 text-sm")}>
                <FormLabel className="font-normal text-secondary">Top results:</FormLabel>

                <div className="flex flex-wrap gap-2">
                  {topSearches.map((value) => (
                    <DialogClose key={value} asChild>
                      <Button type="submit" mode="outline" size="sm" className="rounded-full">
                        {value}
                      </Button>
                    </DialogClose>
                  ))}
                </div>
              </div>
            </DialogMain>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" mode="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Search</Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </Form>
  )
}
