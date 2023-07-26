import { toTitleCase } from "@artsy/to-title-case"

export const menuFooter = [
  {
    title: toTitleCase("Flight info"),
    items: [
      toTitleCase("Flight Tracker"),
      toTitleCase("Manage Bookings"),
      toTitleCase("Sustainability"),
      toTitleCase("Travel Guides"),
      toTitleCase("Where we fly"),
      toTitleCase("Conquer your fear of flying"),
    ],
  },
  {
    title: toTitleCase("Customer service"),
    items: [
      toTitleCase("Accessibility"),
      toTitleCase("Our Promise"),
      toTitleCase("Help"),
      toTitleCase("Latest travel information"),
      toTitleCase("Site map"),
      toTitleCase("Special assistance"),
    ],
  },
  {
    title: toTitleCase("About easyJet"),
    items: [
      toTitleCase("Careers"),
      toTitleCase("Company information"),
      toTitleCase("Registered address"),
      toTitleCase("Modern Slavery Act"),
      toTitleCase("Orange Spirit"),
    ],
  },
  {
    title: toTitleCase("The small print"),
    items: [
      toTitleCase("Acceptable use policy"),
      toTitleCase("Dangerous goods"),
      toTitleCase("Distribution charter"),
      toTitleCase("Fees and charges"),
      toTitleCase("Group cookie notice"),
      toTitleCase("Key terms for your booking"),
      toTitleCase("Privacy policy"),
      toTitleCase("Terms and conditions"),
    ],
  },
]
