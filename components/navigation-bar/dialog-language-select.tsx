"use client"

import React from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { languages } from "@/config/languages"
import { useModalState } from "@/lib/use-modal-state"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogMain, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField } from "@/components/ui/form"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"
import { useNavigationBarContext } from "@/components/navigation-bar/navigation-bar-context"

const RadioGroup = {
  Root: RadioGroupPrimitive.Root,
  Item: RadioGroupPrimitive.Item,
  Indicator: RadioGroupPrimitive.Indicator,
}

const languageSelectFormSchema = z.object({
  language: z.string().optional(),
})

export const dialogLanguageSelectId = "dialog-language-select"

export const DialogLanguageSelect = ({ children }: { children: React.ReactNode }) => {
  const navigationBarContext = useNavigationBarContext()
  const [dialog] = useModalState(dialogLanguageSelectId)

  const languageSelectForm = useForm<z.infer<typeof languageSelectFormSchema>>({
    resolver: zodResolver(languageSelectFormSchema),
    defaultValues: {
      language: navigationBarContext.language,
    },
  })

  const onSubmit = languageSelectForm.handleSubmit((data: z.infer<typeof languageSelectFormSchema>) => {
    console.log(data)

    if (data.language) {
      navigationBarContext.setLanguage(data.language)
    }

    dialog.close()
    languageSelectForm.reset()

    return false
  })

  return (
    <Form {...languageSelectForm}>
      <Dialog {...dialog.register}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogBody asChild>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              return void onSubmit()
            }}
          >
            <DialogMain>
              <FormField
                control={languageSelectForm.control}
                name="language"
                render={({ field: { value: _, ...field } }) => (
                  <FormControl>
                    <RadioGroup.Root defaultValue={navigationBarContext.language} className={menuMobileListStyle()} {...field}>
                      <DialogTitle className={menuMobileItemStyle({ variant: "title" })}>Select Language</DialogTitle>
                      {languages.map((option, optionIndex) => (
                        <RadioGroup.Item
                          key={option.value}
                          value={option.value}
                          className={cn(
                            menuMobileItemStyle({
                              border: optionIndex === languages.length - 1 || false ? "none" : "default",
                            }),
                            "group items-center gap-[--page-inset-small] transition-colors duration-100 hover:bg-gray-50"
                          )}
                        >
                          <RadioGroup.Indicator
                            className="peer relative h-5 w-5 rounded-full border border-gray-400 bg-white transition-colors duration-300 data-[state=unchecked]:border-gray-300 data-[state=checked]:text-orange data-[state=unchecked]:text-white group-hover:data-[state=unchecked]:text-gray-200"
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
                              className="h-7 w-9 rounded-lg border-[1.5px] border-primary bg-primary"
                            />
                          </div>
                          <span className="text-base peer-data-[state=checked]:font-bold">{option.value}</span>
                        </RadioGroup.Item>
                      ))}
                    </RadioGroup.Root>
                  </FormControl>
                )}
              />
            </DialogMain>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" mode="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Apply</Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </Form>
  )
}
