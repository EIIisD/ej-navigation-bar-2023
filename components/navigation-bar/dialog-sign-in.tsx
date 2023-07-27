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
import { TextButton } from "@/components/ui/text-button"
import {
  menuMobileItemStyle,
  menuMobileListStyle,
} from "@/components/navigation-bar/menu-mobile"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

const signInFormSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string(),
  staySignedIn: z.boolean(),
})

export const dialogSignInId = "dialog-sign-in"

export const DialogSignIn = ({ children }: { children: React.ReactNode }) => {
  const navigationBarContext = useNavigationBarContext()
  const isOpen = navigationBarContext.openModals.includes(dialogSignInId)

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      staySignedIn: false,
    },
  })

  const onSubmit = signInForm.handleSubmit(
    (data: z.infer<typeof signInFormSchema>) => {
      console.log(data)
      navigationBarContext.setIsSignedIn(true)
      navigationBarContext.setOpenModals(
        removeFromOpenModals(navigationBarContext.openModals, dialogSignInId)
      )
      signInForm.reset()
    }
  )

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
        <Form {...signInForm}>
          <form onSubmit={() => void onSubmit()}>
            <DialogMain className={menuMobileListStyle()}>
              <DialogTitle
                className={menuMobileItemStyle({ variant: "title" })}
              >
                Sign in
              </DialogTitle>

              <p className={cn(menuMobileItemStyle(), "text-secondary")}>
                Sign in to view and manage your account and bookings.
              </p>

              <FormField
                control={signInForm.control}
                name="emailAddress"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      menuMobileItemStyle({ border: "none" }),
                      "flex-col gap-0 space-y-2"
                    )}
                  >
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="name@mail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={signInForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      menuMobileItemStyle({ border: "none" }),
                      "flex-col gap-0 space-y-2"
                    )}
                  >
                    <FormLabel>Password</FormLabel>
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
                control={signInForm.control}
                name="staySignedIn"
                render={({ field }) => (
                  <FormItem
                    className={cn(
                      menuMobileItemStyle({ border: "none" }),
                      "flex-col gap-0 space-y-2"
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
                      <label
                        htmlFor="staySignedIn"
                        className="cursor-pointer text-secondary"
                      >
                        Keep me signed in
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className={menuMobileItemStyle()}>
                <TextButton
                  type="button"
                  className="text-sm font-bold text-orange"
                >
                  Forgotten your details?
                </TextButton>
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
      </DialogBody>
    </Dialog>
  )
}
