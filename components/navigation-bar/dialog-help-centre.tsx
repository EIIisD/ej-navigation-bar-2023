"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { addToOpenModals, cn, removeFromOpenModals } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogMain,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  menuMobileItemStyle,
  menuMobileListStyle,
} from "@/components/navigation-bar/menu-mobile"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

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

export const DialogHelpCentre = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const navigationBarContext = useNavigationBarContext()
  const isOpen = navigationBarContext.openModals.includes(dialogHelpCentreId)

  const helpCentreForm = useForm<z.infer<typeof helpCentreFormSchema>>({
    resolver: zodResolver(helpCentreFormSchema),
    defaultValues: {
      searchQuery: "",
    },
  })

  const onSubmit = helpCentreForm.handleSubmit(
    (data: z.infer<typeof helpCentreFormSchema>) => {
      console.log(data)
      navigationBarContext.setOpenModals(
        removeFromOpenModals(
          navigationBarContext.openModals,
          dialogHelpCentreId
        )
      )
      helpCentreForm.reset()
    }
  )

  const handleOpenChange = (openState: boolean) => {
    if (openState === true) {
      navigationBarContext.setOpenModals(
        addToOpenModals(navigationBarContext.openModals, dialogHelpCentreId)
      )
    } else {
      navigationBarContext.setOpenModals(
        removeFromOpenModals(
          navigationBarContext.openModals,
          dialogHelpCentreId
        )
      )
    }
  }

  const id = {
    trigger: `DialogHelpCentre:Dialog.Trigger.0`,
    content: `DialogHelpCentre:Dialog.Content.0`,
  }

  return (
    <Form {...helpCentreForm}>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger id={id.trigger} aria-controls={id.content} asChild>
          {children}
        </DialogTrigger>
        <DialogBody id={id.content} asChild>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              return void onSubmit()
            }}
          >
            <DialogMain className={menuMobileListStyle()}>
              <DialogTitle
                className={menuMobileItemStyle({ variant: "title" })}
              >
                Help centre
              </DialogTitle>

              <FormField
                control={helpCentreForm.control}
                name="searchQuery"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      menuMobileItemStyle({ border: "none" }),
                      "flex-col gap-4"
                    )}
                  >
                    <FormLabel className="text-base">
                      What do you need help with?
                    </FormLabel>
                    <FormControl>
                      <Input
                        iconElement="searchAndMenuSearchOutlined"
                        placeholder="Search FAQs"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div
                className={cn(
                  menuMobileItemStyle({ border: "none" }),
                  "flex-col gap-4 text-sm"
                )}
              >
                <FormLabel className="font-normal text-secondary">
                  Top results:
                </FormLabel>

                <div className="flex flex-wrap gap-2">
                  {topSearches.map((value) => (
                    <DialogClose key={value} asChild>
                      <Button
                        type="submit"
                        variant="outline"
                        size="sm"
                        className="rounded-full font-normal"
                      >
                        {value}
                      </Button>
                    </DialogClose>
                  ))}
                </div>
              </div>
            </DialogMain>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
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
