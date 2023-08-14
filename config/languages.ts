import { keyBy } from "@/lib/utils"

export type Flag =
  | "unitedKingdom"
  | "france"
  | "germany"
  | "switzerland"
  | "spain"
  | "netherlands"
  | "portugal"
  | "catalonia"
  | "czechRepublic"
  | "denmark"
  | "greece"
  | "hungary"
  | "poland"
  | "israel"
  | "turkey"

export interface Language {
  value: string
  locale: string
  flag: Flag
}

export const languages: Language[] = [
  { value: `English`, locale: "en_US", flag: "unitedKingdom" },
  { value: `Français`, locale: "fr_FR", flag: "france" },
  { value: `Deutsch`, locale: "de_DE", flag: "germany" },
  { value: `Français (Suisse)`, locale: "fr_CH", flag: "switzerland" },
  { value: `Deutsch (Schweiz)`, locale: "de_CH", flag: "switzerland" },
  { value: `Castellano`, locale: "es_ES", flag: "spain" },
  { value: `Nederlands`, locale: "nl_NL", flag: "netherlands" },
  { value: `Portugues`, locale: "pt_PT", flag: "portugal" },
  { value: `Català`, locale: "ca_ES", flag: "catalonia" },
  { value: `Česky`, locale: "cs_CZ", flag: "czechRepublic" },
  { value: `Dansk`, locale: "da_DK", flag: "denmark" },
  { value: `Eλληνικά`, locale: "el_GR", flag: "greece" },
  { value: `Magyarul`, locale: "hu_HU", flag: "hungary" },
  { value: `Polski`, locale: "pl_PL", flag: "poland" },
  { value: `Türkçe`, locale: "tr_TR", flag: "israel" },
  { value: `עברית`, locale: "he_IL", flag: "turkey" },
]

export const languagesMap = {
  en_US: {
    value: "English",
    locale: "en_US",
    flag: "unitedKingdom",
  } as Language,
  fr_FR: {
    value: "Français",
    locale: "fr_FR",
    flag: "france",
  } as Language,
  de_DE: {
    value: "Deutsch",
    locale: "de_DE",
    flag: "germany",
  } as Language,
  fr_CH: {
    value: "Français (Suisse)",
    locale: "fr_CH",
    flag: "switzerland",
  } as Language,
  de_CH: {
    value: "Deutsch (Schweiz)",
    locale: "de_CH",
    flag: "switzerland",
  } as Language,
  es_ES: {
    value: "Castellano",
    locale: "es_ES",
    flag: "spain",
  } as Language,
  nl_NL: {
    value: "Nederlands",
    locale: "nl_NL",
    flag: "netherlands",
  } as Language,
  pt_PT: {
    value: "Portugues",
    locale: "pt_PT",
    flag: "portugal",
  } as Language,
  ca_ES: {
    value: "Català",
    locale: "ca_ES",
    flag: "catalonia",
  } as Language,
  cs_CZ: {
    value: "Česky",
    locale: "cs_CZ",
    flag: "czechRepublic",
  } as Language,
  da_DK: {
    value: "Dansk",
    locale: "da_DK",
    flag: "denmark",
  } as Language,
  el_GR: {
    value: "Eλληνικά",
    locale: "el_GR",
    flag: "greece",
  } as Language,
  hu_HU: {
    value: "Magyarul",
    locale: "hu_HU",
    flag: "hungary",
  } as Language,
  pl_PL: {
    value: "Polski",
    locale: "pl_PL",
    flag: "poland",
  } as Language,
  tr_TR: {
    value: "Türkçe",
    locale: "tr_TR",
    flag: "israel",
  } as Language,
  he_IL: {
    value: "עברית",
    locale: "he_IL",
    flag: "turkey",
  } as Language,
} as Record<string, Language>
