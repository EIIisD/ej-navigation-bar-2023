import { menuFooter } from "@/config/menu-footer"
import { TextButton } from "@/components/ui/text-button"

export const Footer = () => {
  return (
    <section className="bg-gray-100 print:hidden">
      <main className="mx-auto max-w-[--page-maxWidth] flex-auto p-[--page-inset] py-[--page-inset-large]">
        <div className="grid grid-cols-4 gap-[--page-inset]">
          {menuFooter.map((section) => (
            <ul key={section.title}>
              <h2 className="mb-2 text-sm font-bold text-secondary">
                {section.title}
              </h2>
              {section.items.map((item) => (
                <li key={item}>
                  <TextButton className="-m-1 p-1 text-sm text-secondary">
                    {item}
                  </TextButton>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </main>
    </section>
  )
}
