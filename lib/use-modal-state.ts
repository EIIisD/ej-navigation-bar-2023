import React from "react"
import { useUrlSearchParams } from "use-url-search-params"

import { disablePageScroll } from "@/lib/utils"

const modalParamValue = "modal"

export const useModalState = (modalId: string, defaultOpen?: boolean) => {
  const [params, setParams] = useUrlSearchParams()
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => {
    disablePageScroll(true)
    setParams({ [modalId]: modalParamValue })
  }

  const close = () => {
    const entries = Object.entries(params)
    const openModals = Array.from(entries).filter(([, value]) => value === modalParamValue)
    setParams({ [modalId]: undefined })
    if (openModals.length === 1) disablePageScroll(false)
  }

  React.useEffect(() => {
    if (defaultOpen) open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpen])

  React.useEffect(() => {
    setIsOpen(
      Boolean(
        Object.entries(params).find(([key, value]) => {
          return key === modalId && value === modalParamValue
        })
      )
    )
  }, [modalId, params])

  const register = {
    open: isOpen,
    onOpenChange: (openState: boolean) => {
      if (openState === true) open()
      else close()
    },
  }

  const modal = {
    open,
    isOpen,
    close,
    register,
  }

  return [modal, params] as const
}
