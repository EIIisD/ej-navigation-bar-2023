import { cn } from "@/lib/utils"

export const TNums: React.FC<{ content: string | number; className?: string }> = ({ content, className }) => {
  return (
    <span className={cn("inline-flex", className)}>
      {content
        .toString()
        .split("")
        .map((char, index) =>
          isNaN(Number(char)) ? (
            <span key={`${char}-${index}`} className="inline-block">
              {char}
            </span>
          ) : char === " " ? (
            <span key={`${char}-${index}`} className="inline-block w-[0.375ch] min-w-[0.375ch] max-w-[0.375ch] text-center">
              {char}
            </span>
          ) : (
            <span key={`${char}-${index}`} className="inline-block w-[1ch] min-w-[1ch] max-w-[1ch] text-center">
              {char}
            </span>
          )
        )}
    </span>
  )
}
