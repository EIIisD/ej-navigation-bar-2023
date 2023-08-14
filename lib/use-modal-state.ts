import React from "react"
import { useRouter, useSearchParams, type ReadonlyURLSearchParams } from "next/navigation"

import { disablePageScroll } from "@/lib/utils"

const modalParamValue = "modal"

const createSearchParams = (searchParams: ReadonlyURLSearchParams): URLSearchParams => new URLSearchParams(searchParams.toString())
const returnSearchParams = (searchParams: URLSearchParams): string => "?" + (searchParams.toString() || "")

const createSearchParamOperation = (searchParamOperation: (searchParams: URLSearchParams, key: string) => void) => {
  return (searchParams: ReadonlyURLSearchParams, key: string): string => {
    const newSearchParams = createSearchParams(searchParams)
    searchParamOperation(newSearchParams, key)

    return returnSearchParams(newSearchParams)
  }
}

const param = {
  append: createSearchParamOperation((searchParams, key) => !searchParams.has(key) && searchParams.append(key, modalParamValue)),
  remove: createSearchParamOperation((searchParams, key) => searchParams.delete(key)),
  toggle: createSearchParamOperation((searchParams, key) =>
    searchParams.has(key) ? searchParams.delete(key) : searchParams.append(key, modalParamValue)
  ),
}

export const useModalState = (modalId: string, defaultOpen?: boolean) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isOpen, setIsOpen] = React.useState(false)

  const open = () => {
    disablePageScroll(true)
    router.replace(param.append(searchParams, modalId))
  }

  const close = () => {
    const openModals = Array.from(searchParams.entries()).filter(([, value]) => value === modalParamValue)
    router.replace(param.remove(searchParams, modalId))
    if (openModals.length === 1) disablePageScroll(false)
  }

  React.useEffect(() => {
    if (defaultOpen) open()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultOpen])

  React.useEffect(() => {
    setIsOpen(Boolean(searchParams.get(modalId)))
  }, [modalId, searchParams])

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

  const page = {
    searchParams,
    router,
  }

  return [modal, page] as const
}
