"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { addToOpenModals, cn, removeFromOpenModals } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
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

const SignInForm = React.forwardRef<HTMLFormElement, any>(
  ({ helpCentreForm, ...props }, ref) => {
    return (
      <Form {...helpCentreForm}>
        <form ref={ref} {...props}>
          <DialogMain className={menuMobileListStyle()}>
            <DialogTitle className={menuMobileItemStyle({ variant: "title" })}>
              Sign in
            </DialogTitle>

            <p className={cn(menuMobileItemStyle(), "text-secondary")}>
              Sign in to view and manage your account and bookings.
            </p>

            <FormField
              control={helpCentreForm.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    menuMobileItemStyle({ border: "none" }),
                    "flex-col gap-4"
                  )}
                >
                  <FormLabel className="text-base font-bold">
                    Email address
                  </FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={helpCentreForm.control}
              name="password"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    menuMobileItemStyle({ border: "none" }),
                    "flex-col gap-4"
                  )}
                >
                  <FormLabel className="text-base font-bold">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={helpCentreForm.control}
              name="staySignedIn"
              render={({ field }) => (
                <FormItem
                  className={cn(
                    menuMobileItemStyle({ border: "none" }),
                    "flex-col gap-4"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Checkbox
                        id="staySignedIn"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <label htmlFor="staySignedIn" className="text-primary">
                      Keep me signed in
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className={menuMobileItemStyle()}>
              <Button type="button" size="text" variant="link">
                Forgotten your details?
              </Button>
            </div>
          </DialogMain>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Sign in</Button>
          </DialogFooter>
        </form>
      </Form>
    )
  }
)
SignInForm.displayName = "SignInForm"

export const dialogSignInId = "dialog-sign-in"

export const DialogSignIn = ({ children }: { children: React.ReactNode }) => {
  const navigationBarContext = useNavigationBarContext()
  const isOpen = navigationBarContext.openModals.includes(dialogSignInId)

  const signInFormSchema = z.object({
    emailAddress: z.string().email(),
    password: z.string(),
    staySignedIn: z.boolean(),
  })

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      staySignedIn: false,
    },
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    return signInForm.handleSubmit((data: z.infer<typeof signInFormSchema>) => {
      console.log(data)
      navigationBarContext.setIsSignedIn(true)
      navigationBarContext.setOpenModals(
        removeFromOpenModals(navigationBarContext.openModals, dialogSignInId)
      )
      signInForm.reset()
    })(event)
  }

  const handleOpenChange = (openState: boolean) => {
    if (openState === true) {
      navigationBarContext.setOpenModals(
        addToOpenModals(navigationBarContext.openModals, dialogSignInId)
      )
    } else {
      navigationBarContext.setOpenModals(
        removeFromOpenModals(navigationBarContext.openModals, dialogSignInId)
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogBody asChild>
        <SignInForm helpCentreForm={signInForm} onSubmit={onSubmit} />
      </DialogBody>
    </Dialog>
  )
}
