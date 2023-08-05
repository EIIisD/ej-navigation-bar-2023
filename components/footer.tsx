import Link from "next/link"

import { menuFooter } from "@/config/menu-footer"
import { TextButton } from "@/components/ui/text-button"

export const Footer = () => {
  return (
    <section className="bg-gray-100 print:hidden">
      <main className="mx-auto max-w-[--page-maxWidth] flex-auto p-[--page-inset] py-[--page-inset-large]">
        <div className="grid grid-cols-2 gap-[--page-inset] md:grid-cols-4">
          {menuFooter.map((section) => (
            <ul key={section.title}>
              <h2 className="mb-2 font-bold text-secondary text-sm">{section.title}</h2>
              {section.items.map((item) => (
                <li key={item}>
                  {item === "Manage Bookings" ? (
                    <Link href="/boarding-pass">
                      <TextButton className="-m-1 w-full justify-start whitespace-normal p-1 text-secondary text-sm">
                        <div className="line-clamp-1 break-all">{item}</div>
                      </TextButton>
                    </Link>
                  ) : (
                    <TextButton className="-m-1 w-full justify-start whitespace-normal p-1 text-secondary text-sm">
                      <div className="line-clamp-1 break-all">{item}</div>
                    </TextButton>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </main>
    </section>
  )
}
