import Link from "next/link"

export const footerMenu = [
  {
    title: "Flight info",
    items: [
      "Flight Tracker",
      "Manage Bookings",
      "Sustainability",
      "Travel Guides",
      "Where we fly",
      "Conquer your fear of flying",
    ],
  },
  {
    title: "Customer service",
    items: [
      "Accessibility",
      "Our Promise",
      "Help",
      "Latest travel information",
      "Site map",
      "Special assistance",
    ],
  },
  {
    title: "About easyJet",
    items: [
      "Careers",
      "Company information",
      "Registered address",
      "Modern Slavery Act",
      "Orange Spirit",
    ],
  },
  {
    title: "The small print",
    items: [
      "Acceptable use policy",
      "Dangerous goods",
      "Distribution charter",
      "Fees and charges",
      "Group cookie notice",
      "Key terms for your booking",
      "Privacy policy",
      "Terms and conditions",
    ],
  },
]

export const Footer = () => {
  return (
    <section className="bg-gray-100 print:hidden">
      <main className="mx-auto max-w-[--page-maxWidth] flex-auto p-[--page-inset] py-[--page-inset-large]">
        <div className="grid grid-cols-4 gap-[--page-inset]">
          {footerMenu.map((section) => (
            <ul key={section.title}>
              <h2 className="mb-2 text-sm font-bold text-secondary">
                {section.title}
              </h2>
              {section.items.map((item) => (
                <li key={item}>
                  <Link href="/" className="text-sm text-secondary">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </main>
    </section>
  )
}
