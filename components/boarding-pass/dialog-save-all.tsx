"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useModalState } from "@/lib/use-modal-state"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogBody, DialogClose, DialogFooter, DialogMain, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { menuMobileItemStyle, menuMobileListStyle } from "@/components/navigation-bar/menu-mobile"

const saveAllFormSchema = z.object({
  includeAdverts: z.boolean(),
})

export const dialogSaveAllId = "dialog-save-all"

export const DialogSaveAll = ({ children }: { children: React.ReactNode }) => {
  const [dialog] = useModalState(dialogSaveAllId)

  const saveAllForm = useForm<z.infer<typeof saveAllFormSchema>>({
    resolver: zodResolver(saveAllFormSchema),
    defaultValues: {
      includeAdverts: true,
    },
  })

  const onSubmit = saveAllForm.handleSubmit((data: z.infer<typeof saveAllFormSchema>) => {
    console.log(data)
    dialog.close()
  })

  return (
    <Form {...saveAllForm}>
      <Dialog {...dialog.register}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogBody asChild>
          <form
            onSubmit={(e) => {
              e.preventDefault()

              alert(
                "For the purposes of usability testing, the save action won't be executed. However, if this was a live environment, the action would have been successful."
              )

              return void onSubmit()
            }}
          >
            <DialogMain className={menuMobileListStyle()}>
              <DialogTitle className={cn(menuMobileItemStyle({ variant: "title" }), "items-baseline justify-between")}>
                <span>Save your boarding passes</span>
              </DialogTitle>

              <div className={cn(menuMobileItemStyle({ variant: "default" }), "-mt-4 pb-8 pt-0")}>
                <p>Save all your boarding passes at once as a PDF, ideal for multiple flights or group travel.</p>
              </div>
              <hr className="mb-6" />

              <FormField
                control={saveAllForm.control}
                name="includeAdverts"
                render={({ field }) => (
                  <FormItem className={cn(menuMobileItemStyle({ border: "none" }), "flex-col gap-0 space-y-2")}>
                    <div className="flex items-start gap-3">
                      <FormControl>
                        <Checkbox id="includeAdverts" checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <label htmlFor="includeAdverts" className="-mt-0.5 cursor-pointer text-secondary">
                        <p className="font-bold text-primary">Include adverts?</p>
                        <p className="mt-1 text-sm">You can include adverts for updates on offers, or exclude them for a simpler boarding pass.</p>
                      </label>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </DialogMain>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" mode="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save all</Button>
            </DialogFooter>
          </form>
        </DialogBody>
      </Dialog>
    </Form>
  )
}
