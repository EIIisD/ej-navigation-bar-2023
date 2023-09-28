import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export const PopoverDetails = ({ title, children, content }: { title: string; children: React.ReactNode; content: React.ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80">
        <h3>{title}</h3>
        {content}
      </PopoverContent>
    </Popover>
  )
}
