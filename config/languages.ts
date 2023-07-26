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
