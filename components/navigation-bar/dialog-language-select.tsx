"use client"

import React from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { languages } from "@/config/languages"
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
import { Form, FormControl, FormField } from "@/components/ui/form"
import {
  menuMobileItemStyle,
  menuMobileListStyle,
} from "@/components/navigation-bar/menu-mobile"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

const RadioGroup = {
  Root: RadioGroupPrimitive.Root,
  Item: RadioGroupPrimitive.Item,
  Indicator: RadioGroupPrimitive.Indicator,
}

const LanguageSelectForm = React.forwardRef<HTMLFormElement, any>(
  ({ languageSelectForm, currentLanguage, ...props }, ref) => {
    return (
      <Form {...languageSelectForm}>
        <form ref={ref} {...props}>
          <DialogMain>
            <FormField
              control={languageSelectForm.control}
              name="language"
              render={({ field: { value, ...field } }) => (
                <FormControl>
                  <RadioGroup.Root
                    defaultValue={currentLanguage}
                    className={menuMobileListStyle()}
                    {...field}
                  >
                    <DialogTitle
                      className={menuMobileItemStyle({ variant: "title" })}
                    >
                      Select Language
                    </DialogTitle>
                    {languages.map((option, optionIndex) => (
                      <RadioGroup.Item
                        key={option.value}
                        value={option.value}
                        className={cn(
                          menuMobileItemStyle({
                            border:
                              optionIndex === languages.length - 1 || false
                                ? "none"
                                : "default",
                          }),
                          "items-center gap-[--page-inset-small]"
                        )}
                      >
                        <RadioGroup.Indicator
                          className="peer relative h-5 w-5 rounded-full border border-gray-400 bg-white data-[state=checked]:text-orange data-[state=unchecked]:text-white"
                          forceMount
                        >
                          <div className="absolute inset-1 rounded-full bg-current" />
                        </RadioGroup.Indicator>
                        <div className="grid h-11 shrink-0 place-items-center">
                          <Image
                            src={`/media/flags/${option.flag}.svg`}
                            alt={option.value}
                            width={36}
                            height={28}
                            className="h-7 w-9 rounded-lg border-white bg-white"
                          />
                        </div>
                        <span className="text-base peer-data-[state=checked]:font-bold">
                          {option.value}
                        </span>
                      </RadioGroup.Item>
                    ))}
                  </RadioGroup.Root>
                </FormControl>
              )}
            />
          </DialogMain>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Apply</Button>
          </DialogFooter>
        </form>
      </Form>
    )
  }
)
LanguageSelectForm.displayName = "LanguageSelectForm"

export const dialogLanguageSelectId = "dialog-language-select"

export const DialogLanguageSelect = ({ children }: { children: string }) => {
  const navigationBarContext = useNavigationBarContext()
  const isOpen = navigationBarContext.openModals.includes(
    dialogLanguageSelectId
  )

  const languageSelectFormSchema = z.object({
    language: z.string().optional(),
  })

  const languageSelectForm = useForm<z.infer<typeof languageSelectFormSchema>>({
    resolver: zodResolver(languageSelectFormSchema),
    defaultValues: {
      language: navigationBarContext.language,
    },
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    return languageSelectForm.handleSubmit(
      (data: z.infer<typeof languageSelectFormSchema>) => {
        console.log(data)
        if (data.language) navigationBarContext.setLanguage(data.language)
        navigationBarContext.setOpenModals(
          removeFromOpenModals(
            navigationBarContext.openModals,
            dialogLanguageSelectId
          )
        )
        languageSelectForm.reset()
      }
    )(event)
  }

  const handleOpenChange = (openState: boolean) => {
    if (openState === true) {
      navigationBarContext.setOpenModals(
        addToOpenModals(navigationBarContext.openModals, dialogLanguageSelectId)
      )
    } else {
      navigationBarContext.setOpenModals(
        removeFromOpenModals(
          navigationBarContext.openModals,
          dialogLanguageSelectId
        )
      )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogBody asChild>
        <LanguageSelectForm
          languageSelectForm={languageSelectForm}
          currentLanguage={navigationBarContext.language}
          onSubmit={onSubmit}
        />
      </DialogBody>
    </Dialog>
  )
}
