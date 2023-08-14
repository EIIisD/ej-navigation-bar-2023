"use client"

import React, { type Dispatch, type SetStateAction } from "react"

import { languagesMap } from "@/config/languages"

export interface SiteContext {
  language: string
  setLanguage: Dispatch<SetStateAction<SiteContext["language"]>>
}

export const siteContextDefs = {
  language: languagesMap.en_US.value,
  setLanguage: () => null,
}

export const SiteContext = React.createContext<SiteContext>({
  language: siteContextDefs.language,
  setLanguage: siteContextDefs.setLanguage,
})

export const useSiteContext = () => React.useContext(SiteContext)

export const SiteContextProvider: React.FC<React.PropsWithChildren> = (props) => {
  const [language, setLanguage] = React.useState<SiteContext["language"]>(siteContextDefs.language)

  return (
    <SiteContext.Provider
      value={{
        language,
        setLanguage,
      }}
      {...props}
    />
  )
}
